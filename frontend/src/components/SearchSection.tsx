import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, MapPin, Calendar, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePlayerData, PlayerSearchResult, FilterOptions } from "@/hooks/usePlayerData";
import PropBetLinesPlaceholder from './PropBetLinesPlaceholder';

const NBA_TEAMS = [
  { id: 'ANY', name: 'Any Team', abbr: 'ANY' },
  { id: 'ATL', name: 'Atlanta Hawks', abbr: 'ATL' },
  { id: 'BOS', name: 'Boston Celtics', abbr: 'BOS' },
  { id: 'BKN', name: 'Brooklyn Nets', abbr: 'BKN' },
  { id: 'CHA', name: 'Charlotte Hornets', abbr: 'CHA' },
  { id: 'CHI', name: 'Chicago Bulls', abbr: 'CHI' },
  { id: 'CLE', name: 'Cleveland Cavaliers', abbr: 'CLE' },
  { id: 'DAL', name: 'Dallas Mavericks', abbr: 'DAL' },
  { id: 'DEN', name: 'Denver Nuggets', abbr: 'DEN' },
  { id: 'DET', name: 'Detroit Pistons', abbr: 'DET' },
  { id: 'GSW', name: 'Golden State Warriors', abbr: 'GSW' },
  { id: 'HOU', name: 'Houston Rockets', abbr: 'HOU' },
  { id: 'IND', name: 'Indiana Pacers', abbr: 'IND' },
  { id: 'LAC', name: 'LA Clippers', abbr: 'LAC' },
  { id: 'LAL', name: 'Los Angeles Lakers', abbr: 'LAL' },
  { id: 'MEM', name: 'Memphis Grizzlies', abbr: 'MEM' },
  { id: 'MIA', name: 'Miami Heat', abbr: 'MIA' },
  { id: 'MIL', name: 'Milwaukee Bucks', abbr: 'MIL' },
  { id: 'MIN', name: 'Minnesota Timberwolves', abbr: 'MIN' },
  { id: 'NOP', name: 'New Orleans Pelicans', abbr: 'NOP' },
  { id: 'NYK', name: 'New York Knicks', abbr: 'NYK' },
  { id: 'OKC', name: 'Oklahoma City Thunder', abbr: 'OKC' },
  { id: 'ORL', name: 'Orlando Magic', abbr: 'ORL' },
  { id: 'PHI', name: 'Philadelphia 76ers', abbr: 'PHI' },
  { id: 'PHX', name: 'Phoenix Suns', abbr: 'PHX' },
  { id: 'POR', name: 'Portland Trail Blazers', abbr: 'POR' },
  { id: 'SAC', name: 'Sacramento Kings', abbr: 'SAC' },
  { id: 'SAS', name: 'San Antonio Spurs', abbr: 'SAS' },
  { id: 'TOR', name: 'Toronto Raptors', abbr: 'TOR' },
  { id: 'UTA', name: 'Utah Jazz', abbr: 'UTA' },
  { id: 'WAS', name: 'Washington Wizards', abbr: 'WAS' },
];

interface SearchSectionProps {
  onSearch: () => void;
}

const SearchSection = ({ onSearch }: SearchSectionProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    selectedPlayer,
    setSelectedPlayer,
    filters,
    setFilters,
  } = usePlayerData();
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const updateBetLine = <K extends keyof FilterOptions['betLines']>(key: K, value: number) => {
    setFilters(prev => ({
      ...prev,
      betLines: {
        ...prev.betLines,
        [key]: value
      }
    }));
  };
  
  const handleSelectPlayer = (player: PlayerSearchResult) => {
    setSelectedPlayer(player);
    setSearchQuery(player.name);
    setIsSearchOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 glass rounded-xl">
      <div className="relative" ref={searchRef}>
        <div className="flex items-center relative">
          <Search className="absolute left-3 text-white/50 pointer-events-none" size={16} />
          <Input
            type="text"
            placeholder="Player Name"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.length > 2) {
                setIsSearchOpen(true);
              } else {
                setIsSearchOpen(false);
              }
              if (e.target.value === '') {
                setSelectedPlayer(null);
              }
            }}
            onFocus={() => {
              if (searchQuery.length > 2) {
                setIsSearchOpen(true);
              }
            }}
            className="pl-10 bg-navy-dark border-white/10 text-white"
          />
        </div>
        
        {isSearchOpen && (
          <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg glass animate-fade-in">
            <div className="py-1">
              {isSearching ? (
                <div className="px-4 py-2 text-sm text-white">Searching...</div>
              ) : searchResults.length === 0 ? (
                <div className="px-4 py-2 text-sm text-white">No results found</div>
              ) : (
                searchResults.map((player) => (
                  <div
                    key={player.id}
                    className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors duration-150"
                    onClick={() => handleSelectPlayer(player)}
                  >
                    <div className="font-medium text-white">{player.name}</div>
                    <div className="text-xs text-white/70">{player.team} · {player.position}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      
      <div>
        <Select
          value={filters.opponent}
          onValueChange={(value) => updateFilter('opponent', value)}
        >
          <SelectTrigger className="bg-navy-dark border-white/10 text-white">
            <SelectValue placeholder="Any Opponent" />
          </SelectTrigger>
          <SelectContent className="bg-navy border border-white/10 text-white">
            {NBA_TEAMS.map((team) => (
              <SelectItem key={team.id} value={team.abbr}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select
          value={filters.location}
          onValueChange={(value) => updateFilter('location', value as FilterOptions['location'])}
        >
          <SelectTrigger className="bg-navy-dark border-white/10 text-white">
            <MapPin className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Any Location" />
          </SelectTrigger>
          <SelectContent className="bg-navy border border-white/10 text-white">
            <SelectItem value="ANY">Any Location</SelectItem>
            <SelectItem value="H">Home Games</SelectItem>
            <SelectItem value="A">Away Games</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between bg-navy-dark border-white/10 text-white">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Last {filters.gamesCount} Games</span>
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
                  value={[filters.gamesCount]}
                  onValueChange={(values) => updateFilter('gamesCount', values[0])}
                  className="w-full"
                />
                <span className="ml-4 w-8 text-center">{filters.gamesCount}</span>
              </div>
              
              <h4 className="font-medium">Seasons</h4>
              <div className="flex space-x-2">
                <Button
                  variant={filters.seasons === 'current' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateFilter('seasons', 'current')}
                  className={filters.seasons === 'current' ? 'bg-purple text-white' : 'bg-navy-dark border-white/10 text-white'}
                >
                  Current Season
                </Button>
                <Button
                  variant={filters.seasons === 'both' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateFilter('seasons', 'both')}
                  className={filters.seasons === 'both' ? 'bg-purple text-white' : 'bg-navy-dark border-white/10 text-white'}
                >
                  Include Last Season
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="md:col-span-2">
        <PropBetLinesPlaceholder 
          betLines={filters.betLines} 
          onBetLinesChange={updateBetLine}
          playerName={selectedPlayer?.name}
        />
      </div>
      
      <div className="md:col-span-2 lg:col-span-1">
        <Button 
          className="w-full bg-teal hover:bg-teal-light text-navy-dark font-bold"
          onClick={onSearch}
          disabled={!selectedPlayer}
        >
          Analyze
        </Button>
      </div>
    </div>
  );
};

export default SearchSection;
