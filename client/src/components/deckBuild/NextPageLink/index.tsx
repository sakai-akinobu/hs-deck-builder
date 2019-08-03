import * as React from "react";
import { FaArrowRight } from "react-icons/fa";

import styles from "./index.scss";

interface Props {
  onClick: () => void;
}

export default function NextPageLink({ onClick }: Props) {
  return (
    <div onClick={onClick} className={styles.container}>
      <FaArrowRight className={styles.arrow} />
    </div>
  );
}
