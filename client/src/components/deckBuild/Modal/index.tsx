import * as React from "react";
import * as ReactDOM from "react-dom";
import { FaClose } from "react-icons/lib/fa";

import styles from "./index.scss";

interface Props {
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  open: boolean;
  onRequestClose: () => void;
}

export default function Modal(props: Props) {
  if (!props.open) return null;
  return ReactDOM.createPortal(
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{props.title}</h2>
            <span className={styles.closeButton}>
              <FaClose onClick={props.onRequestClose} />
            </span>
          </div>
          <div className={styles.body}>{props.body}</div>
          <div className={styles.footer}>
            <div className={styles.content}>{props.footer}</div>
          </div>
        </div>
      </div>
    </div>,
    window.document.body
  );
}
