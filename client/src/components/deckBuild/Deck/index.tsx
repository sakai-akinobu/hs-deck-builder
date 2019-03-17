import * as React from "react";

import DeckCard from "../DeckCard";
import ManaCurve from "../ManaCurve";
import CardCounter from "../CardCounter";
import EncodeButton from "../EncodeButton";
import ImportButton from "../ImportButton";
import ClearDeckCardsLink from "../ClearDeckCardsLink";
import { HeroType } from "../../../types/hero";
import { DeckCard as DeckCardType } from "../../../ducks/deckBuild/types";
import styles from "./index.scss";

interface Props {
  hero: HeroType;
  deck: DeckCardType[];
  clearDeckCards: () => void;
  unpickCard: (deckCardType: DeckCardType) => void;
  importDeckCode: (deckCode: string) => void;
}

export default function Deck({
  hero,
  deck,
  clearDeckCards,
  unpickCard,
  importDeckCode
}: Props) {
  const cardCount = deck.reduce((cnt, deckCard) => cnt + deckCard.count, 0);
  return (
    <div>
      <ManaCurve deck={deck} />
      <CardCounter count={cardCount} />
      <EncodeButton hero={hero} deck={deck} />
      <ImportButton onImport={importDeckCode} />
      <div className={styles.deckCards}>
        {deck.length > 0 && <ClearDeckCardsLink onClick={clearDeckCards} />}
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
