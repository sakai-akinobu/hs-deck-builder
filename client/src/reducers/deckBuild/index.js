// @flow
import {createAction, handleActions} from '../../utils/redux';
import axios from 'axios';

import type {DeckBuildState as State} from './types';
import type {ActionCreatorResult} from '../../types';

export const INIT = 'hs-deck-builder/deckBuild/INIT';

function createInitialState(): State {
  return {
    format: 'standard',
    hero: '',
    query: '',
    mana: null,
    page: {
      prev: 1,
      current: 1,
      next: 1,
      last: 1,
    },
    cards: [],
    deck: [],
  };
}

export async function init(): Promise<ActionCreatorResult> {
  const {data} = await axios.get('/api/v1/cards');
  return createAction(INIT)(data);
}

export default handleActions({
  [INIT]: (state, {payload}): State => {
    return {
      ...state,
      page: payload.page,
      cards: payload.cards,
    };
  },
}, createInitialState());
