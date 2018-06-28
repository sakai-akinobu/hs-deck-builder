// @flow
import {connect} from 'react-redux';
import type {Connector} from 'react-redux';

import type {State} from '../../types';
import type {LoaderProps, Route} from '../../types/routes';
import {init} from '../../reducers/deckBuild';
import Index from '../../components/deckBuild';
import type {IndexProps} from '../../components/deckBuild';

function loader({store}: LoaderProps) {
  return init().then(store.dispatch);
}

const connector: Connector<{}, IndexProps> = connect(
  (state: State): $Shape<IndexProps> => ({
    deckBuild: state.deckBuild,
  }),
  (): $Shape<IndexProps> => ({
    actions: {},
  })
);

export default (): Route => ({
  component: connector(Index),
  loader,
});
