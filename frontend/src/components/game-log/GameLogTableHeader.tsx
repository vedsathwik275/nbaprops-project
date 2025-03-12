
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import SortableTableHeader from './SortableTableHeader';
import { SortConfig, SortKey } from './types';

interface GameLogTableHeaderProps {
  sortConfig: SortConfig;
  onSort: (key: SortKey) => void;
}

const GameLogTableHeader = ({ sortConfig, onSort }: GameLogTableHeaderProps) => {
  return (
    <TableHeader className="bg-navy-dark/50">
      <TableRow>
        <SortableTableHeader 
          label="Date" 
          sortKey="date" 
          sortConfig={sortConfig} 
          onSort={onSort}
          className="text-white/80 w-[100px]"
        />
        <TableHead className="text-white/80">
          Opponent
        </TableHead>
        <TableHead className="text-white/80 text-center">
          Loc
        </TableHead>
        <SortableTableHeader 
          label="PTS" 
          sortKey="points" 
          sortConfig={sortConfig} 
          onSort={onSort}
          className="text-white/80 text-center"
          centerContent
        />
        <SortableTableHeader 
          label="REB" 
          sortKey="rebounds" 
          sortConfig={sortConfig} 
          onSort={onSort}
          className="text-white/80 text-center"
          centerContent
        />
        <SortableTableHeader 
          label="AST" 
          sortKey="assists" 
          sortConfig={sortConfig} 
          onSort={onSort}
          className="text-white/80 text-center"
          centerContent
        />
        <SortableTableHeader 
          label="MIN" 
          sortKey="minutes" 
          sortConfig={sortConfig} 
          onSort={onSort}
          className="text-white/80 text-center"
          centerContent
        />
        <TableHead className="text-white/80 text-center">
          Result
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default GameLogTableHeader;
