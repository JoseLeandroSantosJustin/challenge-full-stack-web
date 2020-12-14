const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

/**
 * Create a jwt using "sign" from jsonwebtoken
 * @returns {string} jwt token
 */
const generateJWT = () => {
  return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    },
    config.get('jwt').secret
  );
}

/**
 * Check a jwt using "verify" from jsonwebtoken
 * @param {string} jwtToken 
 * @returns {boolean} result of validation
 */
const isValidJWT = (jwtToken) => {
  try {
    jwt.verify(
      jwtToken,
      config.get('jwt').secret
    );

    return true
  } catch(err) {
    return false;
  }
}

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
  generateJWT,
  isValidJWT,
  comparePasswordToHash
  
}
