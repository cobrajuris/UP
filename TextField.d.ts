/** Pill text input on a cotton-seed (#f3f3f3) fill, with lime label. */
export interface TextFieldProps {
  /** pt-BR label, e.g. "E-mail". */
  label?: string;
  value?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
  /** Hint under the field. */
  helper?: string;
  /** Error message — also turns the label and border red. */
  error?: string;
  /** Lucide slug shown inside, left. */
  icon?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function TextField(props: TextFieldProps): JSX.Element;