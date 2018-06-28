// @flow
import {createAction, handleActions} from 'redux-actions';

import type {DeckBuildState as State} from './types';

export const INIT = 'hs-deck-builder/deckBuild/INIT';

function createInitialState(): State {
  return {
    format: 'standard',
    hero: '',
    query: '',
    mana: null,
    page: 1,
    card: [],
    deck: [],
  };
}

export async function init() {
  return createAction(INIT)();
}

export default handleActions({
  [INIT]: (state) => {
    return state;
  },
}, createInitialState());
