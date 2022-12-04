import { CustomImage } from './CustomImage';
import { FeaturedImage } from './FeaturedImage';

export interface GeneVariableItem {
  translation: {
    id: string;
    title: string;
    content: string;
    featuredImage: FeaturedImage;
    geneVariablesCF: {
      color: string;
      icon: CustomImage;
    };
  };
}
