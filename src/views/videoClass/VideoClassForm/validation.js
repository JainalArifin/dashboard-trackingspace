import { object, string } from 'yup';

export default object({
  title: string()
    .required('title is required'),
  videoLink: string()
    .required('Video Link is required')
});
