import {Store} from './index';

export interface LoaderProps {
  store: Store;
}

export interface Route {
  loader: (loaderProps: LoaderProps) => Promise<any>;
  component: React.ComponentType;
}
