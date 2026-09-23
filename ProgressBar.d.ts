/** Linear goal progress with the signature notch marker at the fill edge. */
export interface ProgressBarProps {
  value?: number;
  max?: number;
  /** Show the percentage label above-right. */
  showPercent?: boolean;
  /** Track height in px. Default 10. */
  height?: number;
  /** Fill colour — use a metric colour token for water/sleep/calories. */
  color?: string;
  style?: React.CSSProperties;
}
export function ProgressBar(props: ProgressBarProps): JSX.Element;