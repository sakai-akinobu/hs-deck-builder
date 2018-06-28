// @flow
import React from 'react';

import type {Card as CardType} from '../../reducers/deckBuild/types';

type CardProps = {
  card: CardType,
};

export default function Card({card}: CardProps) {
  return <img src={`https://art.hearthstonejson.com/v1/render/latest/jaJP/256x/${card.cid}.png`} />;
}
