// @flow
import {createAction as _createAction} from 'redux-actions';
import type {Actions} from '../types';

export {handleActions} from 'redux-actions';

export function createAction(
  type: $PropertyType<Actions, 'type'>,
  payloadCreator?: ?Function,
  metaCreator?: Function,
): (...args: any[]) => {type: any} {
  return _createAction(type, payloadCreator, metaCreator);
}
