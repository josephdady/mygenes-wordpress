import { AppPreviewItem } from './AppPreviewItem';
import { Link } from './Link';

export interface AppPreview {
  title: string;
  cta: Link;
  items: AppPreviewItem[];
}
