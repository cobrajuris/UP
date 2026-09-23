/** Lime floating action button that sits in the notch of the bottom navigation. */
export interface FabProps {
  /** Lucide slug. Default "plus". */
  icon?: string;
  /** Accessible pt-BR label. Default "Registrar atividade". */
  label?: string;
  /** Diameter in px. Default 56. */
  size?: number;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function Fab(props: FabProps): JSX.Element;