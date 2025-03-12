
import { Button } from '@/components/ui/button';
import { TableHead } from '@/components/ui/table';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
import { SortConfig, SortKey } from './types';

interface SortableHeaderProps {
  label: string;
  sortKey: SortKey;
  sortConfig: SortConfig;
  onSort: (key: SortKey) => void;
  className?: string;
  centerContent?: boolean;
}

const SortableTableHeader = ({
  label,
  sortKey,
  sortConfig,
  onSort,
  className = "text-white/80",
  centerContent = false,
}: SortableHeaderProps) => {
  // Helper to render sort indicator
  const renderSortIndicator = () => {
    if (sortConfig.key !== sortKey) {
      return <ArrowUpDown className="h-4 w-4 ml-1 text-white/40" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4 ml-1 text-white" />
      : <ArrowDown className="h-4 w-4 ml-1 text-white" />;
  };

  return (
    <TableHead className={className}>
      <Button 
        variant="ghost" 
        size="sm"
        className="p-0 h-auto font-medium hover:bg-transparent hover:text-white"
        onClick={() => onSort(sortKey)}
      >
        <span className={`flex items-center ${centerContent ? 'justify-center' : ''}`}>
          {label}
          {renderSortIndicator()}
        </span>
      </Button>
    </TableHead>
  );
};

export default SortableTableHeader;
