import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/trainer/action';
import TrainerTableContainer from './TrainerTableContainer';

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(TrainerTableContainer);