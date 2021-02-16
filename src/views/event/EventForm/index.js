import { connect } from 'react-redux';
import EventFormContainer from './EventFormContainer';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/event/action';

const mapStateToProps = state => {
  return {
    event: state.event
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventFormContainer);
