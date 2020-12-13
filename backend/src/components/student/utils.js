/**
 * Checks if the field is not: undefined | null | an empty string | 
 * an object | an array
 * @param {any} field 
 */
const isValidField = (field) => {
  if(
    field === undefined ||
    field === null ||
    field === '' ||
    field instanceof Object ||
    Array.isArray(field)
  ) return false;

  return true;
}

module.exports = {
  isValidField
}
