// @flow
import React from 'react';

import DeckCard from './DeckCard';
import ManaCurve from './ManaCurve';
import CardCounter from './CardCounter';
import EncodeString from './EncodeString';
import type {DeckCard as DeckCardType} from '../../reducers/deckBuild/types';

type DeckProps = {
  hero: string,
  deck: DeckCardType[],
  unpickCard: (DeckCardType) => any,
};

export default function Deck({hero, deck, unpickCard}: DeckProps) {
  const cardCount = deck.reduce((cnt, deckCard) => cnt + deckCard.count, 0);
  return (
    <div>
      <ManaCurve deck={deck} />
      <CardCounter count={cardCount} />
      <EncodeString hero={hero} deck={deck} />
      {deck.map((deckCard, index) => (
        <DeckCard key={index} deckCard={deckCard} onClick={() => unpickCard(deckCard)} />
      ))}
    </div>
  );
}
