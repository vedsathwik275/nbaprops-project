
import React from 'react';
import { GameLog } from '@/hooks/usePlayerData';
import { useChartData } from './performance-chart/useChartData';
import PerformanceLineChart from './performance-chart/PerformanceLineChart';
import { PerformanceChartProps } from './performance-chart/types';

const PerformanceChart = ({ data, betLines, selectedStat }: PerformanceChartProps) => {
  // Use custom hook to prepare chart data
  const { chartData, chartColor, statLabel } = useChartData(data, selectedStat);
  
  // Get the current bet line value for selected stat
  const betLine = betLines[selectedStat];
  
  return (
    <div className="glass rounded-xl p-4 h-full">
      <h3 className="text-lg font-merriweather font-bold text-white mb-4">{statLabel} Performance</h3>
      <div className="h-[300px]">
        <PerformanceLineChart 
          data={chartData}
          betLine={betLine}
          selectedStat={selectedStat}
          chartColor={chartColor}
        />
      </div>
    </div>
  );
};

export default PerformanceChart;
