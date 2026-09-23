/** Circular icon-only control: back, bookmark, trophy, comment, close. */
export interface IconButtonProps {
  /** Lucide slug. */
  icon: string;
  /** Accessible label in pt-BR, e.g. "Voltar". Required for a11y. */
  label: string;
  /** "glass" for buttons over photography. Default "solid". */
  variant?: 'solid' | 'accent' | 'glass' | 'ghost';
  /** Diameter in px; keep >= 44 for touch. Default 44. */
  size?: number;
  /** Toggled state — renders lime. */
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): JSX.Element;