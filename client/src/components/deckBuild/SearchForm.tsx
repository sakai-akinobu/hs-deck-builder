import * as React from 'react';

import styles from './styles/SearchForm.scss';

interface SearchFormProps {
  query: string,
  onChange: (value: string) => any,
  searchCard: () => any,
}

export default class SearchForm extends React.Component<SearchFormProps> {

  handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
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
