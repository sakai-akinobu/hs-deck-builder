// @flow
import React from 'react';

import DeckCard from './DeckCard';
import type {DeckCard as DeckCardType} from '../../reducers/deckBuild/types';

type DeckProps = {
  deck: DeckCardType[],
};

export default function Deck({deck}: DeckProps) {
  return (
    <div>
      {deck.map((deckCard, index) => (
        <DeckCard key={index} deckCard={deckCard} />
      ))}
    </div>
  );
}
