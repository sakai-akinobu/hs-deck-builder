import * as React from "react";

import styles from "./index.scss";

interface SearchFormProps {
  query: string;
  onChange: (value: string) => any;
  searchCard: () => any;
}

export default function SearchForm(props: SearchFormProps) {
  const { query, onChange, searchCard } = props;

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchCard();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className={styles.title}>Query</h3>
      <input
        value={query}
        onChange={e => onChange(e.target.value)}
        placeholder="Query"
        className={styles.input}
      />
    </form>
  );
}
