import * as React from 'react';
import {FaArrowLeft} from 'react-icons/lib/fa';

import styles from './styles/PrevPageLink.scss';

interface PrevPageLinkProps {
  onClick: () => any,
}

export default function PrevPageLink({onClick}: PrevPageLinkProps) {
  return (
    <div onClick={onClick} className={styles.container}>
      <FaArrowLeft className={styles.arrow} />
    </div>
  );
}
