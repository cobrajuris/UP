/** One exercise inside a workout: thumbnail, name, reps or hold time. */
export interface ExerciseRowProps {
  /** pt-BR exercise name, e.g. "Flexão de braço". */
  name: string;
  /** e.g. "20 repetições" or "40 s". */
  detail: string;
  thumb?: string;
  /** Highlights the name in lime — the exercise currently playing. */
  active?: boolean;
  /** Optional ordinal prefix. */
  index?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function ExerciseRow(props: ExerciseRowProps): JSX.Element;