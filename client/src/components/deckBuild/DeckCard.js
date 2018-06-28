// @flow
import React from 'react';

import type {DeckCard as DeckCardType} from '../../reducers/deckBuild/types';
import styles from './styles/DeckCard.scss';

type DeckCardProps = {
  deckCard: DeckCardType,
  onClick: () => any,
};

export default function DeckCard({deckCard, onClick}: DeckCardProps) {
  return (
    <div onClick={onClick} className={styles.container}>
      <img src={`https://art.hearthstonejson.com/v1/tiles/${deckCard.card.cid}.png`} className={styles.tile} />
      <span className={styles.name}>{deckCard.card.name}</span>
      <span className={styles.count}>{deckCard.count}</span>
    </div>
  );
}
