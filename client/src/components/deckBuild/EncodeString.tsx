import * as React from 'react';
import {useState, useRef} from 'react';
import * as ReactDOM from 'react-dom';
import {encode} from 'deckstrings';
import {FaClose, FaCopy} from 'react-icons/lib/fa';

import {DeckCard as DeckCardType} from '../../reducers/deckBuild/types';
import {HeroType, HeroToDbfIdMap} from '../../types/hero';
import styles from './styles/EncodeString.scss';

interface EncodeStringProps {
  hero: HeroType;
  deck: DeckCardType[];
}

export default function EncodeString(props: EncodeStringProps) {
  const [isOpen, setIsOpen] = useState(false);
  const encodeStringRef = useRef<HTMLTextAreaElement>(null);

  const {hero, deck} = props;
  const encodeString: string = encode({
    cards: deck.map<[number, number]>((deckCard) => [Number(deckCard.card.dbfId), deckCard.count]),
    heroes: [HeroToDbfIdMap[hero]],
    format: 2,
  });

  const handleCopyEncodeString = () => {
    if (encodeStringRef.current !== null) {
      encodeStringRef.current.select();
      document.execCommand('copy');
      setIsOpen(false);
    }
  };

  return (
    <div>
      {isOpen && (
        ReactDOM.createPortal((
          <div className={styles.backdrop}>
            <div className={styles.modal}>
              <div className={styles.content}>
                <div className={styles.header}>
                  <h2 className={styles.title}>デッキコード</h2>
                  <span className={styles.closeButton}>
                    <FaClose onClick={() => setIsOpen(false)} />
                  </span>
                </div>
                <div className={styles.body}>
                  <textarea value={encodeString} readOnly={true} className={styles.encodeString} ref={encodeStringRef} />
                </div>
                <div className={styles.footer}>
                  <div className={styles.content}>
                    <input type="button" value="コピー" onClick={handleCopyEncodeString} className={styles.copyButton} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ), window.document.body)
      )}
      <FaCopy onClick={() => setIsOpen(true)} className={styles.copyIcon} />
    </div>
  );
}
