import argparse
import sys
import pandas as pd
import numpy as np
from datetime import datetime
from src.scrapers.basketball_reference import BasketballReferenceScaper

def get_current_season():
    """
    Determine the current NBA season based on the current date.
    NBA seasons are named by the year they end in.
    For example, the 2024-2025 season is represented as 2025.
    
    Returns:
        int: The current season year (e.g., 2025 for the 2024-2025 season)
    """
    current_date = datetime.now()
    current_month = current_date.month
    current_year = current_date.year
    
    # NBA season typically starts in October and ends in June
    # If we're in July-September, we're in the offseason approaching the next season
    if current_month >= 7 and current_month <= 9:
        return current_year + 1
    # If we're in October-December, we're in the first part of the season
    elif current_month >= 10:
        return current_year + 1
    # If we're in January-June, we're in the second part of the season
    else:
        return current_year

def generate_season_years(num_seasons):
    """
    Generate a list of season years based on the number of seasons requested.
    
    Args:
        num_seasons (int): Number of seasons to include
        
    Returns:
        list: List of season years in descending order (most recent first)
    """
    current_season = get_current_season()
    return [current_season - i for i in range(num_seasons)]

def display_stats(games_df, player_name, opponent=None):
    """
    Display statistics for the given games dataframe.
    
    Args:
        games_df (DataFrame): DataFrame containing game data
        player_name (str): Name of the player
        opponent (str, optional): Opponent team abbreviation
    """
    if games_df.empty:
        if opponent:
            print(f"No valid game data found for {player_name} against {opponent}.")
        else:
            print(f"No valid game data found for {player_name}.")
        return
    
    # Display game data
    if opponent:
        print(f"\n{player_name}'s last {len(games_df)} games with complete stats against {opponent}:")
    else:
        print(f"\n{player_name}'s last {len(games_df)} games with complete stats:")
    
    print(games_df[['date_game', 'season', 'opp_id', 'pts', 'ast', 'trb']])
    
    # Calculate basic statistics
    if len(games_df) > 0:
        print("\nStatistical Summary:")
        stats = {
            'Points': games_df['pts'],
            'Assists': games_df['ast'],
            'Rebounds': games_df['trb']
        }
        
        for stat_name, stat_values in stats.items():
            if not stat_values.empty and not all(pd.isna(stat_values)):
                avg = stat_values.mean()
                median = stat_values.median()
                max_val = stat_values.max()
                min_val = stat_values.min()
                
                print(f"{stat_name}: Avg={avg:.1f}, Median={median:.1f}, Min={min_val}, Max={max_val}")
        
        # Show statistics by season if multiple seasons
        seasons_with_data = games_df['season'].unique()
        if len(seasons_with_data) > 1:
            print("\nStatistics by Season:")
            for season in sorted(seasons_with_data, reverse=True):
                season_games = games_df[games_df['season'] == season]
                if len(season_games) > 0:
                    print(f"\n{season} Season ({len(season_games)} games):")
                    
                    for stat_name, stat_column in [('Points', 'pts'), ('Assists', 'ast'), ('Rebounds', 'trb')]:
                        if stat_column in season_games.columns:
                            season_values = season_games[stat_column]
                            if not season_values.empty and not all(pd.isna(season_values)):
                                avg = season_values.mean()
                                median = season_values.median()
                                print(f"  {stat_name}: Avg={avg:.1f}, Median={median:.1f}")

def main():
    parser = argparse.ArgumentParser(description='NBA Prop Bet Analyzer - Get player stats against specific opponents')
    parser.add_argument('player_name', type=str, help='Full name of the NBA player (e.g., "Trae Young")')
    parser.add_argument('opponent', type=str, nargs='?', help='Opponent team abbreviation (e.g., "BOS"). If not provided, shows stats for all recent games.')
    parser.add_argument('--seasons', type=int, default=2, 
                        help='Number of seasons to analyze (e.g., 2 for current and previous season)')
    parser.add_argument('--games', type=int, default=10, help='Number of most recent games to analyze')
    parser.add_argument('--current-only', action='store_true', help='Only analyze current season')
    
    args = parser.parse_args()
    
    # Generate the list of season years
    if args.current_only:
        season_years = [get_current_season()]
    else:
        season_years = generate_season_years(args.seasons)
    
    scraper = BasketballReferenceScaper()
    
    seasons_str = ", ".join([f"{s-1}-{s}" for s in season_years])
    
    try:
        if args.opponent:
            # Fetch games against specific opponent
            print(f"Fetching data for {args.player_name} against {args.opponent} for seasons: {seasons_str}...")
            games = scraper.get_games_against_opponent(
                player_name=args.player_name,
                opponent=args.opponent,
                seasons=season_years,
                last_n_games=args.games
            )
            
            if games.empty:
                print(f"No games found for {args.player_name} against {args.opponent} in the specified seasons.")
                return
            
            display_stats(games, args.player_name, args.opponent)
            
        else:
            # Fetch recent games without opponent filtering
            print(f"Fetching recent games data for {args.player_name} for seasons: {seasons_str}...")
            games = scraper.get_recent_games(
                player_name=args.player_name,
                seasons=season_years,
                last_n_games=args.games
            )
            
            if games.empty:
                print(f"No games found for {args.player_name} in the specified seasons.")
                return
            
            display_stats(games, args.player_name)
        
    except Exception as e:
        print(f"Error: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main()) 