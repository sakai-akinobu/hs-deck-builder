// @flow
import {createAction, handleActions} from '../../utils/redux';
import axios from 'axios';
import immer from 'immer';

import type {ActionCreatorResult} from '../../types';
import type {
  Card as CardType,
  DeckBuildState as State,
  DeckCard as DeckCardType,
} from './types';

export const INIT = 'hs-deck-builder/deckBuild/INIT';
export const CHANGE_HERO = 'hs-deck-builder/deckBuild/CHANGE_HERO';
export const SYNC_QUERY = 'hs-deck-builder/deckBuild/SYNC_QUERY';
export const SEARCH_CARD = 'hs-deck-builder/deckBuild/SEARCH_CARD';
export const CHANGE_PAGE = 'hs-deck-builder/deckBuild/CHANGE_PAGE';
export const PICK_CARD = 'hs-deck-builder/deckBuild/PICK_CARD';
export const UNPICK_CARD = 'hs-deck-builder/deckBuild/UNPICK_CARD';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

function createInitialState(): State {
  return {
    format: 'standard',
    hero: 'DRUID',
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
  const params = {
    'class': 'DRUID',
  };
  const {data} = await api.get('/api/v1/cards', {params});
  return createAction(INIT)(data);
}

export async function changeHero(hero: string, query: string): ActionCreatorResult {
  const params = {
    'class': hero,
    query,
  };
  const {data} = await api.get('/api/v1/cards', {params});
  return createAction(CHANGE_HERO)({hero, ...data});
}

export function syncQuery(query: string): ActionCreatorResult {
  return createAction(SYNC_QUERY)({query});
}

export async function searchCard(hero: string, query: string): ActionCreatorResult {
  const params = {
    'class': hero,
    query,
  };
  const {data} = await api.get('/api/v1/cards', {params});
  return createAction(SEARCH_CARD)(data);
}

export async function changePage(hero: string, query: string, page: number): ActionCreatorResult {
  const params = {
    'class': hero,
    query,
    page,
  };
  const {data} = await api.get('/api/v1/cards', {params});
  return createAction(CHANGE_PAGE)(data);
}

export function pickCard(card: CardType): ActionCreatorResult {
  return createAction(PICK_CARD)({card});
}

export function unpickCard(deckCard: DeckCardType): ActionCreatorResult {
  return createAction(UNPICK_CARD)({deckCard});
}

export default handleActions({
  [INIT]: (state, {payload}): State => {
    return {
      ...state,
      page: payload.page,
      cards: payload.cards,
    };
  },
  [CHANGE_HERO]: (state, {payload}): State => {
    return {
      ...state,
      hero: payload.hero,
      page: payload.page,
      cards: payload.cards,
      deck: [],
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
  [CHANGE_PAGE]: (state, {payload}): State => {
    return {
      ...state,
      page: payload.page,
      cards: payload.cards,
    };
  },
  [PICK_CARD]: (state, {payload}): State => {
    const MAX_CARD_COUNT_IN_DECK = 30;
    const MAX_CARD_COUNT = 2;

    return immer(state, state => {
      const pickedCard: CardType = payload.card;
      const pickedDeckCard: ?DeckCardType = state.deck.find((deckCard) => deckCard.card.id === pickedCard.id);

      const maxCount = state.deck.reduce((cnt, deckCard) => cnt + deckCard.count, 0);

      if (maxCount < MAX_CARD_COUNT_IN_DECK) {
        if (pickedDeckCard) {
          if (pickedDeckCard.count < MAX_CARD_COUNT && pickedDeckCard.card.rarity !== 'LEGENDARY') {
            pickedDeckCard.count++;
          }
        } else {
          state.deck.push({card: pickedCard, count: 1});
        }
      }
    });
  },
  [UNPICK_CARD]: (state, {payload}): State => {
    return immer(state, state => {
      const pickedDeckCard: DeckCardType = state.deck.find((deckCard) => deckCard.card.id === payload.deckCard.card.id);
      pickedDeckCard.count--;
      if (pickedDeckCard.count === 0) {
        state.deck = state.deck.filter((deckCard) => deckCard.card.id !== payload.deckCard.card.id);
      }
    });
  },
}, createInitialState());
