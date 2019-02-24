import * as React from "react";

import { DeckCard as DeckCardType } from "../../reducers/deckBuild/types";
import styles from "./styles/DeckCard.scss";

interface DeckCardProps {
  deckCard: DeckCardType;
  onClick: () => any;
}

export default function DeckCard({ deckCard, onClick }: DeckCardProps) {
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
      <div className={styles.name}>{deckCard.card.name}</div>
      {deckCard.count > 1 && (
        <div className={styles.count}>
          <span>{deckCard.count}</span>
        </div>
      )}
    </div>
  );
}
