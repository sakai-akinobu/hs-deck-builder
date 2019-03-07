import * as React from "react";
import { FaArrowLeft } from "react-icons/lib/fa";

import styles from "./index.scss";

interface Props {
  onClick: () => void;
}

export default function PrevPageLink({ onClick }: Props) {
  return (
    <div onClick={onClick} className={styles.container}>
      <FaArrowLeft className={styles.arrow} />
    </div>
  );
}
