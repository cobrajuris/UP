/** Horizontally scrolling single-select chip row — the catalogue's top-level filter. */
export interface FilterChipsProps {
  /** Strings, or {value,label} pairs. */
  items: Array<string | { value: string; label: string }>;
  /** Currently selected value. */
  value?: string;
  onChange?: (value: string) => void;
  /** Allow horizontal overflow scrolling. Default true. */
  scroll?: boolean;
  style?: React.CSSProperties;
}
export function FilterChips(props: FilterChipsProps): JSX.Element;