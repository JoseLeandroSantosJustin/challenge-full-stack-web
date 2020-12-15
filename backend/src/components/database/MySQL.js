const mysql = require('mysql');

// NOTICE: Other components depend on MySQL such as:
// user/userDAL.js
// student/studentDAL.js
class MySQL {
  /**
   * @param {string} host 
   * @param {string} port 
   * @param {string} user 
   * @param {string} password 
   * @param {string} database 
   * @returns {mysql.Pool}
   */
  static getPoolConnection(host, port, user, password, database) {
    return mysql.createPool({
      connectionLimit : 10,
      host: host,
      port: port,
      user: user,
      password: password,
      database: database
    });
  }

  /**
   * @param {mysql.Pool} connection 
   * @param {sting} query 
   * @param {array} options 
   * @returns {promise}
   */
  static execQuery(connection, query, options) {
    return new Promise((resolve, reject) => {
      connection.query(query, options, (err, result) => {
        if(err) reject(err);

        resolve(result);
      });
    });
  }

  /**
   * @param {mysql.Pool} connection 
   * @returns {void}
   */
  static endConnection(connection) {
    connection.end();
  }
}

module.exports = MySQL;
