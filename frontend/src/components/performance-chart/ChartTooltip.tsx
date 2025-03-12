
import React from 'react';
import { StatType } from './types';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  selectedStat: StatType;
  betLine: number;
}

const ChartTooltip: React.FC<TooltipProps> = ({ 
  active, 
  payload, 
  label, 
  selectedStat,
  betLine 
}) => {
  if (active && payload && payload.length) {
    const game = payload[0].payload;
    
    const statLabel = selectedStat === 'points' 
      ? "Points" 
      : selectedStat === 'rebounds' 
        ? "Rebounds" 
        : "Assists";
    
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

export default ChartTooltip;
