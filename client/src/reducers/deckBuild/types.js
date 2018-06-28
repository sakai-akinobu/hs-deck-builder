// @flow
type InitAction = { type: 'hs-deck-builder/deckBuild/INIT', payload: any };

export type DeckBuildAction =
  | InitAction
  ;

type Card = {|
  id: string,
|};

type DeckCard = {|
  id: string,
  count: number,
|};

export type DeckBuildState = {|
  format: string,
  hero: string,
  query: string,
  mana: ?number,
  page: number,
  card: Card[],
  deck: DeckCard[],
|};
