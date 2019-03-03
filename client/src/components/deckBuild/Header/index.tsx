import * as React from "react";
import { FaGithub } from "react-icons/lib/fa";

import styles from "./index.scss";

export default function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Hearthstone deck builder</h1>
      <nav className={styles.nav}>
        <a href="https://github.com/sakai-akinobu/hs-deck-builder">
          <FaGithub />
        </a>
      </nav>
    </header>
  );
}
