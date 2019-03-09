import * as React from "react";
import { useState, useRef } from "react";
import { FaUpload } from "react-icons/lib/fa";

import Modal from "../Modal";
import styles from "./index.scss";

interface Props {
  onImport: (deckCode: string) => void;
}

export default function ImportButton(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const deckCodeRef = useRef<HTMLTextAreaElement>(null);

  const handleImport = () => {
    if (deckCodeRef.current !== null) {
      props.onImport(deckCodeRef.current.value);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Modal
        title="Import from deck code"
        body={
          <textarea
            placeholder="Paste the deck code here."
            className={styles.deckCode}
            ref={deckCodeRef}
          />
        }
        footer={
          <>
            <a
              className={styles.link}
              href="https://playhearthstone.com/en-us/blog/20720853/new-features-coming-to-hearthstone-5-16-2017"
            >
              What is this?
            </a>
            <input
              type="button"
              value="Import"
              onClick={handleImport}
              className={styles.importButton}
            />
          </>
        }
        open={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          Import deck code
          <FaUpload className={styles.importIcon} />
        </button>
      </div>
    </div>
  );
}
