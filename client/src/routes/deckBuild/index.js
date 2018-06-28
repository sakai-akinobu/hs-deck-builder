// @flow
import {connect} from 'react-redux';
import type {Connector} from 'react-redux';

import type {State} from '../../types';
import type {Route} from '../../types/routes';
import Index from '../../components/deckBuild';
import type {IndexProps} from '../../components/deckBuild';

function loader() {
  return Promise.resolve();
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
