
import { GameLog } from '@/hooks/usePlayerData';
import { useSortableData } from '@/hooks/useSortableData';
import {
  Table,
  TableBody,
} from '@/components/ui/table';
import GameLogTableHeader from './game-log/GameLogTableHeader';
import GameLogRow from './game-log/GameLogRow';

interface GameLogTableProps {
  data: GameLog[];
  betLines: {
    points: number;
    rebounds: number;
    assists: number;
  };
}

const GameLogTable = ({ data, betLines }: GameLogTableProps) => {
  const { sortedData, sortConfig, requestSort } = useSortableData(data, 'date', 'desc');
  
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <GameLogTableHeader sortConfig={sortConfig} onSort={requestSort} />
          <TableBody>
            {sortedData.map((game, index) => (
              <GameLogRow 
                key={`${game.date}-${game.opponent}`}
                game={game}
                index={index}
                betLines={betLines}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GameLogTable;
