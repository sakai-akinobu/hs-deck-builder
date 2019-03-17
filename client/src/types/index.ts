import { Store as ReduxStore } from "redux";

import { DeckBuildAction, DeckBuildState } from "../ducks/deckBuild/types";

export interface State {
  deckBuild: DeckBuildState;
}

export type Actions = DeckBuildAction;

export type Store = ReduxStore<State, any>; // TODO

export type PromiseAction = Promise<Actions>;
export type DispatchAction = Actions | PromiseAction;
export type Dispatch = (action: DispatchAction) => Promise<DispatchAction>;
export type ActionCreatorResult = DispatchAction;
