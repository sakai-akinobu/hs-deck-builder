import { createAction } from "../../utils/redux";
import { decode } from "deckstrings";

import { HeroToDbfIdMap } from "../../types/hero";
import { Card as CardType, DeckCard as DeckCardType, DeckCard } from "./types";
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
  const normalizedDeckCode = deckCode
    .split(/\n/)
    .filter(line => {
      return !line.startsWith("#");
    })
    .join("");

  const decodedObject = decode(normalizedDeckCode);

  const dbfIds = decodedObject.cards.map(([dbfId]) => dbfId);
  const fetchedCards = await fetchCardByDbfIds(dbfIds);

  const dbfIdToFetchedCardMap: {
    [dbfId: number]: CardType;
  } = fetchedCards.reduce((memo, fetchedCard) => {
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

  const cards: DeckCard[] = decodedObject.cards
    .map(([dbfId, count]) => {
      const card = dbfIdToFetchedCardMap[dbfId];
      return {
        card,
        count
      };
    })
    .sort((a, b) => {
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

  const data = await fetchCards({ class: hero });

  return [
    createAction(IMPORT_DECK_CODE)({ hero, cards }),
    createAction(SEARCH_CARD)(data)
  ];
}
