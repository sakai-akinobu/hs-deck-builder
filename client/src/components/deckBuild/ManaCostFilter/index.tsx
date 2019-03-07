import * as React from "react";

import styles from "./index.scss";

const MANA_COSTS: string[] = ["0", "1", "2", "3", "4", "5", "6", "7+"];

interface Props {
  manaCost: string;
  onClick: (manaCost: string) => void;
}

export default function ManaCostFilter(props: Props) {
  return (
    <div>
      <h3 className={styles.title}>Mana cost</h3>
      <ul className={styles.manaCostContainer}>
        {MANA_COSTS.map(manaCost => (
          <li key={manaCost} className={styles.manaCost}>
            <span
              className={props.manaCost === manaCost ? styles.chosen : ""}
              onClick={() => props.onClick(manaCost)}
            >
              {manaCost}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
