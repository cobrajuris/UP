/** Card or section title with an optional lime "Ver tudo" action. */
export interface SectionHeaderProps {
  title: string;
  /** Action label, usually "Ver tudo". */
  action?: string;
  onAction?: () => void;
  size?: 'md' | 'lg';
  style?: React.CSSProperties;
}
export function SectionHeader(props: SectionHeaderProps): JSX.Element;