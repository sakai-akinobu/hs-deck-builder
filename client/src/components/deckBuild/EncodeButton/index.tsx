import * as React from "react";
import { useState, useRef } from "react";
import { encode, FormatType, DeckList, DeckDefinition } from "deckstrings";
import { FaCopy } from "react-icons/lib/fa";

import { DeckCard as DeckCardType } from "../../../reducers/deckBuild/types";
import { HeroType, HeroToDbfIdMap } from "../../../types/hero";
import Modal from "../Modal";
import styles from "./index.scss";

interface Props {
  hero: HeroType;
  deck: DeckCardType[];
}

export default function EncodeButton(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const encodeStringRef = useRef<HTMLTextAreaElement>(null);

  const { hero, deck } = props;
  const cards: DeckList = deck.map<[number, number]>(deckCard => {
    return [Number(deckCard.card.dbfId), deckCard.count];
  });

  const deckDefinition: DeckDefinition = {
    cards: cards,
    heroes: [HeroToDbfIdMap[hero]],
    format: 2 as FormatType
  };
  const encodeString = encode(deckDefinition);

  const handleCopyEncodeString = () => {
    if (encodeStringRef.current !== null) {
      encodeStringRef.current.select();
      document.execCommand("copy");
      setIsOpen(false);
    }
  };

  return (
    <div>
      <Modal
        title="Deck code"
        body={
          <textarea
            value={encodeString}
            readOnly={true}
            className={styles.encodeString}
            ref={encodeStringRef}
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
              value="Copy"
              onClick={handleCopyEncodeString}
              className={styles.copyButton}
            />
          </>
        }
        open={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => setIsOpen(true)}>
          Create deck code
          <FaCopy className={styles.copyIcon} />
        </button>
      </div>
    </div>
  );
}
