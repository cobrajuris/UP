/** Thin-bar activity histogram — 24h day profile, weekly or monthly totals. */
export interface BarChartProps {
  /** Ordered values, one per bar. */
  data: number[];
  /** Plot height in px. Default 90. */
  height?: number;
  /** Axis labels spread across the bottom, e.g. ["0","6","12","18","24 h"]. */
  labels?: string[];
  /** Index highlighted in white — "agora". */
  nowIndex?: number;
  barColor?: string;
  style?: React.CSSProperties;
}
export function BarChart(props: BarChartProps): JSX.Element;