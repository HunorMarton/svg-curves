import { connect } from 'react-redux';
import { State } from '../state/reducers';
import { Drag } from '../components/Drag';

const mapStateToProps = (state: State) => ({
  zoom: state.canvas.zoom,
});

export default connect(mapStateToProps)(Drag);
