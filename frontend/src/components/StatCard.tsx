
import { ArrowUp, ArrowDown, Minus, TrendingUp, TrendingDown, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatSummary } from '@/hooks/usePlayerData';

interface StatCardProps {
  title: string;
  statType: 'points' | 'rebounds' | 'assists';
  summary: StatSummary;
  betLine: number;
  className?: string;
}

const StatCard = ({ title, statType, summary, betLine, className }: StatCardProps) => {
  const isOver = summary.overPercentage > 50;
  const confidenceLevel = 
    summary.overPercentage > 75 || summary.overPercentage < 25 ? 'high' :
    summary.overPercentage > 65 || summary.overPercentage < 35 ? 'medium' : 'low';
  
  // Determine recommendation text and color
  const recommendation = isOver ? 'OVER' : 'UNDER';
  const recommendationColor = isOver ? 'text-teal' : 'text-purple-light';
  
  // Icon based on trend
  const TrendIcon = summary.trend === 'up' ? TrendingUp : 
                   summary.trend === 'down' ? TrendingDown : 
                   BarChart;
  
  // Confidence bar length
  const confidencePercentage = isOver ? summary.overPercentage : (100 - summary.overPercentage);
  
  return (
    <div className={cn(
      'glass rounded-xl p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-merriweather font-bold text-white">{title}</h3>
        <div className="flex items-center space-x-1">
          <TrendIcon 
            size={16} 
            className={cn(
              'transition-colors',
              summary.trend === 'up' ? 'text-teal' : 
              summary.trend === 'down' ? 'text-purple-light' : 
              'text-white/70'
            )} 
          />
          <span className="text-xs text-white/70">
            Last 5: {summary.lastFiveAvg.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-xl md:text-2xl font-bold text-white">{summary.average.toFixed(1)}</div>
          <div className="text-xs text-white/60 uppercase">Average</div>
        </div>
        <div>
          <div className="text-xl md:text-2xl font-bold text-white">{summary.median.toFixed(1)}</div>
          <div className="text-xs text-white/60 uppercase">Median</div>
        </div>
        <div>
          <div className="flex items-center text-sm font-medium text-white/80">
            <ArrowUp size={14} className="mr-1 text-teal" />
            <span>{summary.max}</span>
          </div>
          <div className="text-xs text-white/60 uppercase">Max</div>
        </div>
        <div>
          <div className="flex items-center text-sm font-medium text-white/80">
            <ArrowDown size={14} className="mr-1 text-purple-light" />
            <span>{summary.min}</span>
          </div>
          <div className="text-xs text-white/60 uppercase">Min</div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-white/80">
            <span className="font-medium">{betLine}</span> Line
          </div>
          <div className={cn(
            'text-sm font-bold',
            recommendationColor
          )}>
            {recommendation} {summary.overPercentage.toFixed(0)}%
          </div>
        </div>
        
        {/* Confidence Bar */}
        <div className="h-2 bg-navy-dark/50 rounded-full overflow-hidden">
          <div 
            className={cn(
              'h-full rounded-full transition-all duration-500',
              isOver ? 'bg-teal' : 'bg-purple-light'
            )}
            style={{ width: `${confidencePercentage}%` }}
          ></div>
        </div>
        
        {/* Confidence Meter */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center">
            <span className="text-xs text-white/60 mr-2">Confidence:</span>
            <div className="flex space-x-1">
              {[1, 2, 3].map((level) => (
                <div 
                  key={level}
                  className={cn(
                    'w-4 h-1 rounded-full transition-colors',
                    (confidenceLevel === 'high' || 
                     (confidenceLevel === 'medium' && level < 3) ||
                     (confidenceLevel === 'low' && level === 1))
                     ? (isOver ? 'bg-teal' : 'bg-purple-light')
                     : 'bg-white/20'
                  )}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center text-xs text-white/60">
            {statType === 'points' ? 'PTS' : statType === 'rebounds' ? 'REB' : 'AST'}
            <Minus className="mx-1 h-3" />
            <span className="font-medium">{betLine}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
