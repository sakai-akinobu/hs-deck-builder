import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {getRoute} from '../routes';
import createStore from './createStore';
import '../utils/styles/index.scss';

const store = createStore();
const route = getRoute();

const RootComponent = route.component;

route.loader({store}).then(() => {
  render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
    document.getElementById('root'),
  );
});
