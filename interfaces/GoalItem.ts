import { ColorGradient } from './ColorGradient';

export interface GoalItem {
  title: string;
  description: string;
  colors: ColorGradient;
  animation: {
    mediaItemUrl: string;
  };
}
