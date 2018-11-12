import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, Action } from '../state/reducers';
import { PageCubicBezier } from '../components/PageCubicBezier';
import * as actions from '../state/ducks/cubicBezier/actions';

const mapStateToProps = (state: State) => state.cubicBezier;

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageCubicBezier);
