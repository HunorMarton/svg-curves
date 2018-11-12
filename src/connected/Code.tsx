import { connect } from 'react-redux';
import { State } from '../state/reducers';
import { Code } from '../components/Code';

const mapStateToProps = (state: State) => ({
  width: state.canvas.svgWidth,
});

export default connect(mapStateToProps)(Code);
