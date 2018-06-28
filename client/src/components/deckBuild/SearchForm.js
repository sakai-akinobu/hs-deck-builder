// @flow
import React from 'react';

type SearchFormProps = {
  query: string,
  onChange: (string) => any,
  searchCard: () => any,
};

export default function Card(props: SearchFormProps) {
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
    />
  );
}
