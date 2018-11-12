import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, Action } from '../state/reducers';
import { PageArc } from '../components/PageArc';
import * as actions from '../state/ducks/arc/actions';

const mapStateToProps = (state: State) => state.arc;

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageArc);
