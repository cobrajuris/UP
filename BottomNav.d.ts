/**
 * Floating R50 bottom bar: two destinations, the lime FAB, two destinations.
 * @startingPoint section="Navegação" subtitle="Barra inferior flutuante com FAB central" viewport="700x140"
 */
export interface BottomNavItem { id: string; icon: string; label: string; }
export interface BottomNavProps {
  /** Exactly four items. Defaults to Início / Nutrição / Estatísticas / Conquistas. */
  items?: BottomNavItem[];
  /** id of the active destination. */
  active?: string;
  onSelect?: (id: string) => void;
  onFab?: () => void;
  style?: React.CSSProperties;
}
export function BottomNav(props: BottomNavProps): JSX.Element;