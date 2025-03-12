import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PlayerSearchResult, FilterOptions, PlayerData } from '@/types/playerTypes';
import { searchPlayers, getPlayerAnalysis } from '@/utils/api';

export type { GameLog, StatSummary, PlayerData, PlayerSearchResult, FilterOptions } from '@/types/playerTypes';

export const usePlayerData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerSearchResult | null>(null);
  const [manuallyTriggered, setManuallyTriggered] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    opponent: 'ANY',
    location: 'ANY',
    gamesCount: 10,
    seasons: 'current',
    betLines: {
      points: 25.5,
      rebounds: 8.5,
      assists: 6.5,
    }
  });

  // Debug log for selectedPlayer changes
  useEffect(() => {
    console.log("usePlayerData - selectedPlayer changed:", selectedPlayer);
  }, [selectedPlayer]);

  // Search for players
  const { 
    data: searchResults, 
    isLoading: isSearching 
  } = useQuery({
    queryKey: ['playerSearch', searchQuery],
    queryFn: () => searchPlayers(searchQuery),
    enabled: searchQuery.length > 2,
  });

  // Get player analysis
  const { 
    data: playerData, 
    isLoading: isAnalyzing,
    error,
    refetch
  } = useQuery({
    queryKey: ['playerAnalysis', selectedPlayer?.name, filters],
    queryFn: () => {
      if (!selectedPlayer) {
        console.log("queryFn - No player selected");
        throw new Error('No player selected');
      }
      console.log("queryFn - Fetching data for:", selectedPlayer.name);
      return getPlayerAnalysis(selectedPlayer.name, filters);
    },
    enabled: false, // Disable auto-fetching - only fetch when manually triggered
    meta: {
      onError: (error: Error) => {
        console.error("Query error:", error);
        toast.error('Error fetching player data', {
          description: error instanceof Error ? error.message : 'An unknown error occurred'
        });
      }
    }
  });

  const analyze = () => {
    console.log("analyze called - selectedPlayer:", selectedPlayer);
    
    if (!selectedPlayer) {
      console.log("No player selected, showing error toast");
      toast.error('Please select a player to analyze');
      return;
    }
    
    console.log("Manually triggering analysis for player:", selectedPlayer.name);
    setManuallyTriggered(true);
    refetch();
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults: searchResults || [],
    isSearching,
    selectedPlayer,
    setSelectedPlayer,
    filters,
    setFilters,
    playerData,
    isAnalyzing,
    error,
    analyze,
  };
};
