const config = require('config');
const MySQL = require('./MySQL');

const getConnection = () => {
  const mysqlConfig = config.get('mysql');

  return MySQL.getPoolConnection(
    mysqlConfig.host,
    mysqlConfig.user,
    mysqlConfig.password,
    mysqlConfig.database
  );
}

module.exports = {
  getConnection
}
