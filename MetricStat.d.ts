/** One metric: label, big lime figure, and the "/ goal unit" tail. */
export interface MetricStatProps {
  /** Lucide slug shown before the figure. */
  icon?: string;
  /** pt-BR metric name, e.g. "Passos". */
  label: string;
  /** The figure, pre-formatted pt-BR: "11.000", "1,8". */
  value: string | number;
  /** "kcal", "km", "L", "min". */
  unit?: string;
  /** Goal value shown after a slash. */
  goal?: string | number;
  color?: string;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}
export function MetricStat(props: MetricStatProps): JSX.Element;