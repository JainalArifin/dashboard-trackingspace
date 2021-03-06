import { ACTIONS } from '../../constants';

export function getClassroomDetail(classroom) {
  return {
    type: ACTIONS.GET_CLASSROOM,
    classroom
  };
};