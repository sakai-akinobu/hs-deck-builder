// @flow
import React from 'react';
import {Component} from 'react';

import type {
  Card as CardType,
  DeckBuildState as State,
} from '../../reducers/deckBuild/types';
import HeroFilter from './HeroFilter';
import SearchForm from './SearchForm';
import CardList from './CardList';
import PrevPageLink from './PrevPageLink';
import NextPageLink from './NextPageLink';
import Deck from './Deck';

export type IndexProps = {
  deckBuild: State,
  actions: {
    changeHero: (string, string) => any,
    syncQuery: (string) => any,
    searchCard: (string, string) => any,
    changePage: (string, string, number) => any,
    pickCard: (CardType) => any,
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
        {page.prev &&
          <PrevPageLink onClick={() => changePage(hero, query, page.prev || 0)} />
        }
        {page.next &&
          <NextPageLink onClick={() => changePage(hero, query, page.next || 0)} />
        }
        <CardList cards={cards} pickCard={pickCard} />
        <Deck deck={deck} />
      </div>
    );
  }
}
