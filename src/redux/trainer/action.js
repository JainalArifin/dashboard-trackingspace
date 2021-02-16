import { ACTIONS } from '../../constants';

export function getEventDetail(trainer) {
  return {
    type: ACTIONS.GET_TRAINER_DETAIL,
    trainer
  };
};