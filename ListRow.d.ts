/** Compact logged-item row: activities, meals, water, weight entries. */
export interface ListRowProps {
  /** Lucide slug rendered in a circular tile. */
  icon?: string;
  iconColor?: string;
  /** Custom leading node (an Avatar or thumbnail) instead of the icon tile. */
  leading?: React.ReactNode;
  /** Small top line, e.g. "Caminhada". */
  title: string;
  subtitle?: string;
  /** Bold bottom line, e.g. "2,44 km". */
  value?: string;
  /** Right-hand timestamp, e.g. "Hoje" or "14:20". */
  meta?: string;
  chevron?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function ListRow(props: ListRowProps): JSX.Element;