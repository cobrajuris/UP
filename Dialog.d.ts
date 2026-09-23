/** Full-bleed confirmation overlay — the lime success card from the reference kit. */
export interface DialogProps {
  open?: boolean;
  /** "success" is lime, "error" is red. Default "success". */
  tone?: 'success' | 'error' | 'info';
  /** pt-BR headline, e.g. "Treino concluído". */
  title: string;
  message?: string;
  /** Primary button label. Default "Fechar". */
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  style?: React.CSSProperties;
}
export function Dialog(props: DialogProps): JSX.Element | null;