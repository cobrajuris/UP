/**
 * Pill-shaped action button.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** "primary" is lime-on-dark and there is only one per screen. Default "primary". */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Heights 40 / 52 / 60px. Default "md". */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide slug before the label. */
  iconStart?: string;
  /** Lucide slug after the label — "arrow-right" on wizard "Próximo". */
  iconEnd?: string;
  /** Full-width CTA, as used at the bottom of detail screens. */
  block?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;