import * as React from "react";

import styles from "./index.scss";
import { Heros, HeroType } from "../../../types/hero";

interface Props {
  hero: HeroType;
  onChange: (value: HeroType) => void;
}

export default function HeroFilter({ hero, onChange }: Props) {
  return (
    <div>
      <h3 className={styles.title}>Hero</h3>
      <select
        value={hero}
        onChange={e => onChange(e.target.value as HeroType)}
        className={styles.select}
      >
        {Heros.map((_hero, index) => (
          <option key={index} value={_hero}>
            {_hero}
          </option>
        ))}
      </select>
    </div>
  );
}
