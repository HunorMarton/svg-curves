import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, Action } from '../state/reducers';
import { PageQuadraticBezier } from '../components/PageQuadraticBezier';
import * as actions from '../state/ducks/quadraticBezier/actions';

const mapStateToProps = (state: State) => state.quadraticBezier;

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageQuadraticBezier);
