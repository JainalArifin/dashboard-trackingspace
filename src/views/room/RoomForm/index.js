import { connect } from 'react-redux';
import RoomFormContainer from './RoomFormContainer';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/room/action';

const mapStateToProps = state => {
  return {
    room: state.room
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomFormContainer);
