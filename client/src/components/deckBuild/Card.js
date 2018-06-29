// @flow
import React from 'react';

import type {Card as CardType} from '../../reducers/deckBuild/types';
import styles from './styles/Card.scss';

type CardProps = {
  card: CardType,
  onClick: () => any,
};

export default function Card({card, onClick}: CardProps) {
  return (
    <img
      src={`https://art.hearthstonejson.com/v1/render/latest/jaJP/256x/${card.cid}.png`}
      onClick={onClick}
      className={styles.card}
    />
  );
}
