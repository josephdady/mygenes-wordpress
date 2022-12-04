import { CustomImage } from './CustomImage';
import { FeaturedImage } from './FeaturedImage';

export interface Video {
  title: string;
  content: string;
  featuredImage: FeaturedImage;
  videosCf: {
    videoUrl: string;
    logo: CustomImage;
  };
}
