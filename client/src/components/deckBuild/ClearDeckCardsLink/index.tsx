import * as React from "react";

import styles from "./index.scss";

interface Props {
  onClick: () => void;
}

export default function ClearDeckCardsLink({ onClick }: Props) {
  return (
    <div className={styles.container}>
      <div onClick={onClick} className={styles.link}>
        Clear all cards
      </div>
    </div>
  );
}
