
import { GameLog } from '@/hooks/usePlayerData';

export type StatType = 'points' | 'rebounds' | 'assists';

export interface BetLines {
  points: number;
  rebounds: number;
  assists: number;
}

export interface ChartDataPoint {
  game: number;
  date: string;
  opponent: string;
  location: 'H' | 'A';
  points: number;
  rebounds: number;
  assists: number;
  result: 'W' | 'L';
}

export interface PerformanceChartProps {
  data: GameLog[];
  betLines: BetLines;
  selectedStat: StatType;
}
