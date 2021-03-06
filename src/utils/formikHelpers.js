import { getIn } from 'formik';

// berisi function2 helpers formik yang reusable

export default function formikHelpers(errors, touched) {
  const isError = name => getIn(errors, name) && getIn(touched, name);

  const errorMessage = title => getIn(errors, title);

  return { isError, errorMessage };
}
