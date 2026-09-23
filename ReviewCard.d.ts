/** A single written review. */
export interface ReviewCardProps {
  author: string;
  /** e.g. 4.8, shown on the avatar. */
  rating?: number | string;
  /** pt-BR relative time, e.g. "há 3 dias". */
  when?: string;
  text: string;
  photo?: string;
  style?: React.CSSProperties;
}
export function ReviewCard(props: ReviewCardProps): JSX.Element;