
export interface GameLog {
  date: string;
  opponent: string;
  location: 'H' | 'A';
  points: number;
  rebounds: number;
  assists: number;
  minutes: number;
  result: 'W' | 'L';
}

export interface StatSummary {
  average: number;
  median: number;
  min: number;
  max: number;
  overPercentage: number;
  lastFiveAvg: number;
  trend: 'up' | 'down' | 'stable';
}

export interface PlayerData {
  playerName: string;
  gameLogs: GameLog[];
  stats: {
    points: StatSummary;
    rebounds: StatSummary;
    assists: StatSummary;
  };
}

export interface PlayerSearchResult {
  id: string;
  name: string;
  team: string;
  position: string;
}

export interface FilterOptions {
  opponent: string;
  location: 'H' | 'A' | 'ANY';
  gamesCount: number;
  seasons: 'current' | 'both';
  betLines: {
    points: number;
    rebounds: number;
    assists: number;
  };
}
