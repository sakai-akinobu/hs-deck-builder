import * as React from 'react';

import {Card as CardType} from '../../reducers/deckBuild/types';
import styles from './styles/Card.scss';

interface CardProps {
  card: CardType;
  onClick: () => any;
}

export default function Card({card, onClick}: CardProps) {
  return (
    <img
      src={`https://art.hearthstonejson.com/v1/render/latest/jaJP/256x/${card.id}.png`}
      onClick={onClick}
      className={styles.card}
    />
  );
}
