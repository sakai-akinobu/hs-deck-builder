// @flow
import React from 'react';
import {Component} from 'react';

import type {DeckBuildState as State} from '../../reducers/deckBuild/types';
import CardList from './CardList';

export type IndexProps = {
  deckBuild: State,
  actions: {},
};

export default class Index extends Component<IndexProps> {
  render() {
    const {
      deckBuild: {
        cards,
      },
    } = this.props;

    return (
      <CardList cards={cards} />
    );
  }
}
