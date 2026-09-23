/**
 * The R35 surface every group of content sits on.
 */
export interface CardProps {
  children?: React.ReactNode;
  /** CSS padding. Default var(--card-padding) = 15px. */
  padding?: string;
  /** "accent" is the lime card used once per screen. Default "default". */
  tone?: 'default' | 'flat' | 'accent';
  /** Corner radius. Default var(--radius-card) = 35px. */
  radius?: string;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): JSX.Element;