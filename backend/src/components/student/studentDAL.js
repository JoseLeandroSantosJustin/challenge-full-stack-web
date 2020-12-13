const database = require('../database');

/**
 * @param {string} name 
 * @param {string} email 
 * @param {string} ra 
 * @param {string} cpf 
 */
const createStudent = (name, email, ra, cpf) => {
  return new Promise((resolve, reject) => {
    const connection = database.getConnection();

    database.MySQL.execQuery(
      connection,
      'INSERT INTO student(name, email, ra, cpf) VALUES(?, ?, ?, ?)',
      [name, email, ra, cpf]
    ).then((result) => {
      database.MySQL.endConnection(connection);
      resolve(result);
    }).catch((error) => {
      database.MySQL.endConnection(connection);
      reject(error);
    });
  });
};

const readAllStudents = () => {
  return new Promise((resolve, reject) => {
    const connection = database.getConnection();

    database.MySQL.execQuery(
      connection,
      'SELECT * FROM student'
    ).then((result) => {
      database.MySQL.endConnection(connection);
      resolve(result);
    }).catch((error) => {
      database.MySQL.endConnection(connection);
      reject(error);
    });
  });
};

/**
 * @param {number} id 
 */
const readStudentById = (id) => {
  return new Promise((resolve, reject) => {
    const connection = database.getConnection();

    database.MySQL.execQuery(
      connection,
      'SELECT * FROM student WHERE id = ?',
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

/**
 * @param {number} id 
 * @param {string} name 
 * @param {string} email 
 */
const updateStudentById = (id, name, email) => {
  return new Promise((resolve, reject) => {
    if(
      name === undefined &&
      email === undefined
    ) throw new Error('"updateStudentById" - No parameters are valid');

    const connection = database.getConnection();
    let query = 'UPDATE student SET';
    let options = [];

    if (name !== undefined) {
      query += ' name = ?';
      options.push(name);
    }

    if (email !== undefined) {
      if(name !== undefined) query += ',';
      query += ' email = ?';
      options.push(email);
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
};

/**
 * @param {number} id 
 */
const deleteStudentById = (id) => {
  return new Promise((resolve, reject) => {
    const connection = database.getConnection();

    database.MySQL.execQuery(
      connection,
      'DELETE FROM student WHERE id = ?',
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
  createStudent,
  readAllStudents,
  readStudentById,
  updateStudentById,
  deleteStudentById
}
