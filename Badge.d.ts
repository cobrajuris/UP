/** Small pill label: duration, kcal, status, counts. */
export interface BadgeProps {
  children?: React.ReactNode;
  /** Visual tone. "glass" sits on top of photography. Default "solid". */
  tone?: 'accent' | 'solid' | 'outline' | 'glass' | 'danger';
  /** Lucide icon slug rendered before the label. */
  icon?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;