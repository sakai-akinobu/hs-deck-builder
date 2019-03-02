import * as React from "react";

import styles from "./index.scss";

interface CardCounterProps {
  count: number;
}

export default function CardCounter({ count }: CardCounterProps) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>({count}/30)</span>
    </div>
  );
}
