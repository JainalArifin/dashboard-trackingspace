import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/room/action';
import MemberTableContainer from './MemberTableContainer';

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(MemberTableContainer);
