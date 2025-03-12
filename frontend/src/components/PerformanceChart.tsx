
import { useMemo } from 'react';
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
import { GameLog } from '@/hooks/usePlayerData';

interface PerformanceChartProps {
  data: GameLog[];
  betLines: {
    points: number;
    rebounds: number;
    assists: number;
  };
  selectedStat: 'points' | 'rebounds' | 'assists';
}

const PerformanceChart = ({ data, betLines, selectedStat }: PerformanceChartProps) => {
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
  
  // Get the current bet line value for selected stat
  const betLine = betLines[selectedStat];
  
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
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const game = payload[0].payload;
      return (
        <div className="glass p-3 border border-white/10 rounded-md shadow-lg">
          <div className="font-bold text-sm mb-1">Game {label} vs {game.opponent}</div>
          <div className="text-xs mb-1">{game.date} · {game.location === 'H' ? 'Home' : 'Away'}</div>
          <div className="flex items-center text-sm mt-1">
            <span className="font-bold text-teal">{game[selectedStat]}</span>
            <span className="mx-1 text-white/60">{statLabel}</span>
            {game[selectedStat] > betLine ? (
              <span className="text-xs px-1 py-0.5 bg-teal/20 text-teal rounded ml-1">OVER</span>
            ) : (
              <span className="text-xs px-1 py-0.5 bg-purple-light/20 text-purple-light rounded ml-1">UNDER</span>
            )}
          </div>
          <div className="text-xs text-white/60 mt-1">Result: {game.result === 'W' ? 'Win' : 'Loss'}</div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="glass rounded-xl p-4 h-full">
      <h3 className="text-lg font-merriweather font-bold text-white mb-4">{statLabel} Performance</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
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
            <Tooltip content={<CustomTooltip />} />
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
      </div>
    </div>
  );
};

export default PerformanceChart;
