import {Store} from './index';

export type LoaderProps = {
  store: Store,
}

export type Route = {
  loader: (loaderProps: LoaderProps) => Promise<any>,
  component: React.Component,
}
