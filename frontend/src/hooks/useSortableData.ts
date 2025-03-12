
import { useState, useMemo } from 'react';
import { SortConfig, SortKey, SortDirection } from '@/components/game-log/types';

export function useSortableData<T>(
  data: T[],
  initialSortKey: SortKey,
  initialDirection: SortDirection = 'desc'
) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: initialSortKey,
    direction: initialDirection,
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
  
  const sortedData = useMemo(() => {
    const sortableData = [...data];
    
    sortableData.sort((a, b) => {
      if (sortConfig.key === 'date') {
        // Convert dates to timestamp for sorting
        const dateA = new Date((a as any).date).getTime();
        const dateB = new Date((b as any).date).getTime();
        
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      const valA = (a as any)[sortConfig.key];
      const valB = (b as any)[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });
    
    return sortableData;
  }, [data, sortConfig]);
  
  return { sortedData, sortConfig, requestSort };
}
