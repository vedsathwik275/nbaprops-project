import { TableCell, TableRow } from '@/components/ui/table';
import { GameLog } from '@/hooks/usePlayerData';
import { cn } from '@/lib/utils';

interface GameLogRowProps {
  game: GameLog;
  index: number;
  betLines: {
    points: number;
    rebounds: number;
    assists: number;
  };
}

const GameLogRow = ({ game, index, betLines }: GameLogRowProps) => {
  return (
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
      <TableCell className="text-center text-white/80">{Math.round(game.minutes)}</TableCell>
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
  );
};

export default GameLogRow;
