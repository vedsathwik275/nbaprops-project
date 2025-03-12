
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NBA_TEAMS } from '@/utils/constants';

interface TeamSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const TeamSelect = ({ value = 'ANY', onChange }: TeamSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      defaultValue="ANY"
    >
      <SelectTrigger className="bg-navy-dark border-white/10 text-white">
        <SelectValue placeholder="Any Team" />
      </SelectTrigger>
      <SelectContent className="bg-navy border border-white/10 text-white">
        {NBA_TEAMS.map((team) => (
          <SelectItem key={team.id} value={team.abbr}>
            {team.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TeamSelect;
