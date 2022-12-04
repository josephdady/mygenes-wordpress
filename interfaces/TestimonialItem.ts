import { FeaturedImage } from './FeaturedImage';

export interface TestimonialItem {
  title: string;
  content: string;
  featuredImage: FeaturedImage;
  testimonialsCF: {
    progress: string;
    location: string;
    age: number;
    video: string;
    rating: number;
  };
}
