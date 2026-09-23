/** ‹ Setembro de 2026 › month pager. */
export interface MonthStepperProps {
  /** pt-BR month label, lowercase month name: "setembro de 2026". */
  label: string;
  onPrev?: () => void;
  onNext?: () => void;
  style?: React.CSSProperties;
}
export function MonthStepper(props: MonthStepperProps): JSX.Element;