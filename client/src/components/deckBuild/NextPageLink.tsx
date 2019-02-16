import * as React from 'react';
import {FaArrowRight} from 'react-icons/lib/fa';

import styles from './styles/NextPageLink.scss';

interface NextPageLinkProps {
  onClick: () => any;
}

export default function NextPageLink({onClick}: NextPageLinkProps) {
  return (
    <div onClick={onClick} className={styles.container}>
      <FaArrowRight className={styles.arrow} />
    </div>
  );
}
