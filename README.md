# NBA Prop Bet Analyzer

A tool to analyze NBA player performance data for proposition betting insights.

## Overview

The NBA Prop Bet Analyzer helps bettors make informed decisions by analyzing a player's historical performance against specific opponents. The tool retrieves data from basketball-reference.com and provides statistical insights on points, rebounds, and assists.

## Features

- Retrieve a player's game logs for the current and previous seasons
- Analyze recent performance across all games
- Filter games by specific opponents (optional)
- Calculate statistical measures (average, median, min, max) for key metrics
- Compare performance across different seasons
- Simple command-line interface

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/nbaprops-project.git
cd nbaprops-project
```

2. Install required dependencies:
```bash
pip install requests beautifulsoup4 pandas
```

Or use the requirements.txt file:
```bash
pip install -r requirements.txt
```

## Usage

Run the tool from the command line:

```bash
python -m src.main "Player Name" [OPPONENT_CODE] [--seasons NUM_SEASONS] [--games NUM_GAMES] [--current-only]
```

### Arguments:

- `Player Name`: Full name of the NBA player (e.g., "Trae Young")
- `OPPONENT_CODE`: (Optional) Three-letter team code (e.g., "BOS" for Boston Celtics). If not provided, shows stats for all recent games regardless of opponent.

### Options:

- `--seasons`: Number of seasons to analyze (e.g., 2 for current and previous season)
- `--games`: Number of most recent games to analyze (default: 10)
- `--current-only`: Only analyze current season

### Examples:

```bash
# Get Trae Young's last 10 games against Boston from both current and previous season
python -m src.main "Trae Young" BOS

# Get Trae Young's last 10 games regardless of opponent
python -m src.main "Trae Young"

# Get only current season performance against Chicago
python -m src.main "Trae Young" CHI --current-only

# Get data from the last 3 seasons against Detroit
python -m src.main "Trae Young" DET --seasons 3

# Get a player's 5 most recent games overall
python -m src.main "Trae Young" --games 5
```

This will display the player's performance data for the specified games, along with statistical summaries for points, rebounds, and assists.

## Team Abbreviations

Here are the three-letter codes for NBA teams:

- ATL: Atlanta Hawks
- BOS: Boston Celtics
- BRK: Brooklyn Nets
- CHO: Charlotte Hornets
- CHI: Chicago Bulls
- CLE: Cleveland Cavaliers
- DAL: Dallas Mavericks
- DEN: Denver Nuggets
- DET: Detroit Pistons
- GSW: Golden State Warriors
- HOU: Houston Rockets
- IND: Indiana Pacers
- LAC: Los Angeles Clippers
- LAL: Los Angeles Lakers
- MEM: Memphis Grizzlies
- MIA: Miami Heat
- MIL: Milwaukee Bucks
- MIN: Minnesota Timberwolves
- NOP: New Orleans Pelicans
- NYK: New York Knicks
- OKC: Oklahoma City Thunder
- ORL: Orlando Magic
- PHI: Philadelphia 76ers
- PHO: Phoenix Suns
- POR: Portland Trail Blazers
- SAC: Sacramento Kings
- SAS: San Antonio Spurs
- TOR: Toronto Raptors
- UTA: Utah Jazz
- WAS: Washington Wizards

## Future Enhancements

- Web interface
- Advanced statistical analysis
- Betting line comparisons
- More prop bet categories
- Machine learning-based predictions 