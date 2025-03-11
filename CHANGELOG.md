# Changelog

## [0.2.0] - 2023-03-11

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

## [0.1.0] - 2023-03-11

### Added
- Initial implementation of NBA Prop Bet Analyzer
- Basic command-line interface
- Scraper for basketball-reference.com
- Support for retrieving player game logs
- Filtering games by opponent
- Basic statistical analysis (mean, median, min, max) 