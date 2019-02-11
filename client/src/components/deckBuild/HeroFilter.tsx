import * as React from 'react';

import styles from './styles/HeroFilter.scss';

interface HeroFilterProps {
  hero: string,
  onChange: (value: string) => any,
}

const HEROS = [
  'DRUID',
  'HUNTER',
  'MAGE',
  'PALADIN',
  'PRIEST',
  'ROGUE',
  'SHAMAN',
  'WARLOCK',
  'WARRIOR',
];

export default function HeroFilter({hero, onChange}: HeroFilterProps) {
  return (
    <select value={hero} onChange={(e) => onChange(e.target.value)} className={styles.select}>
      {HEROS.map((_hero, index) => (
        <option key={index} value={_hero}>
          {_hero}
        </option>
      ))}
    </select>
  );
}
