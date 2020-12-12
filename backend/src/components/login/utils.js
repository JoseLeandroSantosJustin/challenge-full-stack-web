const bcrypt = require('bcrypt');

/**
 * Compare the given password with the hash using bcrypt.compareSync
 * @param {string} password 
 * @param {string} hash 
 */
const comparePasswordToHash = (password, hash) => {
  return bcrypt.compareSync(
    password,
    hash
  );
}

module.exports = {
  comparePasswordToHash
}
