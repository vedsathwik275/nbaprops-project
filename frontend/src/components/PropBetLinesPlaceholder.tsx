import { useState } from 'react';
import { Target, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterOptions } from '@/types/playerTypes';

interface PropBetLinesPlaceholderProps {
  betLines: FilterOptions['betLines'];
  onBetLinesChange: <K extends keyof FilterOptions['betLines']>(key: K, value: number) => void;
  playerName?: string;
}

const PropBetLinesPlaceholder = ({ 
  betLines, 
  onBetLinesChange,
  playerName
}: PropBetLinesPlaceholderProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between bg-navy-dark border-white/10 text-white"
        >
          <div className="flex items-center">
            <Target className="mr-2 h-4 w-4" />
            <span>Prop Bet Lines</span>
          </div>
          <div className="flex items-center text-xs opacity-80 space-x-2">
            <span>PTS: {betLines.points}</span>
            <span>REB: {betLines.rebounds}</span>
            <span>AST: {betLines.assists}</span>
            <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-navy border border-white/10 text-white">
        <div className="space-y-4">
          {playerName && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Set odds for {playerName}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Points</h4>
              <span className="text-sm">{betLines.points}</span>
            </div>
            <Slider
              min={10}
              max={40}
              step={0.5}
              value={[betLines.points]}
              onValueChange={(values) => onBetLinesChange('points', values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Rebounds</h4>
              <span className="text-sm">{betLines.rebounds}</span>
            </div>
            <Slider
              min={0}
              max={20}
              step={0.5}
              value={[betLines.rebounds]}
              onValueChange={(values) => onBetLinesChange('rebounds', values[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Assists</h4>
              <span className="text-sm">{betLines.assists}</span>
            </div>
            <Slider
              min={0}
              max={15}
              step={0.5}
              value={[betLines.assists]}
              onValueChange={(values) => onBetLinesChange('assists', values[0])}
            />
          </div>
          
          <div className="text-xs text-white/70 italic">
            Adjust the sliders to set your desired prop bet lines.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PropBetLinesPlaceholder;
