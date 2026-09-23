/**
 * Photo tile for a workout in the catalogue grid.
 */
export interface WorkoutCardProps {
  /** pt-BR title, e.g. "Peito em casa (sem equipamento)". */
  title: string;
  /** Background photo URL. Falls back to a neutral gradient. */
  image?: string;
  /** Formatted duration, e.g. "45 min". */
  duration: string;
  level?: 'facil' | 'medio' | 'dificil';
  saved?: boolean;
  onSave?: () => void;
  onClick?: () => void;
  /** Tile height in px. Default 170. */
  height?: number;
  style?: React.CSSProperties;
}
export function WorkoutCard(props: WorkoutCardProps): JSX.Element;