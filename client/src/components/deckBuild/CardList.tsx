import * as React from 'react';

import {Card as CardType} from '../../reducers/deckBuild/types';
import Card from './Card';
import styles from './styles/CardList.scss';

interface CardListProps {
  cards: CardType[];
  pickCard: (cardType: CardType) => any;
};

export default function CardList({cards, pickCard}: CardListProps) {
  return (
    <ul className={styles.container}>
      {cards.map((card, index) => (
        <li key={index}>
          <Card card={card} onClick={() => pickCard(card)} />
        </li>
      ))}
    </ul>
  );
}
