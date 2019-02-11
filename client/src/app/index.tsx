import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {getRoute} from '../routes';
import createStore from './createStore';
import '../utils/styles/index.scss';

const store = createStore();
const route = getRoute();

const RootComponent = route.component;

route.loader({store}).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
    document.getElementById('root'),
  );
});
