import * as React from "react";

import { DeckCard as DeckCardType } from "../../../ducks/deckBuild/types";
import styles from "./index.scss";

interface Props {
  deckCard: DeckCardType;
  onClick: () => void;
}

export default function DeckCard({ deckCard, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={styles.container}
      style={{
        backgroundImage: `url(https://art.hearthstonejson.com/v1/tiles/${
          deckCard.card.id
        }.png)`
      }}
    >
      <div className={styles.cost}>{deckCard.card.cost}</div>
      <div className={styles.name}>{deckCard.card.name}</div>
      {deckCard.count > 1 && (
        <div className={styles.count}>
          <span>{deckCard.count}</span>
        </div>
      )}
    </div>
  );
}
