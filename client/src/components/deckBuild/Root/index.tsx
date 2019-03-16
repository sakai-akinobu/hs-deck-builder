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
    changeHero: (hero: HeroType, query: string) => void;
    syncQuery: (query: string) => void;
    searchCard: (hero: HeroType, query: string) => void;
    chooseManaCost: (hero: HeroType, query: string, manaCost: string) => void;
    clearManaCost: (hero: HeroType, query: string) => void;
    changePage: (
      hero: HeroType,
      query: string,
      manaCost: string,
      page: number
    ) => void;
    pickCard: (cardType: CardType) => void;
    unpickCard: (deckCardType: DeckCardType) => void;
    clearDeckCards: () => void;
    importDeckCode: (deckCode: string) => void;
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
      clearDeckCards,
      importDeckCode
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
            {page.current > 1 ? (
              <PrevPageLink
                onClick={() =>
                  changePage(hero, query, manaCost, page.prev || 0)
                }
              />
            ) : null}
          </div>
          {cards.length > 0 ? (
            <CardList cards={cards} pickCard={pickCard} />
          ) : (
            <div className={styles.noResult}>There is no search result.</div>
          )}
          <div className={styles.pageLinkContainer}>
            {page.next < page.last ? (
              <NextPageLink
                onClick={() =>
                  changePage(hero, query, manaCost, page.next || 0)
                }
              />
            ) : null}
          </div>
        </div>
        <Deck
          hero={hero}
          deck={deck}
          clearDeckCards={clearDeckCards}
          unpickCard={unpickCard}
          importDeckCode={importDeckCode}
        />
      </div>
    </div>
  );
}
