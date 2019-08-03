import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

import styles from "./index.scss";

export default function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Hearthstone deck builder</h1>
      <nav className={styles.nav}>
        <a href="https://github.com/sakai-akinobu/hs-deck-builder">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </nav>
    </header>
  );
}
