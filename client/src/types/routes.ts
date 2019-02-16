import {Store} from './index';

export type HistoryProps = {
  action: '' | 'POP' | 'PUSH',
};

export type LoaderProps = {
  store: Store,
  url: string,
  history: History & HistoryProps,
};

export type Route = {
  loader: (loaderProps: LoaderProps) => Promise<any> | Array<Promise<any>>,
  component: React.Component,
};
