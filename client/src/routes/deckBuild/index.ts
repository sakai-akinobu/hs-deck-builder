import { Dispatch } from "redux";
import { connect } from "react-redux";

import { State } from "../../types";
import { LoaderProps, Route } from "../../types/routes";
import { init } from "../../reducers/deckBuild";
import { Card, DeckCard } from "../../reducers/deckBuild/types";
import Root from "../../components/deckBuild/Root";

import {
  changeHero,
  syncQuery,
  searchCard,
  chooseManaCost,
  clearManaCost,
  changePage,
  pickCard,
  unpickCard,
  clearDeckCards
} from "../../reducers/deckBuild";

function loader({ store }: LoaderProps) {
  return init().then(store.dispatch);
}

function mapStateToProps(state: State) {
  return {
    deckBuild: state.deckBuild
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      changeHero: (hero: string, query: string) =>
        dispatch(changeHero(hero, query) as any),
      syncQuery: (query: string) => dispatch(syncQuery(query)),
      searchCard: (hero: string, query: string) =>
        dispatch(searchCard(hero, query) as any),
      chooseManaCost: (hero: string, query: string, manaCost: string) =>
        dispatch(chooseManaCost(hero, query, manaCost) as any),
      clearManaCost: (hero: string, query: string) =>
        dispatch(clearManaCost(hero, query) as any),
      changePage: (
        hero: string,
        query: string,
        manaCost: string,
        page: number
      ) => dispatch(changePage(hero, query, manaCost, page) as any),
      pickCard: (card: Card) => dispatch(pickCard(card)),
      unpickCard: (deckCard: DeckCard) => dispatch(unpickCard(deckCard)),
      clearDeckCards: () => dispatch(clearDeckCards())
    }
  };
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default (): Route => ({
  component: connector(Root),
  loader
});
