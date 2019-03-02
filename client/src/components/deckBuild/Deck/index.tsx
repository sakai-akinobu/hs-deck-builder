import * as React from "react";

import DeckCard from "../DeckCard";
import ManaCurve from "../ManaCurve";
import CardCounter from "../CardCounter";
import EncodeString from "../EncodeString";
import { HeroType } from "../../../types/hero";
import { DeckCard as DeckCardType } from "../../../reducers/deckBuild/types";
import styles from "./index.scss";

interface DeckProps {
  hero: HeroType;
  deck: DeckCardType[];
  unpickCard: (deckCardType: DeckCardType) => any;
}

export default function Deck({ hero, deck, unpickCard }: DeckProps) {
  const cardCount = deck.reduce((cnt, deckCard) => cnt + deckCard.count, 0);
  return (
    <div>
      <ManaCurve deck={deck} />
      <CardCounter count={cardCount} />
      <EncodeString hero={hero} deck={deck} />
      <div className={styles.deckCards}>
        {deck.map((deckCard, index) => (
          <DeckCard
            key={index}
            deckCard={deckCard}
            onClick={() => unpickCard(deckCard)}
          />
        ))}
      </div>
    </div>
  );
}
