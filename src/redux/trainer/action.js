import { ACTIONS } from '../../constants';

export function getTrainerDetail(trainer) {
  return {
    type: ACTIONS.GET_TRAINER_DETAIL,
    trainer
  };
};