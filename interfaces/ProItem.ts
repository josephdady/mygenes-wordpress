import { ColorGradient } from './ColorGradient';
import { FeaturedImage } from './FeaturedImage';

export interface ProItem {
  id: string;
  title: string;
  content: string;
  featuredImage: FeaturedImage;
  professionalsCf: {
    colors: ColorGradient;
  };
}
