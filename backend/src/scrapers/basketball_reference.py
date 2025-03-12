import requests
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from typing import List, Dict, Any, Optional, Union
import time
import re

class BasketballReferenceScaper:
    """
    Scraper for basketball-reference.com to get player game logs and statistics.
    """
    BASE_URL = "https://www.basketball-reference.com"
    
    def __init__(self):
        # Set a reasonable User-Agent to avoid being blocked
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def search_players(self, query: str) -> List[Dict[str, str]]:
        """
        Search for players by name and return basic player info.
        
        Args:
            query: Player name to search for
            
        Returns:
            List of dictionaries containing player information
        """
        # For demonstration, returning a list of hardcoded NBA players
        # In a real implementation, you would scrape this data from basketball-reference search
        players = [
            {"id": "jamesle01", "name": "LeBron James", "team": "Los Angeles Lakers", "position": "SF"},
            {"id": "curryst01", "name": "Stephen Curry", "team": "Golden State Warriors", "position": "PG"},
            {"id": "duranke01", "name": "Kevin Durant", "team": "Phoenix Suns", "position": "SF"},
            {"id": "antetgi01", "name": "Giannis Antetokounmpo", "team": "Milwaukee Bucks", "position": "PF"},
            {"id": "doncilu01", "name": "Luka Dončić", "team": "Dallas Mavericks", "position": "PG"},
            {"id": "jokicni01", "name": "Nikola Jokić", "team": "Denver Nuggets", "position": "C"},
            {"id": "embiijo01", "name": "Joel Embiid", "team": "Philadelphia 76ers", "position": "C"},
            {"id": "lillada01", "name": "Damian Lillard", "team": "Milwaukee Bucks", "position": "PG"},
            {"id": "tatumja01", "name": "Jayson Tatum", "team": "Boston Celtics", "position": "SF"},
            {"id": "moranja01", "name": "Ja Morant", "team": "Memphis Grizzlies", "position": "PG"},
            {"id": "youngtr01", "name": "Trae Young", "team": "Atlanta Hawks", "position": "PG"},
            {"id": "edwaran01", "name": "Anthony Edwards", "team": "Minnesota Timberwolves", "position": "SG"},
            {"id": "foxde01", "name": "De'Aaron Fox", "team": "Sacramento Kings", "position": "PG"},
            {"id": "georgpa01", "name": "Paul George", "team": "Philadelphia 76ers", "position": "SF"},
            {"id": "bookede01", "name": "Devin Booker", "team": "Phoenix Suns", "position": "SG"}
        ]
        
        # Filter players based on query (case-insensitive)
        query = query.lower()
        return [p for p in players if query in p["name"].lower()]
    
    def _format_player_url(self, player_name: str, season: int = 2025) -> str:
        """
        Format the URL for a player's game log on basketball-reference.com.
        
        Args:
            player_name: Full name of the player (e.g., "Trae Young")
            season: Season year (e.g., 2025 for 2024-2025 season)
            
        Returns:
            Formatted URL for the player's game log
        """
        # Split the name into first and last name
        name_parts = player_name.strip().split()
        if len(name_parts) < 2:
            raise ValueError("Player name must include first and last name")
        
        # Extract first and last name
        first_name = name_parts[0].lower()
        last_name = name_parts[-1].lower()
        
        # Format the player ID according to basketball-reference convention
        # [first letter of last name]/[first five letters of last name][first two letters of first name]01
        player_id = f"{last_name[0]}/{last_name[:5]}{first_name[:2]}01"
        
        # Format the complete URL
        url = f"{self.BASE_URL}/players/{player_id}/gamelog/{season}"
        return url
    
    def get_game_log(self, player_name: str, season: int = 2025) -> pd.DataFrame:
        """
        Get a player's game log for a specific season.
        
        Args:
            player_name: Full name of the player (e.g., "Trae Young")
            season: Season year (e.g., 2025 for 2024-2025 season)
            
        Returns:
            DataFrame containing the player's game log data
        """
        url = self._format_player_url(player_name, season)
        
        try:
            # Add a small delay to avoid overwhelming the server
            time.sleep(1)
            
            # Make HTTP request
            response = requests.get(url, headers=self.headers)
            
            # Check if we got a valid response
            if response.status_code != 200:
                print(f"Warning: Could not access {url} (Status code: {response.status_code})")
                print("This could be due to an incorrect player name or player ID format.")
                print("Please double-check the player name or try a different player.")
                return pd.DataFrame()
            
            # Parse HTML
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Find the table containing the game log data
            table_div = soup.find('div', {'id': 'div_pgl_basic'})
            if not table_div:
                print(f"Warning: Could not find game log data for {player_name}")
                print("The player might not have played in the specified season or the page format has changed.")
                return pd.DataFrame()
            
            # Extract table rows from tbody
            tbody = table_div.find('tbody')
            if not tbody:
                print(f"Warning: Could not find game log table body for {player_name}")
                return pd.DataFrame()
                
            rows = tbody.find_all('tr', class_=lambda c: c != 'thead')
            
            # Process each row to extract game data
            games_data = []
            for row in rows:
                # Skip header rows or rows without data
                if 'class' in row.attrs and 'thead' in row.attrs['class']:
                    continue
                
                # Skip rows for games that weren't played (e.g., "Did Not Play")
                if not row.find('td', {'data-stat': 'date_game'}):
                    continue
                
                # Check if the player actually played in the game
                # Look for "Did Not Play", "Inactive", etc.
                reason_cell = row.find('td', {'data-stat': 'reason'})
                if reason_cell and reason_cell.text.strip() in ["Did Not Play", "Inactive", "Did Not Dress"]:
                    # Add the game with NaN values for stats
                    game_data = {
                        'date_game': row.find('td', {'data-stat': 'date_game'}).text.strip(),
                        'opp_id': row.find('td', {'data-stat': 'opp_id'}).text.strip() if row.find('td', {'data-stat': 'opp_id'}) else None,
                        'game_location': row.find('td', {'data-stat': 'game_location'}).text.strip() if row.find('td', {'data-stat': 'game_location'}) else None,
                        'pts': np.nan,
                        'ast': np.nan,
                        'trb': np.nan,
                        'reason': reason_cell.text.strip()
                    }
                    game_data['season'] = f"{season-1}-{season}"
                    games_data.append(game_data)
                    continue
                
                game_data = {}
                
                # Extract basic game information
                for cell in row.find_all('td'):
                    stat_name = cell.get('data-stat')
                    if stat_name:
                        # Get the text value
                        value = cell.text.strip()
                        
                        # Convert some values to appropriate types
                        if stat_name in ['pts', 'ast', 'trb']:
                            try:
                                value = int(value) if value else np.nan
                            except ValueError:
                                value = np.nan
                        
                        game_data[stat_name] = value
                
                # Add season information to distinguish between seasons
                game_data['season'] = f"{season-1}-{season}"
                
                games_data.append(game_data)
            
            # Convert to DataFrame
            return pd.DataFrame(games_data)
            
        except requests.RequestException as e:
            print(f"Error fetching data: {e}")
            return pd.DataFrame()
        except Exception as e:
            print(f"Unexpected error: {e}")
            return pd.DataFrame()
    
    def get_recent_games(self, player_name: str, seasons: Union[List[int], int] = [2025], 
                         last_n_games: int = 10) -> pd.DataFrame:
        """
        Get a player's most recent games without filtering by opponent.
        Will fetch enough games to return the requested number of games actually played
        (games with complete statistics).
        
        Args:
            player_name: Full name of the player (e.g., "Trae Young")
            seasons: List of season years or a single season year
                    (e.g., [2025, 2024] for both 2024-2025 and 2023-2024 seasons)
            last_n_games: Number of most recent games with complete stats to return (default: 10)
            
        Returns:
            DataFrame containing the player's recent game data
        """
        # Convert single season to list if needed
        if isinstance(seasons, int):
            seasons = [seasons]
        
        # Get game logs for each season and combine them
        all_games = []
        for season in seasons:
            print(f"Fetching data for {player_name} for {season-1}-{season} season...")
            game_log = self.get_game_log(player_name, season)
            
            if not game_log.empty:
                all_games.append(game_log)
        
        # Combine all season data
        if all_games:
            combined_games = pd.concat(all_games, ignore_index=True)
        else:
            print(f"No game data found for {player_name} in the specified seasons.")
            return pd.DataFrame()
        
        # Sort by date (newest first)
        if 'date_game' in combined_games.columns:
            combined_games = combined_games.sort_values(by='date_game', ascending=False)
        
        # Filter for games with complete stats
        valid_games = combined_games.dropna(subset=['pts', 'ast', 'trb'])
        
        # Get the most recent N games with complete stats
        valid_recent_games = valid_games.head(last_n_games)
        
        # If we don't have enough games with valid stats, fetch more
        if len(valid_recent_games) < last_n_games:
            print(f"Only found {len(valid_recent_games)} games with complete stats out of requested {last_n_games}.")
        
        # Select only the columns we need
        relevant_columns = ['date_game', 'season', 'opp_id', 'game_location', 'pts', 'ast', 'trb', 'mp', 'reason']
        columns_to_keep = [col for col in relevant_columns if col in valid_recent_games.columns]
        
        return valid_recent_games[columns_to_keep]

    def get_games_against_opponent(self, player_name: str, opponent: str, seasons: Union[List[int], int] = [2025, 2024], 
                                 last_n_games: int = 10) -> pd.DataFrame:
        """
        Get a player's games against a specific opponent for one or more seasons.
        Will fetch enough games to return the requested number of games actually played
        (games with complete statistics).
        
        Args:
            player_name: Full name of the player (e.g., "Trae Young")
            opponent: Opponent team abbreviation (e.g., "BOS")
            seasons: List of season years or a single season year
                    (e.g., [2025, 2024] for both 2024-2025 and 2023-2024 seasons)
            last_n_games: Number of most recent games with complete stats to return (default: 10)
            
        Returns:
            DataFrame containing the player's game data against the specified opponent
        """
        # Convert single season to list if needed
        if isinstance(seasons, int):
            seasons = [seasons]
        
        # Get game logs for each season and combine them
        all_games = []
        for season in seasons:
            print(f"Fetching data for {player_name} for {season-1}-{season} season...")
            game_log = self.get_game_log(player_name, season)
            
            if not game_log.empty:
                all_games.append(game_log)
        
        # Combine all season data
        if all_games:
            combined_games = pd.concat(all_games, ignore_index=True)
        else:
            print(f"No game data found for {player_name} in the specified seasons.")
            return pd.DataFrame()
        
        # Filter for games against the specified opponent
        if 'opp_id' in combined_games.columns:
            opponent_games = combined_games[combined_games['opp_id'] == opponent]
            
            if opponent_games.empty:
                print(f"No games found for {player_name} against {opponent} in the specified seasons.")
                return pd.DataFrame()
            
            # Sort by date (newest first)
            if 'date_game' in opponent_games.columns:
                opponent_games = opponent_games.sort_values(by='date_game', ascending=False)
            
            # Filter for games with complete stats
            valid_opponent_games = opponent_games.dropna(subset=['pts', 'ast', 'trb'])
            
            # Get the most recent N games with complete stats
            valid_recent_games = valid_opponent_games.head(last_n_games)
            
            # If we don't have enough games with valid stats, print a message
            if len(valid_recent_games) < last_n_games:
                print(f"Only found {len(valid_recent_games)} games with complete stats against {opponent} out of requested {last_n_games}.")
            
            # Select only the columns we need
            relevant_columns = ['date_game', 'season', 'opp_id', 'game_location', 'pts', 'ast', 'trb', 'mp', 'reason']
            columns_to_keep = [col for col in relevant_columns if col in valid_recent_games.columns]
            
            return valid_recent_games[columns_to_keep]
        else:
            print("Column 'opp_id' not found in game log data.")
            return pd.DataFrame()

# Usage example
if __name__ == "__main__":
    scraper = BasketballReferenceScaper()
    
    # Example: Get Trae Young's last 10 games (any opponent)
    player_name = "Trae Young"
    
    try:
        recent_games = scraper.get_recent_games(player_name, seasons=[2025], last_n_games=10)
        if not recent_games.empty:
            print(f"{player_name}'s last {len(recent_games)} games with complete stats:")
            print(recent_games[['date_game', 'season', 'opp_id', 'pts', 'ast', 'trb']])
            
            # Calculate averages
            print("\nAverage Statistics:")
            print(f"Points: {recent_games['pts'].mean():.1f}")
            print(f"Assists: {recent_games['ast'].mean():.1f}")
            print(f"Rebounds: {recent_games['trb'].mean():.1f}")
        else:
            print(f"No games with complete stats found for {player_name}.")
    except Exception as e:
        print(f"Error: {e}") 