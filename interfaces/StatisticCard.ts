import { ColorGradient } from './ColorGradient';

export interface StatisticCard {
  percent: string;
  text: string;
  colors: ColorGradient;
  graph: {
    mediaItemUrl: string;
  };
  persent: {
    mediaItemUrl: string;
  };
}
