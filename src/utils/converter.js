import base64url from 'base64url';

export function decodeToken(token) {
  if (!token) {
    return {};
  }

  return JSON.parse(base64url.decode(token.split('.')[1]));
};


export function objectToFormData(obj, form = new FormData(), namespace = '') {
  const fd = form;
  let formKey;

  for (const property in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, formKey);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
}
