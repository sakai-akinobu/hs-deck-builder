import { createStore as _createStore, applyMiddleware, compose } from "redux";

import middlewares from "../middlewares";
import reducers from "../ducks/reducers";

export default function createStore() {
  let finalCreateStore;

  if (__DEVELOPMENT__) {
    const enhancers = [applyMiddleware(...middlewares)];
    // 開発するときはChrome拡張をインストール
    // https://github.com/zalmoxisus/redux-devtools-extension
    if (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION__) {
      enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }
    finalCreateStore = compose<any>(...enhancers)(_createStore);
  } else {
    finalCreateStore = compose<any>(applyMiddleware(...middlewares))(
      _createStore
    );
  }

  return finalCreateStore(reducers, {});
}
