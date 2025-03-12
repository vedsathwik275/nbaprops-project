
export type SortKey = 'date' | 'points' | 'rebounds' | 'assists' | 'minutes';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}
