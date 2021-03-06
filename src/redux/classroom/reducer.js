import { ACTIONS } from '../../constants';

const classroom = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_CLASSROOM:
      return action.classroom;
    default:
      return state;
  }
}

export default classroom;

