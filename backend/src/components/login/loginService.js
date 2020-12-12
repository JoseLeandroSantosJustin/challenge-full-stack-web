const jwt = require('jsonwebtoken');
const config = require('config');

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

module.exports = {
  generateJWT,
  isValidJWT
}
