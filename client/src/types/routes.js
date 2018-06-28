// @flow
import type {Store} from './index';

export type HistoryProps = {
  action: '' | 'POP' | 'PUSH',
};

export type LoaderProps = {
  store: Store,
  url: string,
  history: History & HistoryProps,
};

export type Route = {
  loader: (LoaderProps) => Promise<*> | Array<Promise<*>>,
  component: React$ComponentType<*>,
};
