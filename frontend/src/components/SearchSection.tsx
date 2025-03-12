import { Button } from "@/components/ui/button";
import { FilterOptions } from "@/hooks/usePlayerData";
import PropBetLinesPlaceholder from './PropBetLinesPlaceholder';
import PlayerSearch from './search/PlayerSearch';
import TeamSelect from './search/TeamSelect';
import LocationSelect from './search/LocationSelect';
import GamesFilter from './search/GamesFilter';

interface SearchSectionProps {
  onSearch: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: any[];
  isSearching: boolean;
  selectedPlayer: any | null;
  setSelectedPlayer: (player: any | null) => void;
  filters: FilterOptions;
  setFilters: (filters: FilterOptions | ((prev: FilterOptions) => FilterOptions)) => void;
}

const SearchSection = ({ 
  onSearch,
  searchQuery,
  setSearchQuery,
  searchResults,
  isSearching,
  selectedPlayer,
  setSelectedPlayer,
  filters,
  setFilters
}: SearchSectionProps) => {
  
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 glass rounded-xl">
      <PlayerSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        isSearching={isSearching}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
      />
      
      <div>
        <TeamSelect 
          value={filters.opponent} 
          onChange={(value) => updateFilter('opponent', value)} 
        />
      </div>
      
      <div>
        <LocationSelect 
          value={filters.location} 
          onChange={(value) => updateFilter('location', value)} 
        />
      </div>
      
      <div>
        <GamesFilter 
          gamesCount={filters.gamesCount}
          seasons={filters.seasons}
          onGamesCountChange={(value) => updateFilter('gamesCount', value)}
          onSeasonsChange={(value) => updateFilter('seasons', value)}
        />
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
