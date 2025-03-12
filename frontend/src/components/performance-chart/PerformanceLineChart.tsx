
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { ChartDataPoint, StatType } from './types';
import ChartTooltip from './ChartTooltip';

interface PerformanceLineChartProps {
  data: ChartDataPoint[];
  betLine: number;
  selectedStat: StatType;
  chartColor: string;
}

const PerformanceLineChart: React.FC<PerformanceLineChartProps> = ({
  data,
  betLine,
  selectedStat,
  chartColor
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="game" 
          stroke="rgba(255,255,255,0.5)" 
          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} 
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)" 
          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} 
          axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
        />
        <Tooltip content={(props) => (
          <ChartTooltip {...props} selectedStat={selectedStat} betLine={betLine} />
        )} />
        <ReferenceLine 
          y={betLine} 
          stroke="rgba(255,255,255,0.7)" 
          strokeDasharray="3 3" 
          label={{ 
            value: `Line: ${betLine}`, 
            fill: 'rgba(255,255,255,0.9)',
            fontSize: 12,
            position: 'insideBottomRight'
          }} 
        />
        <Line 
          type="monotone" 
          dataKey={selectedStat} 
          stroke={chartColor} 
          strokeWidth={2} 
          dot={{ 
            fill: chartColor, 
            r: 4,
            strokeWidth: 0
          }} 
          activeDot={{ 
            r: 6, 
            stroke: '#fff',
            strokeWidth: 2,
            fill: chartColor
          }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceLineChart;
