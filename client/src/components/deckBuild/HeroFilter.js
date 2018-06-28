// @flow
import React from 'react';

type HeroFilterProps = {
  hero: string,
  onChange: (string) => any,
};

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
    <select value={hero} onChange={(e) => onChange(e.target.value)}>
      {HEROS.map((_hero, index) => (
        <option key={index} value={_hero}>
          {_hero}
        </option>
      ))}
    </select>
  );
}
