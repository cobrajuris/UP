/** Circular person image with optional online dot and lime rating badge. */
export interface AvatarProps {
  src?: string;
  /** Used for the alt text and for initials when there is no image. */
  name?: string;
  /** Diameter in px. Default 44. */
  size?: number;
  /** Lime presence dot, bottom-right. */
  online?: boolean;
  /** Rating chip shown bottom-left, e.g. 4.8. */
  rating?: number | string;
  style?: React.CSSProperties;
}
export function Avatar(props: AvatarProps): JSX.Element;