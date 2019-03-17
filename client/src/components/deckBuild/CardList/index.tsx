import * as React from "react";

import { Card as CardType } from "../../../ducks/deckBuild/types";
import Card from "../Card";
import styles from "./index.scss";

interface Props {
  cards: CardType[];
  pickCard: (cardType: CardType) => void;
}

export default function CardList({ cards, pickCard }: Props) {
  return (
    <ul className={styles.container}>
      {cards.map(card => (
        <li key={card.id} className={styles.card}>
          <Card card={card} onClick={() => pickCard(card)} />
        </li>
      ))}
    </ul>
  );
}
