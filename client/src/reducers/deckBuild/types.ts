import { HeroType } from "../../types/hero";

interface ChangeHeroAction {
  type: "hs-deck-builder/deckBuild/CHANGE_HERO";
  payload: any;
}
interface SyncQueryAction {
  type: "hs-deck-builder/deckBuild/SYNC_QUERY";
  payload: any;
}
interface SearchCardAction {
  type: "hs-deck-builder/deckBuild/SEARCH_CARD";
  payload: any;
}
interface ChooseManaCostAction {
  type: "hs-deck-builder/deckBuild/CHOOSE_MANA_COST";
  payload: any;
}
interface ClearManaCostAction {
  type: "hs-deck-builder/deckBuild/CLEAR_MANA_COST";
  payload: any;
}
interface PickCardAction {
  type: "hs-deck-builder/deckBuild/PICK_CARD";
  payload: any;
}
interface UnpickCardAction {
  type: "hs-deck-builder/deckBuild/UNPICK_CARD";
  payload: any;
}
interface ClearDeckCardsAction {
  type: "hs-deck-builder/deckBuild/CLEAR_DECK_CARDS";
  payload: any;
}
interface ImportDeckCodeAction {
  type: "hs-deck-builder/deckBuild/IMPORT_DECK_CODE";
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
