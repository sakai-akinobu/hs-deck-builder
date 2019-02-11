// @flow
import type {Store as ReduxStore} from 'redux';

import type {DeckBuildAction, DeckBuildState} from '../reducers/deckBuild/types';

export type State = {
  deckBuild: DeckBuildState,
};

export type Actions =
  | DeckBuildAction
  ;

export type Store = ReduxStore<State, Dispatch, DispatchAction>;

export type PromiseAction = Promise<DispatchAction>;
export type DispatchAction = Actions | PromiseAction;
export type Dispatch = (action: DispatchAction) => Promise<DispatchAction>;
export type ActionCreatorResult = DispatchAction;
