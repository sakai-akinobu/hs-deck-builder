import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {getRoute} from '../routes';
import createStore from './createStore';

const store = createStore();
const route = getRoute();

route.loader({store}).then(() => {
  render(
    <Provider store={store}>
      <div>index.jsx</div>
    </Provider>,
    document.getElementById('root'),
  );
});
