import { PlayerSearchResult, FilterOptions, PlayerData } from '@/types/playerTypes';

// Fallback players in case API fails
const FALLBACK_PLAYERS: PlayerSearchResult[] = [
  { id: "jamesle01", name: "LeBron James", team: "Los Angeles Lakers", position: "SF" },
  { id: "curryst01", name: "Stephen Curry", team: "Golden State Warriors", position: "PG" },
  { id: "duranke01", name: "Kevin Durant", team: "Phoenix Suns", position: "SF" },
  { id: "antetgi01", name: "Giannis Antetokounmpo", team: "Milwaukee Bucks", position: "PF" },
  { id: "doncilu01", name: "Luka Dončić", team: "Dallas Mavericks", position: "PG" },
  { id: "jokicni01", name: "Nikola Jokić", team: "Denver Nuggets", position: "C" },
  { id: "embiijo01", name: "Joel Embiid", team: "Philadelphia 76ers", position: "C" },
  { id: "lillada01", name: "Damian Lillard", team: "Milwaukee Bucks", position: "PG" },
  { id: "tatumja01", name: "Jayson Tatum", team: "Boston Celtics", position: "SF" },
  { id: "moranja01", name: "Ja Morant", team: "Memphis Grizzlies", position: "PG" },
  { id: "youngtr01", name: "Trae Young", team: "Atlanta Hawks", position: "PG" }
];

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Search for players by name
 */
export const searchPlayers = async (query: string): Promise<PlayerSearchResult[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(`${API_BASE_URL}/players/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      console.error(`Error ${response.status}: ${response.statusText}`);
      // Fallback to client-side filtering if API fails
      const lowerQuery = query.toLowerCase();
      return FALLBACK_PLAYERS.filter(player => 
        player.name.toLowerCase().includes(lowerQuery)
      );
    }
    
    const data = await response.json();
    console.log("Search results:", data);
    return data;
  } catch (error) {
    console.error('Error searching players:', error);
    // Fallback to client-side filtering if API fails
    const lowerQuery = query.toLowerCase();
    return FALLBACK_PLAYERS.filter(player => 
      player.name.toLowerCase().includes(lowerQuery)
    );
  }
};

/**
 * Get player analysis data
 */
export const getPlayerAnalysis = async (
  playerName: string, 
  filters: FilterOptions
): Promise<PlayerData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/player/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerName,
        opponent: filters.opponent,
        location: filters.location,
        gamesCount: filters.gamesCount,
        seasons: filters.seasons,
        betLines: filters.betLines,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze player');
    }
    
    return await response.json();
  } catch (error: any) {
    console.error('Error analyzing player:', error);
    throw new Error(error.message || 'Failed to analyze player');
  }
}; 