/** Label · dotted leader · value. The summary line under a chart. */
export interface DataRowProps {
  /** pt-BR label, e.g. "Distância em atividade". */
  label: string;
  value: string | number;
  /** "km", "kcal", "min". */
  unit?: string;
  style?: React.CSSProperties;
}
export function DataRow(props: DataRowProps): JSX.Element;