
import { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell,
  Legend
} from 'recharts';
import { GameLog } from '@/hooks/usePlayerData';

interface ComparisonChartProps {
  data: GameLog[];
  betLines: {
    points: number;
    rebounds: number;
    assists: number;
  };
}

const ComparisonChart = ({ data, betLines }: ComparisonChartProps) => {
  // Process data for the chart
  const chartData = useMemo(() => {
    // Calculate averages for each stat
    const pointsSum = data.reduce((acc, game) => acc + game.points, 0);
    const reboundsSum = data.reduce((acc, game) => acc + game.rebounds, 0);
    const assistsSum = data.reduce((acc, game) => acc + game.assists, 0);
    
    const pointsAvg = pointsSum / data.length;
    const reboundsAvg = reboundsSum / data.length;
    const assistsAvg = assistsSum / data.length;
    
    // Calculate over percentages
    const pointsOverCount = data.filter(game => game.points > betLines.points).length;
    const reboundsOverCount = data.filter(game => game.rebounds > betLines.rebounds).length;
    const assistsOverCount = data.filter(game => game.assists > betLines.assists).length;
    
    const pointsOverPct = (pointsOverCount / data.length) * 100;
    const reboundsOverPct = (reboundsOverCount / data.length) * 100;
    const assistsOverPct = (assistsOverCount / data.length) * 100;
    
    return [
      {
        name: 'Points',
        average: pointsAvg,
        line: betLines.points,
        overPct: pointsOverPct,
        shortName: 'PTS',
        color: '#37bfbe',
      },
      {
        name: 'Rebounds',
        average: reboundsAvg,
        line: betLines.rebounds,
        overPct: reboundsOverPct,
        shortName: 'REB',
        color: '#4338ca',
      },
      {
        name: 'Assists',
        average: assistsAvg,
        line: betLines.assists,
        overPct: assistsOverPct,
        shortName: 'AST',
        color: '#9333ea',
      },
    ];
  }, [data, betLines]);
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="glass p-3 border border-white/10 rounded-md shadow-lg">
          <div className="font-bold text-white mb-1">{item.name}</div>
          <div className="text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Average:</span>
              <span className="font-medium text-white">{item.average.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Line:</span>
              <span className="font-medium text-white">{item.line.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Over %:</span>
              <span 
                className={
                  item.overPct > 50 
                    ? "font-medium text-teal" 
                    : "font-medium text-purple-light"
                }
              >
                {item.overPct.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="glass rounded-xl p-4 h-full">
      <h3 className="text-lg font-merriweather font-bold text-white mb-4">Performance vs. Betting Lines</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="shortName" 
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
            <Legend 
              formatter={(value) => <span className="text-white/80">{value}</span>} 
              wrapperStyle={{ bottom: -10 }} 
            />
            <Bar 
              name="Average" 
              dataKey="average" 
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <Bar 
              name="Betting Line" 
              dataKey="line" 
              fill="rgba(255,255,255,0.3)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;
