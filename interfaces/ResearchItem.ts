import { ColorGradient } from './ColorGradient';
import { Link } from './Link';

export interface ResearchItem {
  title: string;
  text: string;
  link: Link;
  colors: ColorGradient;
  bgImage: { sourceUrl: string };
}
