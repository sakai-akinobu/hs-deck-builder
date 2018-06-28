// @flow
import {createAction, handleActions} from '../../utils/redux';
import axios from 'axios';

import type {ActionCreatorResult} from '../../types';
import type {DeckBuildState as State} from './types';

export const INIT = 'hs-deck-builder/deckBuild/INIT';
export const SYNC_QUERY = 'hs-deck-builder/deckBuild/SYNC_QUERY';
export const SEARCH_CARD = 'hs-deck-builder/deckBuild/SEARCH_CARD';

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

export function syncQuery(query: string): ActionCreatorResult {
  return createAction(SYNC_QUERY)({query});
}

export async function searchCard(query: string): ActionCreatorResult {
  const params = {
    query,
  };
  const {data} = await axios.get('/api/v1/cards', {params});
  return createAction(SEARCH_CARD)(data);
}

export default handleActions({
  [INIT]: (state, {payload}): State => {
    return {
      ...state,
      page: payload.page,
      cards: payload.cards,
    };
  },
  [SYNC_QUERY]: (state, {payload}): State => {
    return {
      ...state,
      query: payload.query,
    };
  },
  [SEARCH_CARD]: (state, {payload}): State => {
    return {
      ...state,
      page: payload.page,
      cards: payload.cards,
    };
  },
}, createInitialState());
