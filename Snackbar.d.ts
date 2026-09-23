/** Transient bottom message with one optional action (Material 3 snackbar). */
export interface SnackbarProps {
  /** pt-BR message, e.g. "Copo de 250 ml registrado". */
  message: string;
  tone?: 'neutral' | 'success' | 'error';
  /** e.g. "Desfazer". */
  actionLabel?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}
export function Snackbar(props: SnackbarProps): JSX.Element;