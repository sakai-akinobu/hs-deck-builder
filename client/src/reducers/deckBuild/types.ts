import { HeroType } from "../../types/hero";

interface InitAction {
  type: "hs-deck-builder/deckBuild/INIT";
  payload: any;
}
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
interface ChangePageAction {
  type: "hs-deck-builder/deckBuild/CHANGE_PAGE";
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

export type DeckBuildAction =
  | InitAction
  | ChangeHeroAction
  | SyncQueryAction
  | SearchCardAction
  | ChangePageAction
  | PickCardAction
  | UnpickCardAction
  | ClearDeckCardsAction;

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
  mana: number | null;
  page: {
    prev: number | null;
    current: number;
    next: number | null;
    last: number;
  };
  cards: Card[];
  deck: DeckCard[];
}
