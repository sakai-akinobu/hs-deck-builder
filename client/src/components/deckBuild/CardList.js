// @flow
import React from 'react';

import type {Card as CardType} from '../../reducers/deckBuild/types';
import Card from './Card';

type CardListProps = {
  cards: CardType[],
};

export default function CardList({cards}: CardListProps) {
  return (
    <ul>
      {cards.map((card, index) => (
        <li key={index}>
          <Card card={card} />
        </li>
      ))}
    </ul>
  );
}
