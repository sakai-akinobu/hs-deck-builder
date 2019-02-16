import * as React from 'react';

import styles from './styles/HeroFilter.scss';
import {Heros, HeroType} from '../../types/hero';

interface HeroFilterProps {
  hero: HeroType,
  onChange: (value: HeroType) => any,
}

export default function HeroFilter({hero, onChange}: HeroFilterProps) {
  return (
    <select value={hero} onChange={(e) => onChange(e.target.value as HeroType)} className={styles.select}>
      {Heros.map((_hero, index) => (
        <option key={index} value={_hero}>
          {_hero}
        </option>
      ))}
    </select>
  );
}
