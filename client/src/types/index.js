// @flow
import type {Store as ReduxStore} from 'redux';
import type {NoopAction} from '../utils/redux-noop';

import type {DeckBuildAction, DeckBuildState} from '../reducers/deckBuild/types';

export type State = {
  deckBuild: DeckBuildState,
};

export type Actions =
  | NoopAction // @see also redux-noop
  | DeckBuildAction
  ;

export type Store = ReduxStore<State, Dispatch, DispatchAction>;

// Support redux-promise, redux-array
export type PromiseAction = Promise<DispatchAction>;
export type DispatchAction = Actions | PromiseAction;
export type Dispatch = (action: DispatchAction) => Promise<DispatchAction>;
export type ActionCreatorResult = DispatchAction;
