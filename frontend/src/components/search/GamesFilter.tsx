
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FilterOptions } from '@/types/playerTypes';

interface GamesFilterProps {
  gamesCount: number;
  seasons: FilterOptions['seasons'];
  onGamesCountChange: (value: number) => void;
  onSeasonsChange: (value: FilterOptions['seasons']) => void;
}

const GamesFilter = ({ 
  gamesCount, 
  seasons, 
  onGamesCountChange, 
  onSeasonsChange 
}: GamesFilterProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-navy-dark border-white/10 text-white">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Last {gamesCount} Games</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-navy border border-white/10 text-white">
        <div className="space-y-4">
          <h4 className="font-medium">Number of Games</h4>
          <div className="flex items-center justify-between">
            <Slider
              min={5}
              max={30}
              step={1}
              value={[gamesCount]}
              onValueChange={(values) => onGamesCountChange(values[0])}
              className="w-full"
            />
            <span className="ml-4 w-8 text-center">{gamesCount}</span>
          </div>
          
          <h4 className="font-medium">Seasons</h4>
          <div className="flex space-x-2">
            <Button
              variant={seasons === 'current' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSeasonsChange('current')}
              className={seasons === 'current' ? 'bg-purple text-white' : 'bg-navy-dark border-white/10 text-white'}
            >
              Current Season
            </Button>
            <Button
              variant={seasons === 'both' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSeasonsChange('both')}
              className={seasons === 'both' ? 'bg-purple text-white' : 'bg-navy-dark border-white/10 text-white'}
            >
              Include Last Season
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GamesFilter;
