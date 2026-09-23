/** Week strip of day pills; the selected day is lime. */
export interface DayStripDay {
  /** ISO date, e.g. "2026-09-14". */
  date: string;
  /** Override the weekday letter (pt-BR D S T Q Q S S). */
  dow?: string;
  /** Override the day number. */
  day?: number | string;
}
export interface DayStripProps {
  days: DayStripDay[];
  /** ISO date of the selected day. */
  value?: string;
  onChange?: (date: string) => void;
  style?: React.CSSProperties;
}
export function DayStrip(props: DayStripProps): JSX.Element;