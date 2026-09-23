/** Centre-titled app bar with a 38px circular back button. */
export interface TopAppBarProps {
  /** pt-BR screen title. */
  title?: string;
  /** Omit to hide the back button (root screens). */
  onBack?: () => void;
  /** Right-hand node, usually an IconButton. */
  trailing?: React.ReactNode;
  /** Over photography — transparent background, glass back button. */
  transparent?: boolean;
  style?: React.CSSProperties;
}
export function TopAppBar(props: TopAppBarProps): JSX.Element;