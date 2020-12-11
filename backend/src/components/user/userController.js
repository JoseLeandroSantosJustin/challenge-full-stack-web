const joi = require('joi');
const userDAL = require('./userDAL');
const User = require('./User');
const utils = require('./utils');

/**
 * @param {string} email 
 * @param {string} password 
 */
const createUser = (email, password) => {
  try {
    joi.assert(
      email,
      joi.string()
        .min(3)
        .max(255)
        .pattern(new RegExp('@{1}.*.'))
        .required()
    );
  
    joi.assert(
      password,
      joi.string()
        .min(6)
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  return new Promise((resolve, reject) => {
    const hasedPassword = utils.hashPassword(password);

    userDAL.createUser(email, hasedPassword).then((result) => {
      const user = new User(result.insertId, email, 'Password is hidden');

      resolve(user);
    }).catch((error) => {
      reject(error);
    });
  });
};

const readAllUsers = () => {
  return new Promise((resolve, reject) => {
    userDAL.readAllUsers().then((result) => {
      const users = [];

      result.forEach((user) => {
        users.push(
          new User(
            user.id,
            user.email,
            'Password is hidden'
          )
        );
      });

      resolve(users);
    }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * @param {number} id 
 */
const readUserById = (id) => {
  try {
    joi.assert(
      id,
      joi.number()
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  return new Promise((resolve, reject) => {
    userDAL.readUserById(id).then((result) => {
      if(result.length === 0) return resolve({});

      const user = new User(result[0].id, result[0].email, 'Password is hidden');

      resolve(user);
    }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * @param {number} id 
 * @param {string} email 
 * @param {string} password 
 */
const updateUserById = (id, email, password) => {
  try {
    joi.assert(
      id,
      joi.number()
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  if(utils.isValidField(email)) {
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
      throw new Error(error.details[0].message);
    }
  } else {
    email = undefined;
  }

  let hasedPassword = undefined;
  if(utils.isValidField(password)) {
    try {
      joi.assert(
        password,
        joi.string()
          .min(6)
          .required()
      );

      hasedPassword = utils.hashPassword(password);
    } catch (error) {
      throw new Error(error.details[0].message);
    }
  }

  return new Promise((resolve, reject) => {
    userDAL.updateUserById(id, email, hasedPassword).then((updateResult) => {
      if(updateResult.affectedRows === 0) return resolve({});

      userDAL.readUserById(id).then((readResult) => {
        const user = new User(id, readResult[0].email, 'Password is hidden');
  
        resolve(user);
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * @param {number} id 
 */
const deleteUserById = (id) => {
  try {
    joi.assert(
      id,
      joi.number()
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  return new Promise((resolve, reject) => {
    userDAL.readUserById(id).then((readResult) => {
      if(Object.keys(readResult).length === 0 && readResult.constructor === Object) return resolve({});

      userDAL.deleteUserById(id).then((deleteResult) => {
        if(deleteResult.affectedRows === 0) return resolve({});

        const user = new User(readResult[0].id, readResult[0].email, 'Password is hidden');

        resolve(user);
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

module.exports = {
  createUser,
  readAllUsers,
  readUserById,
  updateUserById,
  deleteUserById
}
