import { createAction, handleActions } from "../../utils/redux";
import produce from "immer";
import { decode } from "deckstrings";

import {
  Card as CardType,
  DeckBuildState as State,
  DeckCard as DeckCardType,
  DeckCard
} from "./types";
import {
  Rarity,
  MAX_CARD_COUNT_IN_DECK,
  MAX_COUNT_OF_SAME_CARD
} from "../../utils/constants/hearthstone";
import { HeroToDbfIdMap } from "../../types/hero";

export const CHANGE_HERO = "hs-deck-builder/deckBuild/CHANGE_HERO";
export const SYNC_QUERY = "hs-deck-builder/deckBuild/SYNC_QUERY";
export const SEARCH_CARD = "hs-deck-builder/deckBuild/SEARCH_CARD";
export const PICK_CARD = "hs-deck-builder/deckBuild/PICK_CARD";
export const UNPICK_CARD = "hs-deck-builder/deckBuild/UNPICK_CARD";
export const CLEAR_DECK_CARDS = "hs-deck-builder/deckBuild/CLEAR_DECK_CARDS";
export const CHOOSE_MANA_COST = "hs-deck-builder/deckBuild/CHOOSE_MANA_COST";
export const CLEAR_MANA_COST = "hs-deck-builder/deckBuild/CLEAR_MANA_COST";
export const IMPORT_DECK_CODE = "hs-deck-builder/deckBuild/IMPORT_DECK_CODE";

const worker = new Worker("/built/cards.bundle.js");

function fetchCards(params: { class: string; query?: string; page?: number }) {
  return new Promise(resolve => {
    worker.addEventListener("message", message => {
      resolve(message.data);
    });
    worker.postMessage({
      method: "findByConditions",
      conditions: params
    });
  });
}

function fetchCardByDbfIds(dbfIds: number[]): Promise<any[]> {
  return new Promise(resolve => {
    worker.addEventListener("message", message => {
      resolve(message.data.cards);
    });
    worker.postMessage({
      method: "findByDbfIds",
      dbfIds
    });
  });
}

function createInitialState(): State {
  return {
    format: "standard",
    hero: "DRUID",
    query: "",
    manaCost: "",
    page: {
      prev: 1,
      current: 1,
      next: 1,
      last: 1
    },
    cards: [],
    deck: []
  };
}

export async function init() {
  const params = {
    class: "DRUID"
  };
  const data = await fetchCards(params);
  return createAction(SEARCH_CARD)(data);
}

export async function changeHero(hero: string, query: string) {
  const params = {
    class: hero,
    query
  };
  const data = await fetchCards(params);
  return [
    createAction(CHANGE_HERO)({ hero }),
    createAction(CLEAR_MANA_COST)(),
    createAction(CLEAR_DECK_CARDS)(),
    createAction(SEARCH_CARD)(data)
  ];
}

export function syncQuery(query: string) {
  return createAction(SYNC_QUERY)({ query });
}

export async function searchCard(hero: string, query: string) {
  const params = {
    class: hero,
    query
  };
  const data = await fetchCards(params);
  return createAction(SEARCH_CARD)(data);
}

export async function chooseManaCost(
  hero: string,
  query: string,
  manaCost: string
) {
  const params = {
    class: hero,
    query,
    manaCost
  };
  const data = await fetchCards(params);
  return [
    createAction(CHOOSE_MANA_COST)({ manaCost }),
    createAction(SEARCH_CARD)(data)
  ];
}

export async function clearManaCost(hero: string, query: string) {
  const params = {
    class: hero,
    query,
    manaCost: ""
  };
  const data = await fetchCards(params);
  return [createAction(CLEAR_MANA_COST)(), createAction(SEARCH_CARD)(data)];
}

export async function changePage(
  hero: string,
  query: string,
  manaCost: string,
  page: number
) {
  const params = {
    class: hero,
    query,
    manaCost,
    page
  };
  const data = await fetchCards(params);
  return createAction(SEARCH_CARD)(data);
}

