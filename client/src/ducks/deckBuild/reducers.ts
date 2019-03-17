import { handleActions } from "../../utils/redux";
import produce from "immer";

import { Card as CardType, DeckBuildState as State } from "./types";
import {
  Rarity,
  MAX_CARD_COUNT_IN_DECK,
  MAX_COUNT_OF_SAME_CARD
} from "../../utils/constants/hearthstone";
import {
  CHANGE_HERO,
  SYNC_QUERY,
  SEARCH_CARD,
  PICK_CARD,
  UNPICK_CARD,
  CLEAR_DECK_CARDS,
  CHOOSE_MANA_COST,
  CLEAR_MANA_COST,
  IMPORT_DECK_CODE
} from "./types";

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

        draft.deck = draft.deck.sort((a, b) => {
          if (a.card.cost < b.card.cost) {
            return -1;
          }
          if (a.card.cost > b.card.cost) {
            return 1;
          }
          if (a.card.dbfId < b.card.dbfId) {
            return -1;
          }
          if (a.card.dbfId > b.card.dbfId) {
            return 1;
          }
          return 0;
        });
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
