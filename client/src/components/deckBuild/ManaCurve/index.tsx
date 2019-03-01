import * as React from "react";

import styles from "./index.scss";
import { DeckCard } from "../../../reducers/deckBuild/types";

interface ManaCurveProps {
  deck: DeckCard[];
}

export default function ManaCurve({ deck }: ManaCurveProps) {
  const manaCurves = [
    { label: "0", value: 0, count: 0 },
    { label: "1", value: 1, count: 0 },
    { label: "2", value: 2, count: 0 },
    { label: "3", value: 3, count: 0 },
    { label: "4", value: 4, count: 0 },
    { label: "5", value: 5, count: 0 },
    { label: "6", value: 6, count: 0 },
    { label: "7+", value: 7, count: 0 }
  ];

  deck.forEach(deckCard => {
    const cost = deckCard.card.cost;
    const manaCurve =
      manaCurves.find(curve => curve.value === cost) ||
      manaCurves[manaCurves.length - 1];
    manaCurve.count += deckCard.count;
  });

  return (
    <div className={styles.table}>
      {manaCurves.map((manaCurve, index) => {
        let scaleY = manaCurve.count * 0.1;
        scaleY = Math.min(scaleY, 1.0);
        return (
          <div key={index} className={styles.column}>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{ transform: `scaleY(${scaleY})` }}
              />
            </div>
            <div>{manaCurve.count}</div>
            <div>{manaCurve.label}</div>
          </div>
        );
      })}
    </div>
  );
}
