// @flow
import React from 'react';
import {Component} from 'react';

import type {DeckBuildState as State} from '../../reducers/deckBuild/types';
import HeroFilter from './HeroFilter';
import SearchForm from './SearchForm';
import CardList from './CardList';
import PrevPageLink from './PrevPageLink';
import NextPageLink from './NextPageLink';

export type IndexProps = {
  deckBuild: State,
  actions: {
    syncHero: (string) => any,
    syncQuery: (string) => any,
    searchCard: (string) => any,
    changePage: (string, string, number) => any,
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
      },
      actions: {
        syncHero,
        syncQuery,
        searchCard,
        changePage,
      },
    } = this.props;

    return (
      <div>
        <HeroFilter
          hero={hero}
          onChange={syncHero}
        />
        <SearchForm
          query={query}
          onChange={syncQuery}
          searchCard={searchCard.bind(null, query)}
        />
        {page.prev &&
          <PrevPageLink onClick={() => changePage(hero, query, page.prev || 0)} />
        }
        {page.next &&
          <NextPageLink onClick={() => changePage(hero, query, page.next || 0)} />
        }
        <CardList cards={cards} />
      </div>
    );
  }
}
