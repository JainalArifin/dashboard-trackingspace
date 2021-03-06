import { connect } from 'react-redux';
import ClassroomFormContainer from './ClassroomFormContainer';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/classroom/action';

const mapStateToProps = state => {
  return {
    classroom: state.classroom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomFormContainer);
