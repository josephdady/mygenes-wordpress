import { StatisticCard } from './StatisticCard';

export interface Statistic {
  title: string;
  subtitle: string;
  disclaimer: string;
  cards: StatisticCard[];
}
