import * as React from 'react';

import styles from './styles/SearchForm.scss';

interface SearchFormProps {
  query: string;
  onChange: (value: string) => any;
  searchCard: () => any;
}

export default function SearchForm(props: SearchFormProps) {
  const {
    query,
    onChange,
    searchCard,
  } = props;

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchCard();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Keyword"
        className={styles.input}
      />
    </form>
  );
}
