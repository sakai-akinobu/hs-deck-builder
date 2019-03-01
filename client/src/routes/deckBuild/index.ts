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
  changePage,
  pickCard,
  unpickCard
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
      changePage: (hero: string, query: string, page: number) =>
        dispatch(changePage(hero, query, page) as any),
      pickCard: (card: Card) => dispatch(pickCard(card)),
      unpickCard: (deckCard: DeckCard) => dispatch(unpickCard(deckCard))
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
