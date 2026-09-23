/** The A / AA / AAA difficulty mark from the reference kit, localised to pt-BR. */
export interface DifficultyMeterProps {
  /** Difficulty level. Default "facil". */
  level?: 'facil' | 'medio' | 'dificil';
  /** Show the written label next to the marks. Default true. */
  showLabel?: boolean;
  color?: string;
  style?: React.CSSProperties;
}
export function DifficultyMeter(props: DifficultyMeterProps): JSX.Element;