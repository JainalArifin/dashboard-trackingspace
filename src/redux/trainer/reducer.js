import { ACTIONS } from '../../constants';

const trainer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_TRAINER_DETAIL:
      return action.trainer;
    default:
      return state;
  }
}

export default trainer;

