import {
  createAction as _createAction,
  ActionFunctionAny
} from "redux-actions";
import { Actions } from "../types";

export { handleActions } from "redux-actions";

export function createAction(
  type: Actions["type"],
  payloadCreator?: ActionFunctionAny<any>,
  metaCreator?: ActionFunctionAny<any>
): (...args: any[]) => { type: any } {
  return _createAction(type, payloadCreator as any, metaCreator as any);
}
