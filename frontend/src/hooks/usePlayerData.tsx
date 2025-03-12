
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PlayerSearchResult, FilterOptions, PlayerData } from '@/types/playerTypes';
import { searchPlayers, getPlayerAnalysis } from '@/utils/mockPlayerData';

export type { GameLog, StatSummary, PlayerData, PlayerSearchResult, FilterOptions } from '@/types/playerTypes';

export const usePlayerData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerSearchResult | null>(null);
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
        throw new Error('No player selected');
      }
      return getPlayerAnalysis(selectedPlayer.name, filters);
    },
    enabled: !!selectedPlayer,
    meta: {
      onError: (error: Error) => {
        toast.error('Error fetching player data', {
          description: error instanceof Error ? error.message : 'An unknown error occurred'
        });
      }
    }
  });

  const analyze = () => {
    if (selectedPlayer) {
      refetch();
    } else {
      toast.error('Please select a player to analyze');
    }
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
