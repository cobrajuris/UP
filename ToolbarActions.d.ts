/** Divided Filtros / Ordenar / Buscar strip that sits under the catalogue chips. */
export interface ToolbarActionsProps {
  items?: Array<{ icon: string; label: string }>;
  /** Label of the action currently applied — renders lime. */
  active?: string;
  onSelect?: (label: string) => void;
  style?: React.CSSProperties;
}
export function ToolbarActions(props: ToolbarActionsProps): JSX.Element;