export function pickCard(card: CardType) {
  return createAction(PICK_CARD)({ card });
}

export function unpickCard(deckCard: DeckCardType) {
  return createAction(UNPICK_CARD)({ deckCard });
}

export function clearDeckCards() {
  return createAction(CLEAR_DECK_CARDS)();
}

export async function importDeckCode(deckCode: string) {
  const decodedObject = decode(deckCode);

  const dbfIds = decodedObject.cards.map(([dbfId]) => dbfId);
  const fetchedCards = await fetchCardByDbfIds(dbfIds);

  const dbfIdToFetchedCardMap = fetchedCards.reduce((memo, fetchedCard) => {
    memo[fetchedCard.dbfId] = fetchedCard;
    return memo;
  }, {});

  const heroEntry = Object.entries(HeroToDbfIdMap).find(([, dbfId]) => {
    return decodedObject.heroes[0] === dbfId;
  });
  if (heroEntry === undefined) {
    throw new Error(
      `Unexpected hero dbfId was found. dbfId:${decodedObject.heroes[0]}`
    );
  }
  const hero = heroEntry[0];

  const cards: DeckCard[] = decodedObject.cards.map(([dbfId, count]) => {
    const card = dbfIdToFetchedCardMap[dbfId];
    return {
      card,
      count
    };
  });

  const data = await fetchCards({ class: hero });

  return [
    createAction(IMPORT_DECK_CODE)({ hero, cards }),
    createAction(SEARCH_CARD)(data)
  ];
}

export default handleActions<State>(
  {
    [CHANGE_HERO]: (state, { payload }: any): State => {
      return produce(state, draft => {
        draft.hero = payload.hero;
      });
    },
    [SYNC_QUERY]: (state, { payload }: any): State => {
      return produce(state, draft => {
        draft.query = payload.query;
      });
    },
    [SEARCH_CARD]: (state, { payload }: any): State => {
      return produce(state, draft => {
        draft.page = payload.page;
        draft.cards = payload.cards;
      });
    },
    [CHOOSE_MANA_COST]: (state, { payload }: any): State => {
      return produce(state, draft => {
        draft.manaCost = payload.manaCost;
      });
    },
    [CLEAR_MANA_COST]: (state): State => {
      return produce(state, draft => {
        draft.manaCost = "";
      });
    },
    [PICK_CARD]: (state, { payload }: any): State => {
      return produce(state, draft => {
        const totalCardCount = draft.deck.reduce(
          (totalCount, deckCard) => totalCount + deckCard.count,
          0
        );

        if (totalCardCount < MAX_CARD_COUNT_IN_DECK) {
          const pickedCard: CardType = payload.card;
          const pickedDeckCard = draft.deck.find(
            deckCard => deckCard.card.id === pickedCard.id
          );

          if (pickedDeckCard) {
            if (
              pickedDeckCard.count < MAX_COUNT_OF_SAME_CARD &&
              pickedDeckCard.card.rarity !== Rarity.legendary
            ) {
              pickedDeckCard.count++;
            }
          } else {
            draft.deck.push({ card: pickedCard, count: 1 });
          }
        }
      });
    },
    [UNPICK_CARD]: (state, { payload }: any): State => {
      return produce(state, draft => {
        const pickedDeckCard = draft.deck.find(
          deckCard => deckCard.card.id === payload.deckCard.card.id
        );
        if (pickedDeckCard) {
          pickedDeckCard.count--;
          if (pickedDeckCard.count === 0) {
            draft.deck = draft.deck.filter(
              deckCard => deckCard.card.id !== payload.deckCard.card.id
            );
          }
        }
      });
    },
    [CLEAR_DECK_CARDS]: (state): State => {
      return produce(state, draft => {
        draft.deck = [];
      });
    },
    [IMPORT_DECK_CODE]: (state, { payload }: any): State => {
      return produce(state, draft => {
        draft.hero = payload.hero;
        draft.query = "";
        draft.manaCost = "";
        draft.deck = payload.cards;
      });
    }
  },
  createInitialState()
);
