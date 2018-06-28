// @flow
import React from 'react';
import {encode} from 'deckstrings';

import type {DeckCard as DeckCardType} from '../../reducers/deckBuild/types';

type DeckProps = {
  deck: DeckCardType[],
};

const HERO_TO_DBF_ID_MAP = {
  DRUID: 274,
  HUNTER: 31,
  MAGE: 637,
  PALADIN: 671,
  PRIEST: 813,
  ROGUE: 930,
  SHAMAN: 1066,
  WARLOCK: 893,
  WARRIOR: 7,
};

export default function EncodeString({hero, deck}: DeckProps) {
  const encodeString: string = encode({
    cards: deck.map((deckCard) => [deckCard.card.dbf_id, deckCard.count]),
    heroes: [HERO_TO_DBF_ID_MAP[hero]],
    format: 2,
  });

  return (
    <div>{encodeString}</div>
  );
}
