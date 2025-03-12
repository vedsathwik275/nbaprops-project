
import { PlayerSearchResult, FilterOptions, PlayerData, GameLog, StatSummary } from '@/types/playerTypes';

// Mock function to simulate API call for search
export const searchPlayers = async (query: string): Promise<PlayerSearchResult[]> => {
  // This would be replaced with an actual API call
  if (!query) return [];
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data
  return [
    { id: "1", name: "LeBron James", team: "Los Angeles Lakers", position: "SF" },
    { id: "2", name: "Stephen Curry", team: "Golden State Warriors", position: "PG" },
    { id: "3", name: "Kevin Durant", team: "Phoenix Suns", position: "SF" },
    { id: "4", name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", position: "PF" },
    { id: "5", name: "Luka Dončić", team: "Dallas Mavericks", position: "PG" },
  ].filter(player => 
    player.name.toLowerCase().includes(query.toLowerCase())
  );
};

// Calculate stats for mock data
const calculateStats = (gameLogs: GameLog[], stat: 'points' | 'rebounds' | 'assists', betLine: number): StatSummary => {
  const values = gameLogs.map(game => game[stat]);
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  const sortedValues = [...values].sort((a, b) => a - b);
  const median = sortedValues[Math.floor(sortedValues.length / 2)];
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  // Calculate over percentage based on bet line
  const overCount = values.filter(v => v > betLine).length;
  const overPercentage = (overCount / values.length) * 100;
  
  // Calculate trend based on last 5 games vs previous 5
  const lastFive = values.slice(0, 5);
  const prevFive = values.slice(5, 10);
  const lastFiveAvg = lastFive.reduce((a, b) => a + b, 0) / lastFive.length;
  const prevFiveAvg = prevFive.length ? prevFive.reduce((a, b) => a + b, 0) / prevFive.length : lastFiveAvg;
  
  const trend = lastFiveAvg > prevFiveAvg + 1 ? 'up' : 
               lastFiveAvg < prevFiveAvg - 1 ? 'down' : 'stable';
  
  return {
    average,
    median,
    min,
    max,
    overPercentage,
    lastFiveAvg,
    trend,
  };
};

// Mock function to simulate API call for player analysis
export const getPlayerAnalysis = async (
  playerName: string, 
  filters: FilterOptions
): Promise<PlayerData> => {
  // This would be replaced with an actual API call
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock data based on playerName and filters
  const mockGameLogs: GameLog[] = Array.from({ length: filters.gamesCount }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (i + 1));
    
    // Generate semi-realistic stats
    const basePoints = playerName.includes("LeBron") ? 25 : 
                      playerName.includes("Curry") ? 28 :
                      playerName.includes("Durant") ? 26 :
                      playerName.includes("Giannis") ? 29 : 22;
                      
    const baseRebounds = playerName.includes("LeBron") ? 7 :
                        playerName.includes("Curry") ? 5 :
                        playerName.includes("Durant") ? 6 :
                        playerName.includes("Giannis") ? 12 : 6;
                        
    const baseAssists = playerName.includes("LeBron") ? 7 :
                       playerName.includes("Curry") ? 6 :
                       playerName.includes("Durant") ? 4 :
                       playerName.includes("Giannis") ? 5 : 5;
    
    // Add some variance
    const variance = (base: number) => Math.round(base + (Math.random() * 8 - 4));
    
    // List of opponents for mock data
    const opponents = ["BOS", "NYK", "PHI", "MIA", "CHI", "TOR", "ATL", "CLE", "IND", "DET"];
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    
    // If filter is set and not ANY, use that opponent
    const opponent = filters.opponent !== "ANY" ? filters.opponent : randomOpponent;
    
    // If location filter is set and not ANY, use that location
    const possibleLocations: ('H' | 'A')[] = ['H', 'A'];
    const location = filters.location !== "ANY" 
      ? filters.location as 'H' | 'A'
      : possibleLocations[Math.floor(Math.random() * possibleLocations.length)];
    
    // Random result
    const result = Math.random() > 0.5 ? 'W' : 'L';
    
    return {
      date: date.toLocaleDateString(),
      opponent,
      location,
      points: variance(basePoints),
      rebounds: variance(baseRebounds),
      assists: variance(baseAssists),
      minutes: Math.round(30 + (Math.random() * 8)),
      result,
    };
  });
  
  return {
    playerName,
    gameLogs: mockGameLogs,
    stats: {
      points: calculateStats(mockGameLogs, 'points', filters.betLines.points),
      rebounds: calculateStats(mockGameLogs, 'rebounds', filters.betLines.rebounds),
      assists: calculateStats(mockGameLogs, 'assists', filters.betLines.assists),
    }
  };
};
