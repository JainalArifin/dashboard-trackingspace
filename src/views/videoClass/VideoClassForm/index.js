import { connect } from 'react-redux';
import VideoClassFormContainer from './VideoClassFormContainer';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/videoClass/action';

const mapStateToProps = state => {
  return {
    videoClass: state.videoClass
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoClassFormContainer);
