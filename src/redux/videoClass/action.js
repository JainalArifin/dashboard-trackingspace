import { ACTIONS } from '../../constants';

export function getVideoClassDetail(videoClass) {
  return {
    type: ACTIONS.GET_VIDEO_CLASS_DETAIL,
    videoClass
  };
};