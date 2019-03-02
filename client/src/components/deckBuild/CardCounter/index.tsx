import * as React from "react";

import styles from "./index.scss";

interface CardCounterProps {
  count: number;
}

const MAX_CARD_COUNT = 30;

export default function CardCounter({ count }: CardCounterProps) {
  return (
    <div className={styles.container}>
      <span
        className={`${styles.label} ${
          count === MAX_CARD_COUNT ? styles.isMax : ""
        }`}
      >
        ({count}/{MAX_CARD_COUNT})
      </span>
    </div>
  );
}
