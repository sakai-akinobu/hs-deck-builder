// @flow
import React from 'react';

import DeckCard from './DeckCard';
import CardCounter from './CardCounter';
import type {DeckCard as DeckCardType} from '../../reducers/deckBuild/types';

type DeckProps = {
  deck: DeckCardType[],
  unpickCard: (DeckCardType) => any,
};

export default function Deck({deck, unpickCard}: DeckProps) {
  const cardCount = deck.reduce((cnt, deckCard) => cnt + deckCard.count, 0);
  return (
    <div>
      <CardCounter count={cardCount} />
      {deck.map((deckCard, index) => (
        <DeckCard key={index} deckCard={deckCard} onClick={() => unpickCard(deckCard)} />
      ))}
    </div>
  );
}
