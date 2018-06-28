// @flow
import promiseMiddleware from 'redux-promise';
import promisifiedArrayMiddleware from '../utils/redux-promisified-array';

const middlewares = [
  promisifiedArrayMiddleware,
  promiseMiddleware,
];

export default middlewares;
