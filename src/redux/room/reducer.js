import { ACTIONS } from '../../constants';

const room = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_ROOM_DETAIL:
      return action.room;
    default:
      return state;
  }
}

export default room;

