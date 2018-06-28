// @flow
type InitAction = { type: 'hs-deck-builder/deckBuild/INIT', payload: any };
type SyncHeroAction = { type: 'hs-deck-builder/deckBuild/SYNC_HERO', payload: any };
type SyncQueryAction = { type: 'hs-deck-builder/deckBuild/SYNC_QUERY', payload: any };
type SearchCardAction = { type: 'hs-deck-builder/deckBuild/SEARCH_CARD', payload: any };
type ChangePageAction = { type: 'hs-deck-builder/deckBuild/CHANGE_PAGE', payload: any };

export type DeckBuildAction =
  | InitAction
  | SyncHeroAction
  | SyncQueryAction
  | SearchCardAction
  | ChangePageAction
  ;

export type Card = {|
  cid: string,
|};

export type DeckCard = {|
  cid: string,
  count: number,
|};

export type DeckBuildState = {|
  format: string,
  hero: string,
  query: string,
  mana: ?number,
  page: {|
    prev: ?number,
    current: number,
    next: ?number,
    last: number,
  |},
  cards: Card[],
  deck: DeckCard[],
|};
