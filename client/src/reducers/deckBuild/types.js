// @flow
type InitAction = { type: 'hs-deck-builder/deckBuild/INIT', payload: any };

export type DeckBuildAction =
  | InitAction
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
