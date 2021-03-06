import * as React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";

import { Card as CardType } from "../../../ducks/deckBuild/types";
import styles from "./index.scss";

interface Props {
  card: CardType;
  onClick: () => void;
}

export default function Card({ card, onClick }: Props) {
  const [loaded, setLoaded] = useState(false);

  const imageUrl = `https://art.hearthstonejson.com/v1/render/latest/enUS/256x/${
    card.id
  }.png`;

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      setLoaded(true);
    };

    return () => {
      image.onload = null;
    };
  });

  return loaded ? (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
      onClick={onClick}
      className={styles.card}
    />
  ) : (
    <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
  );
}
