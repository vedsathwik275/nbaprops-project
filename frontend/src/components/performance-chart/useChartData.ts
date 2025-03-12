
import { useMemo } from 'react';
import { GameLog } from '@/hooks/usePlayerData';
import { ChartDataPoint, StatType } from './types';

export const useChartData = (data: GameLog[], selectedStat: StatType) => {
  // Format data for chart - reverse to show oldest to newest
  const chartData = useMemo(() => {
    return [...data].reverse().map((game, index) => ({
      game: index + 1,
      date: game.date,
      opponent: game.opponent,
      location: game.location,
      points: game.points,
      rebounds: game.rebounds,
      assists: game.assists,
      result: game.result,
    }));
  }, [data]);
  
  // Configure chart based on selected stat
  const chartColor = selectedStat === 'points' 
    ? "#37bfbe" 
    : selectedStat === 'rebounds' 
      ? "#4338ca" 
      : "#9333ea";
  
  const statLabel = selectedStat === 'points' 
    ? "Points" 
    : selectedStat === 'rebounds' 
      ? "Rebounds" 
      : "Assists";
  
  return { chartData, chartColor, statLabel };
};
