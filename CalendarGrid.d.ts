/** Month grid, weeks starting Monday (pt-BR convention). */
export interface CalendarGridProps {
  year: number;
  /** 0-indexed month. */
  month: number;
  /** Selected day-of-month. */
  selected?: number;
  /** Days with logged activity — rendered with a lime dot. */
  marked?: number[];
  onSelect?: (day: number) => void;
  style?: React.CSSProperties;
}
export function CalendarGrid(props: CalendarGridProps): JSX.Element;