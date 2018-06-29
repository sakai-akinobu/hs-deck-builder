// @flow
import React from 'react';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';

import styles from './styles/PrevPageLink.scss';

type PrevPageLinkProps = {
  onClick: () => any,
};

export default function PrevPageLink({onClick}: PrevPageLinkProps) {
  return (
    <div onClick={onClick} className={styles.container}>
      <FaArrowLeft className={styles.arrow} />
    </div>
  );
}
