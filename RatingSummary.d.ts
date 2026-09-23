/** Big score plus a 5→1 hairline histogram. */
export interface RatingSummaryProps {
  /** Average, e.g. 4.6 — rendered with a pt-BR comma. */
  score: number;
  /** Total review count. */
  total: number;
  /** Counts for 1..5 stars, index 0 = 1 star. */
  distribution: number[];
  style?: React.CSSProperties;
}
export function RatingSummary(props: RatingSummaryProps): JSX.Element;