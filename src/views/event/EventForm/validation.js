import { object, string } from 'yup';
import { errorHandler } from 'src/utils/copywriting';

export default object({
  title: string()
    .max(50)
    .required('title is required'),
  time: string()
    .max(30)
    .required('time is required'),
  eventDetail: string()
    .max(255)
    .required('Event Detail is required'),
  date: string().required(errorHandler.required('Date'))
});
