import { ACTIONS } from '../../constants';

const event = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_EVENT_DETAIL:
      return action.event;
    default:
      return state;
  }
}

export default event;

