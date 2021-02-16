import { object, string } from 'yup';

export default object({
  name: string()
    .max(50)
    .required('name is required'),
  type: string()
    .max(30)
    .required('type is required'),
  roomDetail: string()
    .max(255)
    .required('Room Detail is required')
});
