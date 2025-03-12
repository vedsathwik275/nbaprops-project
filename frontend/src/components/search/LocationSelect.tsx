
import { MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterOptions } from '@/types/playerTypes';

interface LocationSelectProps {
  value: FilterOptions['location'];
  onChange: (value: FilterOptions['location']) => void;
}

const LocationSelect = ({ value = 'ANY', onChange }: LocationSelectProps) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as FilterOptions['location'])}
      defaultValue="ANY"
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
  );
};

export default LocationSelect;
