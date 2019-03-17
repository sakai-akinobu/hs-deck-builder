import { combineReducers } from "redux";

import deckBuild from "./deckBuild/reducers";

export default combineReducers<any>({
  deckBuild
});
