
import { useState } from 'react';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import { GameLog } from '@/hooks/usePlayerData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface GameLogTableProps {
  data: GameLog[];
  betLines: {
    points: number;
    rebounds: number;
    assists: number;
  };
}

type SortKey = 'date' | 'points' | 'rebounds' | 'assists' | 'minutes';
type SortDirection = 'asc' | 'desc';

const GameLogTable = ({ data, betLines }: GameLogTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  }>({
    key: 'date',
    direction: 'desc',
  });
  
  // Sort the data
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === 'date') {
      // Convert dates to timestamp for sorting
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });
  
  const requestSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      direction = 'desc'; // Default to desc for first click
    }
    
    setSortConfig({ key, direction });
  };
  
  // Helper to render sort indicator
  const renderSortIndicator = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-white/40" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1 text-white" />
      : <ArrowDown className="h-4 w-4 ml-1 text-white" />;
  };
  
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-navy-dark/50">
            <TableRow>
              <TableHead className="text-white/80 w-[100px]">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto font-medium hover:bg-transparent hover:text-white"
                  onClick={() => requestSort('date')}
                >
                  <span className="flex items-center">
                    Date
                    {renderSortIndicator('date')}
                  </span>
                </Button>
              </TableHead>
              <TableHead className="text-white/80">Opponent</TableHead>
              <TableHead className="text-white/80 text-center">Loc</TableHead>
              <TableHead className="text-white/80 text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto font-medium hover:bg-transparent hover:text-white"
                  onClick={() => requestSort('points')}
                >
                  <span className="flex items-center justify-center">
                    PTS
                    {renderSortIndicator('points')}
                  </span>
                </Button>
              </TableHead>
              <TableHead className="text-white/80 text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto font-medium hover:bg-transparent hover:text-white"
                  onClick={() => requestSort('rebounds')}
                >
                  <span className="flex items-center justify-center">
                    REB
                    {renderSortIndicator('rebounds')}
                  </span>
                </Button>
              </TableHead>
              <TableHead className="text-white/80 text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto font-medium hover:bg-transparent hover:text-white"
                  onClick={() => requestSort('assists')}
                >
                  <span className="flex items-center justify-center">
                    AST
                    {renderSortIndicator('assists')}
                  </span>
                </Button>
              </TableHead>
              <TableHead className="text-white/80 text-center">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto font-medium hover:bg-transparent hover:text-white"
                  onClick={() => requestSort('minutes')}
                >
                  <span className="flex items-center justify-center">
                    MIN
                    {renderSortIndicator('minutes')}
                  </span>
                </Button>
              </TableHead>
              <TableHead className="text-white/80 text-center">Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((game, index) => (
              <TableRow 
                key={`${game.date}-${game.opponent}`}
                className={
                  index % 2 === 0 
                    ? 'bg-navy-dark/10 hover:bg-navy-dark/30' 
                    : 'hover:bg-navy-dark/30'
                }
              >
                <TableCell className="font-medium text-white/80">{game.date}</TableCell>
                <TableCell className="font-medium text-white">{game.opponent}</TableCell>
                <TableCell className="text-center text-white/80">
                  <span className={cn(
                    'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium',
                    game.location === 'H' 
                      ? 'bg-navy-light/50 text-teal' 
                      : 'bg-navy-light/50 text-purple-light'
                  )}>
                    {game.location}
                  </span>
                </TableCell>
                <TableCell className={cn(
                  'text-center font-medium',
                  game.points > betLines.points ? 'text-teal' : 'text-white/80'
                )}>
                  {game.points}
                </TableCell>
                <TableCell className={cn(
                  'text-center font-medium',
                  game.rebounds > betLines.rebounds ? 'text-teal' : 'text-white/80'
                )}>
                  {game.rebounds}
                </TableCell>
                <TableCell className={cn(
                  'text-center font-medium',
                  game.assists > betLines.assists ? 'text-teal' : 'text-white/80'
                )}>
                  {game.assists}
                </TableCell>
                <TableCell className="text-center text-white/80">{game.minutes}</TableCell>
                <TableCell className="text-center">
                  <span className={cn(
                    'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                    game.result === 'W' 
                      ? 'bg-teal/20 text-teal' 
                      : 'bg-purple-light/20 text-purple-light'
                  )}>
                    {game.result}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GameLogTable;
