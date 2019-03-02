import * as React from "react";

import {
  Card as CardType,
  DeckCard as DeckCardType,
  DeckBuildState as State
} from "../../../reducers/deckBuild/types";
import { HeroType } from "../../../types/hero";
import HeroFilter from "../HeroFilter";
import SearchForm from "../SearchForm";
import CardList from "../CardList";
import PrevPageLink from "../PrevPageLink";
import NextPageLink from "../NextPageLink";
import Deck from "../Deck";
import styles from "./index.scss";

export interface IndexProps {
  deckBuild: State;
  actions: {
    changeHero: (hero: HeroType, query: string) => any;
    syncQuery: (query: string) => any;
    searchCard: (hero: HeroType, query: string) => any;
    changePage: (hero: HeroType, query: string, page: number) => any;
    pickCard: (cardType: CardType) => any;
    unpickCard: (deckCardType: DeckCardType) => any;
    clearDeckCards: () => any;
  };
}

export default function Index(props: IndexProps) {
  const {
    deckBuild: { hero, query, cards, page, deck },
    actions: {
      changeHero,
      syncQuery,
      searchCard,
      changePage,
      pickCard,
      unpickCard,
      clearDeckCards
    }
  } = props;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.grid}>
        <div className={styles.filterContainer}>
          <HeroFilter hero={hero} onChange={hero => changeHero(hero, query)} />
          <SearchForm
            query={query}
            onChange={syncQuery}
            searchCard={searchCard.bind(null, hero, query)}
          />
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.pageLinkContainer}>
            {page.prev && (
              <PrevPageLink
                onClick={() => changePage(hero, query, page.prev || 0)}
              />
            )}
          </div>
          <CardList cards={cards} pickCard={pickCard} />
          <div className={styles.pageLinkContainer}>
            {page.next && (
              <NextPageLink
                onClick={() => changePage(hero, query, page.next || 0)}
              />
            )}
          </div>
        </div>
        <Deck
          hero={hero}
          deck={deck}
          clearDeckCards={clearDeckCards}
          unpickCard={unpickCard}
        />
      </div>
    </div>
  );
}
