// @flow
import React from 'react';

import type {DeckCard as DeckCardType} from '../../reducers/deckBuild/types';

type DeckCardProps = {
  deckCard: DeckCardType,
  onClick: () => any,
};

export default function DeckCard({deckCard, onClick}: DeckCardProps) {
  return (
    <div onClick={onClick}>
      <img src={`https://art.hearthstonejson.com/v1/tiles/${deckCard.card.cid}.png`} />
      <span>{deckCard.card.name}</span>
      <span>{deckCard.count}</span>
    </div>
  );
}
