export const errorHandler = {
  maxLength(max, type = 'string') {
    return `Maximum ${max} ${
      type === 'number' ? 'digit number' : 'characters'
    }`;
  },
  minLength(min, type = 'string') {
    return `Input at least ${min} ${
      type === 'number' ? 'digit' : 'characters'
    }`;
  },
  phoneNumberPrefix() {
    return 'Input your phone number prefix with 0 or +62';
  },
  internationalPhoneNumberPrefix() {
    return 'Input your phone number started with the country code, e.g. +62';
  },
  noZeroPrefix() {
    return '0 is not allowed as the prefix number';
  },
  plusSignOnlyAtFirst() {
    return 'Special characters is allowed only plus sign (+) as the prefix';
  },
  notOnlySpacePrefix() {
    return 'The contents of the field must not be just spaces';
  },
  noSpacePrefix() {
    return 'Spaces are not allowed at the beginning of words';
  },
  noSpace() {
    return 'Field can not contain space';
  },
  exactLength(length) {
    return `Input ${length} digit only`;
  },
  specialChar(specialChar = 'comma, period, and apostrophe') {
    return `Special characters are allowed only ${specialChar}`;
  },
  required(title) {
    return `${title} field is required`;
  },
  requiredFile() {
    return `Please upload required document or recheck your file size`;
  },
  invalid(title) {
    return `${title} field is invalid`;
  },
  maxSize(type, size) {
    return `Maximum upload ${type} size ${size} MB`;
  },
  timeFormat() {
    return `Time must be inputted in hh:mm:ss format`;
  },
  numberOnly() {
    return `Only numbers are allowed`;
  },
  email() {
    return `Email must be entered in example@xxx.xxx format`;
  },
  emailMinChar(min = 3) {
    return `At least ${min} characters are required before @xxx.xxx`;
  },
  validUrl() {
    return `This field must be entered in link format`;
  }
};

export const errorHandlerMultiple = {
  maxLength(title, max, type = 'string') {
    return `Maximum ${max} ${
      type === 'number' ? 'digit number ' : 'characters'
    } at ${title} field in line [idx]`;
  },
  minLength(title, min, type = 'string') {
    return `Input at least ${min} ${
      type === 'number' ? 'digit' : 'characters'
    } at ${title} field in line [idx]`;
  },
  phoneNumberPrefix() {
    return 'Phone Number field in line [idx] must be entered with prefix 0 or +62';
  },
  noSpacePrefix(title) {
    return `Starting word with spaces at ${title} field in line [idx] are not allowed`;
  },
  noSpace() {
    return 'Spaces are not allowed';
  },
  exactLength(length, title = '') {
    return `Input ${length} digit only at ${title} field in line [idx]`;
  },
  specialChar(specialChar = 'comma, period, and apostrophe', title = '') {
    return `Special characters are allowed at ${title} field in line [idx] only ${specialChar}`;
  },
  required(title) {
    return `${title} field in line [idx] is required`;
  },
  numberOnly(title) {
    return `Only numbers are allowed at ${title} field in line [idx]`;
  },
  email() {
    return `Email field at line [idx] must be entered in example@xxx.xxx format`;
  },
  emailMinChar(min = 3) {
    return `At least ${min} characters at Email field in line [idx] are required before @xxx.xxx`;
  },
  validUrl() {
    return `This field must be entered in link format`;
  }
};

export const placeholder = {
  shortText(label, command = 'Type') {
    if (label === '') {
      return `${command} here`;
    }
    return `${command} ${label} here`;
  },
  select(label) {
    return `Please select ${label}`;
  },
  longText(label, max) {
    return `You can type ${label} here (${max} characters maximum)`;
  },
  file(type, max) {
    return `Add ${type} (${max} MB maximum)`;
  }
};
