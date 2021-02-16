import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from 'src/redux/event/action';
import EventTableContainer from './EventTableContainer';

const mapDispatchToProps = dispatch => {
  return {
    mainActions: bindActionCreators(mainActions, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(EventTableContainer);
