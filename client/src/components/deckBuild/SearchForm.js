// @flow
import React from 'react';

import styles from './styles/SearchForm.scss';

type SearchFormProps = {
  query: string,
  onChange: (string) => any,
  searchCard: () => any,
};

export default function SearchForm(props: SearchFormProps) {
  const {
    query,
    onChange,
    searchCard,
  } = props;
  return (
    <input
      value={query}
      onChange={(e) => onChange(e.target.value)}
      onBlur={searchCard}
      placeholder="検索"
      className={styles.input}
    />
  );
}
