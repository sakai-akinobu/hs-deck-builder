import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {encode} from 'deckstrings';
import {FaClose, FaCopy} from 'react-icons/lib/fa';

import {DeckCard as DeckCardType} from '../../reducers/deckBuild/types';
import styles from './styles/EncodeString.scss';

interface EncodeStringProps {
  hero: string,
  deck: DeckCardType[],
};

interface EncodeStringState {
  isOpen: boolean,
};

const HERO_TO_DBF_ID_MAP = {
  DRUID: 274,
  HUNTER: 31,
  MAGE: 637,
  PALADIN: 671,
  PRIEST: 813,
  ROGUE: 930,
  SHAMAN: 1066,
  WARLOCK: 893,
  WARRIOR: 7,
};

export default class EncodeString extends React.Component<EncodeStringProps, EncodeStringState> {

  encodeStringRef: any;

  constructor(props: EncodeStringProps) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.encodeStringRef = React.createRef();
  }

  handleClickOpen = () => {
    this.setState({isOpen: true});
  }

  handleRequestClose = () => {
    this.setState({isOpen: false});
  }

  handleCopyEncodeString = () => {
    if (this.encodeStringRef.current) {
      this.encodeStringRef.current.select();
      document.execCommand('copy');
      this.setState({isOpen: false});
    }
  }

  render() {
    const {hero, deck} = this.props;
    const encodeString: string = encode({
      cards: deck.map<[number, number]>((deckCard) => [Number(deckCard.card.dbfId), deckCard.count]),
      heroes: [HERO_TO_DBF_ID_MAP[hero]],
      format: 2,
    });

    return (
      <div>
        {this.state.isOpen && (
          ReactDOM.createPortal((
            <div className={styles.backdrop}>
              <div className={styles.modal}>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <h2 className={styles.title}>デッキコード</h2>
                    <span className={styles.closeButton}>
                      <FaClose onClick={this.handleRequestClose} />
                    </span>
                  </div>
                  <div className={styles.body}>
                    <textarea value={encodeString} readOnly={true} className={styles.encodeString} ref={this.encodeStringRef} />
                  </div>
                  <div className={styles.footer}>
                    <div className={styles.content}>
                      <input type="button" value="コピー" onClick={this.handleCopyEncodeString} className={styles.copyButton} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ), window.document.body)
        )}
        <FaCopy onClick={this.handleClickOpen} className={styles.copyIcon} />
      </div>
    );
  }
}
