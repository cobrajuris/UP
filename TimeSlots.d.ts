/** Row of selectable 24-hour time chips for scheduling. */
export interface TimeSlotsProps {
  /** 24-hour labels, e.g. ["07:00","07:30","08:00"]. */
  slots: string[];
  value?: string;
  onChange?: (slot: string) => void;
  /** Slots that are already taken. */
  disabledSlots?: string[];
  style?: React.CSSProperties;
}
export function TimeSlots(props: TimeSlotsProps): JSX.Element;