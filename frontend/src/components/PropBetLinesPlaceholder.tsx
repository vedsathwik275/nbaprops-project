
import { useState, useEffect } from 'react';
import { Target, ChevronDown, RotateCw } from 'lucide-react';
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
  const [loading, setLoading] = useState(false);
  const [isOddsAvailable, setIsOddsAvailable] = useState(false);

  // Simulate loading odds when player changes
  useEffect(() => {
    if (playerName) {
      setLoading(true);
      setIsOddsAvailable(false);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        setLoading(false);
        // Random determination if odds are available
        setIsOddsAvailable(Math.random() > 0.3);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [playerName]);

  const fetchOdds = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsOddsAvailable(true);
      
      // Mock odds data - in the future, this would come from an actual API
      const mockOdds = {
        points: parseFloat((Math.random() * 10 + 20).toFixed(1)),
        rebounds: parseFloat((Math.random() * 5 + 5).toFixed(1)),
        assists: parseFloat((Math.random() * 5 + 4).toFixed(1))
      };
      
      onBetLinesChange('points', mockOdds.points);
      onBetLinesChange('rebounds', mockOdds.rebounds);
      onBetLinesChange('assists', mockOdds.assists);
    }, 1500);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between bg-navy-dark border-white/10 text-white"
          disabled={loading}
        >
          <div className="flex items-center">
            <Target className="mr-2 h-4 w-4" />
            <span>Prop Bet Lines</span>
            {loading && <RotateCw className="ml-2 h-3 w-3 animate-spin" />}
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
              <span className="text-sm text-white/70">Odds for {playerName}</span>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-navy-dark border-white/10 text-white flex items-center gap-1"
                onClick={fetchOdds}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Fetch Odds'}
                {loading && <RotateCw className="h-3 w-3 animate-spin" />}
              </Button>
            </div>
          )}
          
          {isOddsAvailable && (
            <div className="py-1 px-2 bg-navy-light/30 rounded-md text-xs text-white/70 flex items-center">
              <Target className="h-3 w-3 mr-2" />
              Latest odds from Odds API
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
          
          {!isOddsAvailable && playerName && (
            <div className="text-xs text-white/70 italic">
              No odds currently available for this player. Using default values.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PropBetLinesPlaceholder;
