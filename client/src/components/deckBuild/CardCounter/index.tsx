import * as React from "react";

import { MAX_CARD_COUNT_IN_DECK } from "../../../utils/constants/hearthstone";
import styles from "./index.scss";

interface Props {
  count: number;
}

export default function CardCounter({ count }: Props) {
  return (
    <div className={styles.container}>
      <span
        className={`${styles.label} ${
          count === MAX_CARD_COUNT_IN_DECK ? styles.isMax : ""
        }`}
      >
        ({count}/{MAX_CARD_COUNT_IN_DECK})
      </span>
    </div>
  );
}
