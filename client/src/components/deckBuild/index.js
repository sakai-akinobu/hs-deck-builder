// @flow
import React from 'react';
import {Component} from 'react';

import type {
  Card as CardType,
  DeckCard as DeckCardType,
  DeckBuildState as State,
} from '../../reducers/deckBuild/types';
import HeroFilter from './HeroFilter';
import SearchForm from './SearchForm';
import CardList from './CardList';
import PrevPageLink from './PrevPageLink';
import NextPageLink from './NextPageLink';
import Deck from './Deck';
import styles from './styles/index.scss';

export type IndexProps = {
  deckBuild: State,
  actions: {
    changeHero: (string, string) => any,
    syncQuery: (string) => any,
    searchCard: (string, string) => any,
    changePage: (string, string, number) => any,
    pickCard: (CardType) => any,
    unpickCard: (DeckCardType) => any,
  },
};

export default class Index extends Component<IndexProps> {
  render() {
    const {
      deckBuild: {
        hero,
        query,
        cards,
        page,
        deck,
      },
      actions: {
        changeHero,
        syncQuery,
        searchCard,
        changePage,
        pickCard,
        unpickCard,
      },
    } = this.props;

    return (
      <div>
        <HeroFilter
          hero={hero}
          onChange={(hero) => changeHero(hero, query)}
        />
        <SearchForm
          query={query}
          onChange={syncQuery}
          searchCard={searchCard.bind(null, hero, query)}
        />
        <div className={styles.cardDeckContainer}>
          <div className={styles.pageLinkContainer}>
            {page.prev &&
              <PrevPageLink onClick={() => changePage(hero, query, page.prev || 0)} />
            }
          </div>
          <CardList cards={cards} pickCard={pickCard} />
          <div className={styles.pageLinkContainer}>
            {page.next &&
              <NextPageLink onClick={() => changePage(hero, query, page.next || 0)} />
            }
          </div>
          <Deck hero={hero} deck={deck} unpickCard={unpickCard} />
        </div>
      </div>
    );
  }
}
