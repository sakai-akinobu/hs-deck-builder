// @flow
/**
 * 「何もしない」をするmiddleware
 */
import type {Dispatch, MiddlewareAPI} from 'redux';

export type NoopAction = {type: 'redux-noop/NOOP'};
export const NOOP = 'redux-noop/NOOP';
export const _NOOP = '__redux-noop/NOOP__';

export default ({dispatch}: MiddlewareAPI<*, *>) => (next: Dispatch<*>) => (action: any) => {
  if (action.type === NOOP) {
    return dispatch({type: _NOOP});
  }
  return next(action);
};
