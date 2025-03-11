# Changelog

## [0.4.1] - 2025-03-11

### Fixed
- Modified the scraper to fetch the requested number of games that were actually played
- Improved filtering to skip games where the player didn't play
- Removed redundant filtering in the main script
- Enhanced error messages to be more specific about the number of games found

## [0.4.0] - 2025-03-11

### Added
- Support for retrieving a player's recent games without opponent filtering
- Made the opponent parameter optional in the command-line interface
- Added a new method in the scraper class to get recent games

### Changed
- Refactored the main script to handle both opponent-specific and general recent game analysis
- Improved documentation to explain the new functionality

## [0.3.0] - 2025-03-11

### Changed
- Modified the `--seasons` flag to take the number of seasons to analyze instead of specific year values
- Added automatic detection of the current NBA season
- Updated documentation to reflect new command-line options

## [0.2.0] - 2025-03-11

### Added
- Support for multi-season data retrieval (current and previous seasons)
- Season-by-season statistical breakdowns
- Better handling of games where player did not play
- Command-line option to analyze only the current season (--current-only)
- More detailed season information in the output

### Fixed
- Proper handling of NaN values in statistical calculations
- Improved error handling for missing data
- Better filtering of games with incomplete statistics

## [0.1.0] - 2025-03-11

### Added
- Initial implementation of NBA Prop Bet Analyzer
- Basic command-line interface
- Scraper for basketball-reference.com
- Support for retrieving player game logs
- Filtering games by opponent
- Basic statistical analysis (mean, median, min, max) 