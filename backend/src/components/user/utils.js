const bcrypt = require('bcrypt');
const config = require('config');

/**
 * Checks if the field is not: undefined | null | an empty string | an object
 * @param {any} field 
 */
const isValidField = (field) => {
  if(
    field === undefined ||
    field === null ||
    field === '' ||
    field instanceof Object
  ) return false;

  return true;
}

/**
 * Hash a given password using bcrypt.hashSync
 * @param {string} password 
 */
const hashPassword = (password) => {
  return bcrypt.hashSync(
    password,
    config.get('bcrypt').salt
  );
}

module.exports = {
  isValidField,
  hashPassword
}
