/** Settings toggle — Material 3 proportions, lime when on. */
export interface SwitchProps {
  checked?: boolean;
  /** pt-BR row label; omit for a bare switch. */
  label?: string;
  description?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Switch(props: SwitchProps): JSX.Element;