# NBA Props Project - Backend

This is the backend service for the NBA Props Project, which scrapes basketball statistics and provides them through a REST API.

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the API server:
   ```bash
   cd backend
   python -m src.api
   ```

The server will start at http://localhost:5000.

## API Endpoints

### 1. Search Players
**GET /api/players/search**

Query parameters:
- `q` - Search query (player name)

Example:
```
GET /api/players/search?q=LeBron
```

### 2. Analyze Player
**POST /api/player/analyze**

Request body:
```json
{
  "playerName": "LeBron James",
  "opponent": "BOS",  // or "ANY"
  "location": "H",    // "H", "A", or "ANY"
  "gamesCount": 10,
  "seasons": "current", // or "both"
  "betLines": {
    "points": 25.5,
    "rebounds": 8.5,
    "assists": 6.5
  }
}
```

Response:
```json
{
  "playerName": "LeBron James",
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
    // more games...
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
      // similar structure
    },
    "assists": {
      // similar structure
    }
  }
}
```

## Original Command Line Usage

You can still use the original command line tool:

```bash
python -m src.main "LeBron James" --games 10
``` 