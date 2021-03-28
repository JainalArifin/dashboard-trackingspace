import { object, string } from 'yup';
import { errorHandler } from 'src/utils/copywriting';

export default object({
  fullName: string()
    .max(50)
    .required('Fullname is required'),
  email: string()
    .email('Must be a valid email')
    .max(30)
    .required('Email is required'),
  detail: string()
    .max(1000)
    .required('Detail is required'),
  phoneNumber: string()
    .max(30)
    .required('Detail is required'),
  role: string()
    .max(30)
    .required('Role is required')
});
