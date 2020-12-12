const joi = require('joi');
const { userService } = require('../user');
const util = require('./utils');
const loginService = require('./loginService');

/**
 * @param {string} email 
 * @param {string} password 
 */
const login = (email, password) => {
  try {
    joi.assert(
      email,
      joi.string()
        .min(3)
        .max(255)
        .pattern(new RegExp('@{1}.*\.'))
        .required()
    );
  
    joi.assert(
      password,
      joi.string()
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  return new Promise((resolve, reject) => {
    userService.readUserByEmail(email).then((result) => {
      if(
        Object.keys(result).length === 0 &&
        result.constructor === Object
      ) return resolve({ message: 'User not found' });

      if(!util.comparePasswordToHash(password, result._password))
        return resolve({ message: 'Password does not match' });

      const jwtToken = loginService.generateJWT();

      resolve({ 
        message: 'Authenticated',
        user: {
          _id: result._id,
          _email: result._email,
          _password: 'Password is hidden'
        },
        token: jwtToken
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

module.exports = {
  login
}
