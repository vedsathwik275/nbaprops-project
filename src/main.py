import argparse
import sys
import pandas as pd
import numpy as np
from src.scrapers.basketball_reference import BasketballReferenceScaper

def main():
    parser = argparse.ArgumentParser(description='NBA Prop Bet Analyzer - Get player stats against specific opponents')
    parser.add_argument('player_name', type=str, help='Full name of the NBA player (e.g., "Trae Young")')
    parser.add_argument('opponent', type=str, help='Opponent team abbreviation (e.g., "BOS")')
    parser.add_argument('--seasons', type=int, nargs='+', default=[2025, 2024], 
                        help='NBA season years to analyze (e.g., 2025 2024 for both 2024-2025 and 2023-2024 seasons)')
    parser.add_argument('--games', type=int, default=10, help='Number of most recent games to analyze')
    parser.add_argument('--current-only', action='store_true', help='Only analyze current season (2024-2025)')
    
    args = parser.parse_args()
    
    # If current-only flag is set, override seasons parameter
    if args.current_only:
        args.seasons = [2025]
    
    scraper = BasketballReferenceScaper()
    
    seasons_str = ", ".join([f"{s-1}-{s}" for s in args.seasons])
    print(f"Fetching data for {args.player_name} against {args.opponent} for seasons: {seasons_str}...")
    
    try:
        games = scraper.get_games_against_opponent(
            player_name=args.player_name,
            opponent=args.opponent,
            seasons=args.seasons,
            last_n_games=args.games
        )
        
        if games.empty:
            print(f"No games found for {args.player_name} against {args.opponent} in the specified seasons.")
            return
        
        # Clean the data - remove rows with NaN values in key statistics
        valid_games = games.dropna(subset=['pts', 'ast', 'trb'])
        
        if valid_games.empty:
            print(f"No valid game data found for {args.player_name} against {args.opponent} (all games have missing stats).")
            return
        
        # Display game data
        print(f"\n{args.player_name}'s last {len(valid_games)} games against {args.opponent} with complete stats:")
        print(valid_games[['date_game', 'season', 'opp_id', 'pts', 'ast', 'trb']])
        
        # Calculate basic statistics
        if len(valid_games) > 0:
            print("\nStatistical Summary:")
            stats = {
                'Points': valid_games['pts'],
                'Assists': valid_games['ast'],
                'Rebounds': valid_games['trb']
            }
            
            for stat_name, stat_values in stats.items():
                if not stat_values.empty and not all(pd.isna(stat_values)):
                    avg = stat_values.mean()
                    median = stat_values.median()
                    max_val = stat_values.max()
                    min_val = stat_values.min()
                    
                    print(f"{stat_name}: Avg={avg:.1f}, Median={median:.1f}, Min={min_val}, Max={max_val}")
            
            # Show statistics by season if multiple seasons
            seasons_with_data = valid_games['season'].unique()
            if len(seasons_with_data) > 1:
                print("\nStatistics by Season:")
                for season in sorted(seasons_with_data, reverse=True):
                    season_games = valid_games[valid_games['season'] == season]
                    if len(season_games) > 0:
                        print(f"\n{season} Season ({len(season_games)} games):")
                        
                        for stat_name, stat_column in [('Points', 'pts'), ('Assists', 'ast'), ('Rebounds', 'trb')]:
                            if stat_column in season_games.columns:
                                season_values = season_games[stat_column]
                                if not season_values.empty and not all(pd.isna(season_values)):
                                    avg = season_values.mean()
                                    median = season_values.median()
                                    print(f"  {stat_name}: Avg={avg:.1f}, Median={median:.1f}")
        
    except Exception as e:
        print(f"Error: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main()) 