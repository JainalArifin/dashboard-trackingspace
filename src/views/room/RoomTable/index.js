import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/room/action';
import RoomTableContainer from './RoomTableContainer';

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(RoomTableContainer);
