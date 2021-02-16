import { ACTIONS } from '../../constants';

export function getEventDetail(event) {
  return {
    type: ACTIONS.GET_EVENT_DETAIL,
    event
  };
};