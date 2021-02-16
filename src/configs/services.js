const services = {
  LOGIN_FORM: `/member/login`,
  // for trainer
  ADD_TRAINER: `/users`,
  GET_TRAINER: `/users`,
  DELETE_TRAINER: (id) => `/users/${id}`,
  EDIT_TRAINER: (id) => `/users/${id}`,
  GET_DETAIL_PARTNER: (id) => `/users/${id}`,

  // for event
  ADD_EVENT: `/event`,
  GET_EVENT: '/event',
  DELETE_EVENT: (id) => `/event/${id}`,
  GET_DETAIL_EVENT: (id) => `/event/${id}`,
  EDIT_EVENT: (id) => `/event/${id}`,
  
  // for room
  GET_ROOM: '/room',
  ADD_ROOM: '/room',
  DELETE_ROOM: (id) => `/room/${id}`,
  EDIT_ROOM: (id) => `/room/${id}`,
  
  // for member
  GET_MEMBER: '/member',
  
  // for video class
  GET_VIDEO_CLASS: '/videoclass',
  ADD_VIDEO_CLASS: '/videoclass',
  EDIT_VIDEO_CLASS: (id) => `/videoclass/${id}`,
  DELETE_VIDEO_CLASS: (id) => `/videoclass/${id}`,

};

export default services;
