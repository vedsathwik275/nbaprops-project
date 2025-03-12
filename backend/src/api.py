from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import re
from src.scrapers.basketball_reference import BasketballReferenceScaper
from src.main import get_current_season, generate_season_years

app = Flask(__name__)
# Setup CORS properly
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize the scraper
scraper = BasketballReferenceScaper()

# Hardcoded players for search (temporary solution) - keeping as fallback
PLAYERS = [
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

# Helper function to convert time format (MM:SS) to minutes as float
def convert_minutes(minutes_str):
    if pd.isna(minutes_str):
        return 0.0
    
    if isinstance(minutes_str, (int, float)):
        return float(minutes_str)
    
    # Check if the string is in MM:SS format
    if isinstance(minutes_str, str) and ':' in minutes_str:
        try:
            parts = minutes_str.split(':')
            if len(parts) == 2:
                minutes = int(parts[0])
                seconds = int(parts[1])
                return minutes + (seconds / 60.0)
        except (ValueError, IndexError):
            pass
    
    # If we can't parse it, return 0
    return 0.0

@app.route('/api/players/search', methods=['GET'])
def search_players():
    """Search for players using Basketball Reference scraper"""
    query = request.args.get('q', '').strip()
    
    if not query or len(query) < 2:
        return jsonify([])
    
    try:
        # Use the scraper to search for players
        results = scraper.search_players(query)
        
        # If no results, fall back to hardcoded players
        if not results:
            fallback_results = [p for p in PLAYERS if query.lower() in p["name"].lower()]
            return jsonify(fallback_results)
            
        return jsonify(results)
    except Exception as e:
        print(f"Error in player search API: {e}")
        # Fall back to hardcoded players in case of error
        fallback_results = [p for p in PLAYERS if query.lower() in p["name"].lower()]
        return jsonify(fallback_results)

@app.route('/api/test', methods=['GET'])
def test():
    """Test endpoint to verify API is working"""
    return jsonify({"status": "API is working"})

def calculate_stats(game_logs, stat, bet_line):
    """
    Calculate statistics for a specific stat category
    """
    values = [game[stat] for game in game_logs]
    
    average = sum(values) / len(values) if values else 0
    sorted_values = sorted(values)
    median = sorted_values[len(sorted_values) // 2] if sorted_values else 0
    min_val = min(values) if values else 0
    max_val = max(values) if values else 0
    
    # Calculate over percentage based on bet line
    over_count = sum(1 for v in values if v > bet_line)
    over_percentage = (over_count / len(values)) * 100 if values else 0
    
    # Calculate trend based on last 5 games vs previous 5
    last_five = values[:5]
    prev_five = values[5:10]
    
    last_five_avg = sum(last_five) / len(last_five) if last_five else 0
    prev_five_avg = sum(prev_five) / len(prev_five) if prev_five else last_five_avg
    
    if last_five_avg > prev_five_avg + 1:
        trend = 'up'
    elif last_five_avg < prev_five_avg - 1:
        trend = 'down'
    else:
        trend = 'stable'
    
    return {
        "average": round(average, 1),
        "median": median,
        "min": min_val,
        "max": max_val,
        "overPercentage": round(over_percentage, 1),
        "lastFiveAvg": round(last_five_avg, 1),
        "trend": trend
    }

@app.route('/api/player/analyze', methods=['POST'])
def analyze_player():
    """Analyze player performance based on request parameters"""
    try:
        data = request.json
        
        if not data or 'playerName' not in data:
            return jsonify({"error": "Player name is required"}), 400
        
        # Extract player name without years in parentheses
        player_name = data.get('playerName')
        # Remove any text in parentheses, typically years like "(2019-2025)"
        player_name = re.sub(r'\s*\([^)]*\)', '', player_name).strip()
        
        # Check if player ID is provided
        player_id = data.get('playerId')
        
        opponent = data.get('opponent', None)
        if opponent == 'ANY':
            opponent = None
        
        location = data.get('location', 'ANY')
        games_count = int(data.get('gamesCount', 10))
        seasons_option = data.get('seasons', 'current')
        
        # Generate season years based on request
        if seasons_option == 'current':
            season_years = [get_current_season()]
        else:
            season_years = generate_season_years(2)  # current and previous season
        
        # Initialize the scraper
        scraper = BasketballReferenceScaper()
        
        # Get games data based on parameters
        if opponent and opponent != 'ANY':
            games_df = scraper.get_games_against_opponent(
                player_name=player_name,
                opponent=opponent,
                seasons=season_years,
                last_n_games=games_count,
                player_id=player_id
            )
        else:
            games_df = scraper.get_recent_games(
                player_name=player_name,
                seasons=season_years,
                last_n_games=games_count,
                player_id=player_id
            )
        
        # Filter by location if specified
        if location != 'ANY' and not games_df.empty and 'game_location' in games_df.columns:
            games_df = games_df[games_df['game_location'] == location]
            games_df = games_df.head(games_count)  # Limit to requested games count
        
        if games_df.empty:
            # If no data found, return a user-friendly error message
            return jsonify({
                "error": f"No games found for {player_name} with the specified filters."
            }), 404
        
        # Transform data to match frontend expectations
        game_logs = []
        for _, game in games_df.iterrows():
            # Handle minutes played conversion
            minutes = 0
            if 'mp' in game and not pd.isna(game['mp']):
                minutes = convert_minutes(game['mp'])
            
            game_log = {
                "date": game['date_game'],
                "opponent": game['opp_id'],
                "location": game['game_location'] if 'game_location' in game else 'H',
                "points": float(game['pts']) if 'pts' in game and not pd.isna(game['pts']) else 0,
                "rebounds": float(game['trb']) if 'trb' in game and not pd.isna(game['trb']) else 0,
                "assists": float(game['ast']) if 'ast' in game and not pd.isna(game['ast']) else 0,
                "minutes": minutes,
                "result": 'W'  # Default to win since we don't have this info
            }
            game_logs.append(game_log)
        
        # Get bet lines from request
        bet_lines = data.get('betLines', {
            'points': 0,
            'rebounds': 0,
            'assists': 0
        })
        
        # Calculate statistics for each category
        stats = {
            "points": calculate_stats(game_logs, 'points', bet_lines.get('points', 0)),
            "rebounds": calculate_stats(game_logs, 'rebounds', bet_lines.get('rebounds', 0)),
            "assists": calculate_stats(game_logs, 'assists', bet_lines.get('assists', 0))
        }
        
        # Return the analyzed data
        return jsonify({
            "playerName": player_name,
            "gameLogs": game_logs,
            "stats": stats
        })
        
    except Exception as e:
        print(f"Error in analyze_player: {str(e)}")
        # If we encounter an error, return mock data as a fallback
        player_name = data.get('playerName') if data and 'playerName' in data else "Unknown Player"
        return jsonify({
            "playerName": player_name,
            "gameLogs": [
                {
                    "date": "2025-03-08",
                    "opponent": "BOS",
                    "location": "H",
                    "points": 22.0,
                    "rebounds": 14.0,
                    "assists": 9.0,
                    "minutes": 36.0,
                    "result": "W"
                },
                {
                    "date": "2025-03-06",
                    "opponent": "NYK",
                    "location": "A",
                    "points": 31.0,
                    "rebounds": 12.0,
                    "assists": 8.0,
                    "minutes": 38.0,
                    "result": "L"
                }
            ],
            "stats": {
                "points": {
                    "average": 28.3,
                    "median": 27.5,
                    "min": 17.0,
                    "max": 40.0,
                    "overPercentage": 60.0,
                    "lastFiveAvg": 28.4,
                    "trend": "up"
                },
                "rebounds": {
                    "average": 10.5,
                    "median": 10.5,
                    "min": 5.0,
                    "max": 17.0,
                    "overPercentage": 70.0,
                    "lastFiveAvg": 12.0,
                    "trend": "stable"
                },
                "assists": {
                    "average": 6.4,
                    "median": 6.0,
                    "min": 3.0,
                    "max": 11.0,
                    "overPercentage": 40.0,
                    "lastFiveAvg": 5.8,
                    "trend": "down"
                }
            }
        })

@app.route('/api/player/odds', methods=['POST'])
def get_player_odds_endpoint():
    """Get player odds from the Odds API - DEPRECATED, WILL BE REMOVED"""
    return jsonify({
        "error": "This endpoint has been deprecated",
        "message": "Prop bet lines are now set manually by the user"
    }), 410

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0') 