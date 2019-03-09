import * as React from "react";
import { FaUpload } from "react-icons/lib/fa";

import styles from "./index.scss";

export default function ImportButton() {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button}>
        Import deck code
        <FaUpload className={styles.importIcon} />
      </button>
    </div>
  );
}
