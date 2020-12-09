const database = require("../database");

const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const connection = database.getConnection();

    database.MySQL.execQuery(
      connection,
      'INSERT INTO user(email, password) VALUES(?, ?)',
      [email, password]
    ).then((result) => {
      database.MySQL.endConnection(connection);
      resolve(result);
    }).catch((error) => {
      database.MySQL.endConnection(connection);
      reject(error);
    });
  });
};

const readAllUsers = () => {
  return new Promise((resolve, reject) => {
    const connection = database.getConnection();

    database.MySQL.execQuery(
      connection,
      'SELECT * FROM user'
    ).then((result) => {
      database.MySQL.endConnection(connection);
      resolve(result);
    }).catch((error) => {
      database.MySQL.endConnection(connection);
      reject(error);
    });
  });
}

const readUserById = (id) => {
  return new Promise((resolve, reject) => {
    const connection = database.getConnection();

    database.MySQL.execQuery(
      connection,
      'SELECT * FROM user WHERE id = ?',
      [id]
    ).then((result) => {
      database.MySQL.endConnection(connection);
      resolve(result);
    }).catch((error) => {
      database.MySQL.endConnection(connection);
      reject(error);
    });
  });
}

const updateUserById = (id, email, password) => {
  return new Promise((resolve, reject) => {
    if(
      email === undefined &&
      password === undefined
    ) throw new Error('"updateUserById" - No parameters are valid');

    const connection = database.getConnection();
    let query = 'UPDATE user SET';
    let options = [];

    if (email !== undefined) {
      query += ' email = ?';
      options.push(email);
    }

    if (password !== undefined) {
      query += ' password = ?';
      options.push(password);
    }

    query += ' WHERE id = ?'
    options.push(id);
    database.MySQL.execQuery(
      connection,
      query,
      options
    ).then((result) => {
      database.MySQL.endConnection(connection);
      resolve(result);
    }).catch((error) => {
      database.MySQL.endConnection(connection);
      reject(error);
    });
  });
}

const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    const connection = database.getConnection();

    database.MySQL.execQuery(
      connection,
      'DELETE FROM user WHERE id = ?',
      [id]
    ).then((result) => {
      database.MySQL.endConnection(connection);
      resolve(result);
    }).catch((error) => {
      database.MySQL.endConnection(connection);
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
