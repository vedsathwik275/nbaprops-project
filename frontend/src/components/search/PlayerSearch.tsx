import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { PlayerSearchResult } from '@/types/playerTypes';

interface PlayerSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: PlayerSearchResult[];
  isSearching: boolean;
  selectedPlayer: PlayerSearchResult | null;
  setSelectedPlayer: (player: PlayerSearchResult | null) => void;
}

const PlayerSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  searchResults, 
  isSearching, 
  selectedPlayer, 
  setSelectedPlayer 
}: PlayerSearchProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [localSelection, setLocalSelection] = useState<PlayerSearchResult | null>(null);
  
  // Debug log for selectedPlayer
  useEffect(() => {
    console.log("PlayerSearch - selectedPlayer:", selectedPlayer);
    // Sync local selection with props
    if (selectedPlayer !== localSelection) {
      setLocalSelection(selectedPlayer);
    }
  }, [selectedPlayer]);
  
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
  
  const handleSelectPlayer = (player: PlayerSearchResult) => {
    console.log("Selecting player:", player);
    // Update local selection immediately
    setLocalSelection(player);
    
    // Use direct callback for setting selectedPlayer to avoid closure issues
    setSelectedPlayer(player);
    
    setSearchQuery(player.name);
    setIsSearchOpen(false);
  };

  // Show visual indicator if a player is selected
  const isPlayerSelected = localSelection !== null;

  return (
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
            // Only clear the selected player if the search query is cleared
            if (e.target.value === '') {
              console.log("Clearing selected player");
              setLocalSelection(null);
              setSelectedPlayer(null);
            }
          }}
          onFocus={() => {
            if (searchQuery.length > 2) {
              setIsSearchOpen(true);
            }
          }}
          className={`pl-10 bg-navy-dark border-white/10 text-white ${isPlayerSelected ? 'border-teal' : ''}`}
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
      
      {!isSearchOpen && localSelection && (
        <div className="mt-2 text-xs text-teal">
          ✓ {localSelection.name} selected
        </div>
      )}
    </div>
  );
};

export default PlayerSearch;
