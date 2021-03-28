import { connect } from 'react-redux';
import TrainerFormContainer from './TrainerFormContainer';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/event/action';

const mapStateToProps = state => {
  return {
   trainer: state.trainer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainerFormContainer);
