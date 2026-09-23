/** Trainer / nutritionist row with rating badge and years of experience. */
export interface ProfessionalRowProps {
  name: string;
  /** pt-BR specialty, e.g. "Treino de alta intensidade". */
  specialty: string;
  /** e.g. "7 anos de experiência" — rendered in lime. */
  experience?: string;
  /** e.g. 4.8. */
  rating?: number | string;
  photo?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function ProfessionalRow(props: ProfessionalRowProps): JSX.Element;