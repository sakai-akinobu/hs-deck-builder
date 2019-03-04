import * as React from "react";
import { FaArrowRight } from "react-icons/lib/fa";

import styles from "./index.scss";

interface Props {
  onClick: () => any;
}

export default function NextPageLink({ onClick }: Props) {
  return (
    <div onClick={onClick} className={styles.container}>
      <FaArrowRight className={styles.arrow} />
    </div>
  );
}
