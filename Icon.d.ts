/**
 * Monochrome Lucide glyph tinted with currentColor (or an explicit color).
 */
export interface IconProps {
  /** Lucide icon slug, e.g. "footprints", "flame", "droplet". */
  name: string;
  /** Square size in px. Default 20. */
  size?: number;
  /** CSS stroke colour. Default "currentColor". */
  color?: string;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element;