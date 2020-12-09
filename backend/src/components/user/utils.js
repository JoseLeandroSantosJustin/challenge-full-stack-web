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

module.exports = {
  isValidField
}
