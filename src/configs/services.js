const services = {
  LOGIN_FORM: `/member/login`,
  ADD_TRAINER: `/users`,
  GET_TRAINER: `/users`,
  DELETE_TRAINER: (id) => `/users/${id}`,
  EDIT_TRAINER: (id) => `/users/${id}`,
  GET_DETAIL_PARTNER: (id) => `/users/${id}`,
  GET_EVENT: '/event',
  DELETE_EVENT: (id) => `/event/${id}`,
};

export default services;
