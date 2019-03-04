import * as React from "react";

import {
  Card as CardType,
  DeckCard as DeckCardType,
  DeckBuildState as State
} from "../../../reducers/deckBuild/types";
import { HeroType } from "../../../types/hero";
import Header from "../Header";
import HeroFilter from "../HeroFilter";
import QueryFilter from "../QueryFilter";
import ManaCostFilter from "../ManaCostFilter";
import CardList from "../CardList";
import PrevPageLink from "../PrevPageLink";
import NextPageLink from "../NextPageLink";
import Deck from "../Deck";
import styles from "./index.scss";

interface Props {
  deckBuild: State;
  actions: {
    changeHero: (hero: HeroType, query: string) => any;
    syncQuery: (query: string) => any;
    searchCard: (hero: HeroType, query: string) => any;
    chooseManaCost: (hero: HeroType, query: string, manaCost: string) => any;
    clearManaCost: (hero: HeroType, query: string) => any;
    changePage: (
      hero: HeroType,
      query: string,
      manaCost: string,
      page: number
    ) => any;
    pickCard: (cardType: CardType) => any;
    unpickCard: (deckCardType: DeckCardType) => any;
    clearDeckCards: () => any;
  };
}

export default function Index(props: Props) {
  const {
    deckBuild: { hero, query, manaCost, cards, page, deck },
    actions: {
      changeHero,
      syncQuery,
      searchCard,
      chooseManaCost,
      clearManaCost,
      changePage,
      pickCard,
      unpickCard,
      clearDeckCards
    }
  } = props;

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.grid}>
        <div className={styles.filterContainer}>
          <HeroFilter hero={hero} onChange={hero => changeHero(hero, query)} />
          <QueryFilter
            query={query}
            onChange={syncQuery}
            searchCard={searchCard.bind(null, hero, query)}
          />
          <ManaCostFilter
            manaCost={manaCost}
            onClick={cost => {
              cost === manaCost
                ? clearManaCost(hero, query)
                : chooseManaCost(hero, query, cost);
            }}
          />
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.pageLinkContainer}>
            {page.prev && (
              <PrevPageLink
                onClick={() =>
                  changePage(hero, query, manaCost, page.prev || 0)
                }
              />
            )}
          </div>
          <CardList cards={cards} pickCard={pickCard} />
          <div className={styles.pageLinkContainer}>
            {page.next && (
              <NextPageLink
                onClick={() =>
                  changePage(hero, query, manaCost, page.next || 0)
                }
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
