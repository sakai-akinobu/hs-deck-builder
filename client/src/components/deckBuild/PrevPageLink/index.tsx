import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

import styles from "./index.scss";

interface Props {
  onClick: () => void;
}

export default function PrevPageLink({ onClick }: Props) {
  return (
    <div onClick={onClick} className={styles.container}>
      <FontAwesomeIcon icon={faArrowLeft} className={styles.arrow} />
    </div>
  );
}
