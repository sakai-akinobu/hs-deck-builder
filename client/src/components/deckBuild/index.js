// @flow
import React from 'react';
import {Component} from 'react';

import type {DeckBuildState as State} from '../../reducers/deckBuild/types';
import HeroFilter from './HeroFilter';
import SearchForm from './SearchForm';
import CardList from './CardList';

export type IndexProps = {
  deckBuild: State,
  actions: {
    syncHero: (string) => any,
    syncQuery: (string) => any,
    searchCard: (string) => any,
  },
};

export default class Index extends Component<IndexProps> {
  render() {
    const {
      deckBuild: {
        hero,
        query,
        cards,
      },
      actions: {
        syncHero,
        syncQuery,
        searchCard,
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
        <CardList cards={cards} />
      </div>
    );
  }
}
