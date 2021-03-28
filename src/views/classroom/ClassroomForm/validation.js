import { object, string } from 'yup';

export default object({
  title: string()
    .max(50)
    .required('title is required'),
  classRequirement: string()
    .max(300)
    .required('class requirment is required'),
  type: string()
    .max(30)
    .required('type is required'),
  category: string()
    .required('category is required')
});
