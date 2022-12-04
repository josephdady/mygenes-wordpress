import { Language } from './Language';

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  language?: Language;
  translation: Post;
}
