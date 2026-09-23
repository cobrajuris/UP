/** Concentric progress rings — the product's hero data graphic. */
export interface ActivityRing {
  /** Current amount. */
  value: number;
  /** Goal. */
  max: number;
  /** Optional solid colour; defaults to the lime gradient. */
  color?: string;
  /** pt-BR label used by the caller's legend, e.g. "Passos". */
  label?: string;
}
export interface ActivityRingsProps {
  /** Outermost ring first. Two or three rings read best. */
  rings: ActivityRing[];
  /** Square size in px. Default 140. */
  size?: number;
  /** Ring stroke width. Default 12. */
  thickness?: number;
  /** Space between rings. Default 6. */
  gap?: number;
  style?: React.CSSProperties;
}
export function ActivityRings(props: ActivityRingsProps): JSX.Element;