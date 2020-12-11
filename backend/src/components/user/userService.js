const joi = require('joi')
const userDAL = require('./userDAL');
const User = require('./User');

/**
 * WARNING: This method returns the encrypted password
 * Use of the system only
 * @param {string} email 
 */
const readUserByEmail = (email) => {
  try {
    joi.assert(
      email,
      joi.string()
        .min(3)
        .max(255)
        .pattern(new RegExp('@{1}.*.'))
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message)
  }

  return new Promise((resolve, reject) => {
    userDAL.readUserByEmail(email).then((result) => {
      if(result.length === 0) {
        return resolve({});
      }

      resolve(
        new User(
          result[0].id,
          result[0].email,
          result[0].password
        )
      );
    }).catch((error) => {
      reject(error);
    });
  });
};

module.exports = {
  readUserByEmail
}
