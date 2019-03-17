import { HeroType } from "../../types/hero";

export const CHANGE_HERO = "hs-deck-builder/deckBuild/CHANGE_HERO";
export const SYNC_QUERY = "hs-deck-builder/deckBuild/SYNC_QUERY";
export const SEARCH_CARD = "hs-deck-builder/deckBuild/SEARCH_CARD";
export const PICK_CARD = "hs-deck-builder/deckBuild/PICK_CARD";
export const UNPICK_CARD = "hs-deck-builder/deckBuild/UNPICK_CARD";
export const CLEAR_DECK_CARDS = "hs-deck-builder/deckBuild/CLEAR_DECK_CARDS";
export const CHOOSE_MANA_COST = "hs-deck-builder/deckBuild/CHOOSE_MANA_COST";
export const CLEAR_MANA_COST = "hs-deck-builder/deckBuild/CLEAR_MANA_COST";
export const IMPORT_DECK_CODE = "hs-deck-builder/deckBuild/IMPORT_DECK_CODE";

interface ChangeHeroAction {
  type: typeof CHANGE_HERO;
  payload: any;
}
interface SyncQueryAction {
  type: typeof SYNC_QUERY;
  payload: any;
}
interface SearchCardAction {
  type: typeof SEARCH_CARD;
  payload: any;
}
interface ChooseManaCostAction {
  type: typeof CHOOSE_MANA_COST;
  payload: any;
}
interface ClearManaCostAction {
  type: typeof CLEAR_MANA_COST;
  payload: any;
}
interface PickCardAction {
  type: typeof PICK_CARD;
  payload: any;
}
interface UnpickCardAction {
  type: typeof UNPICK_CARD;
  payload: any;
}
interface ClearDeckCardsAction {
  type: typeof CLEAR_DECK_CARDS;
  payload: any;
}
interface ImportDeckCodeAction {
  type: typeof IMPORT_DECK_CODE;
  payload: any;
}

export type DeckBuildAction =
  | ChangeHeroAction
  | SyncQueryAction
  | SearchCardAction
  | ChooseManaCostAction
  | ClearManaCostAction
  | PickCardAction
  | UnpickCardAction
  | ClearDeckCardsAction
  | ImportDeckCodeAction;

export interface Card {
  id: string;
  dbfId: string;
  name: string;
  cost: number;
  rarity: string;
}

export interface DeckCard {
  card: Card;
  count: number;
}

export interface DeckBuildState {
  format: string;
  hero: HeroType;
  query: string;
  manaCost: string;
  page: {
    prev: number;
    current: number;
    next: number;
    last: number;
  };
  cards: Card[];
  deck: DeckCard[];
}
