import { ACTIONS } from '../../constants';

const videoClass = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.GET_VIDEO_CLASS_DETAIL:
      return action.videoClass;
    default:
      return state;
  }
}

export default videoClass;

