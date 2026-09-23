/** Subscription price row. The selected plan is the lime one. */
export interface PlanOptionProps {
  /** pt-BR price, e.g. "R$ 249,90/ano". */
  price: string;
  /** Sub-line, e.g. "1 mês grátis, depois R$ 24,90/mês". */
  note?: string;
  /** Right-hand flag, e.g. "Economize 30%". */
  highlight?: string;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function PlanOption(props: PlanOptionProps): JSX.Element;