// @flow
import React from 'react';

import styles from './styles/SearchForm.scss';

type SearchFormProps = {
  query: string,
  onChange: (string) => any,
  searchCard: () => any,
};

export default class SearchForm extends React.Component<SearchFormProps> {

  handleSubmit = (e: SyntheticEvent<>) => {
    e.preventDefault();
    this.props.searchCard();
  }

  render() {
    const {
      query,
      onChange,
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <input
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="検索"
          className={styles.input}
        />
      </form>
    );
  }

}
