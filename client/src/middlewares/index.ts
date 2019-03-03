import promiseMiddleware from "redux-promise";
import promisifiedArrayMiddleware from "./redux-promisified-array";

const middlewares = [promiseMiddleware, promisifiedArrayMiddleware];

export default middlewares;
