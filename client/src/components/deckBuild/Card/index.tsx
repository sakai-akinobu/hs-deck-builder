import * as React from "react";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/lib/fa";

import { Card as CardType } from "../../../reducers/deckBuild/types";
import styles from "./index.scss";

interface CardProps {
  card: CardType;
  onClick: () => any;
}

export default function Card({ card, onClick }: CardProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${
      card.id
    }.png`;
    image.onload = () => {
      setLoaded(true);
    };
  });

  return loaded ? (
    <img
      src={`https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${
        card.id
      }.png`}
      onClick={onClick}
      className={styles.card}
    />
  ) : (
    <FaSpinner className={styles.spinner} />
  );
}
