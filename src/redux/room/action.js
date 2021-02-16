import { ACTIONS } from '../../constants';

export function getRoomDetail(room) {
  return {
    type: ACTIONS.GET_ROOM_DETAIL,
    room
  };
};