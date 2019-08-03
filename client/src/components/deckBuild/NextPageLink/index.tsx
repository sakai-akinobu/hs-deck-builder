import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";

import styles from "./index.scss";

interface Props {
  onClick: () => void;
}

export default function NextPageLink({ onClick }: Props) {
  return (
    <div onClick={onClick} className={styles.container}>
      <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
    </div>
  );
}
