import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State, Action } from '../state/reducers';
import { Canvas } from '../components/Canvas';
import * as actions from '../state/ducks/canvas/actions';

const mapStateToProps = (state: State) => ({
  svgWidth: state.canvas.svgWidth,
  svgHeight: state.canvas.svgHeight,
  viewBoxWidth: state.canvas.viewBoxWidth,
  viewBoxHeight: state.canvas.viewBoxHeight,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
