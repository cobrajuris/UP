/** Empty list / no-data placeholder. */
export interface EmptyStateProps {
  /** Lucide slug. Default "inbox". */
  icon?: string;
  /** pt-BR headline, e.g. "Nenhum treino por aqui". */
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: React.CSSProperties;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;