import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/videoClass/action';
import VideoClassTableContainer from './VideoClassTableContainer';

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(VideoClassTableContainer);
