const sinon = require('sinon');
const MySQL = require('./MySQL');
const config = require('config');
const utils = require('./utils');

describe('Unit test database/utils', function() {
  describe('When creating connection', function() {
    describe('Should use mysql config variables from default.json', function() {
      it('Then invoke getPoolConnection with these varibles', function() {
        const mySQLMock = sinon.mock(MySQL);
        const mysqlConfig = config.get('mysql');
        const mySQLExpectation = mySQLMock.expects('getPoolConnection').withArgs(
          mysqlConfig.host,
          mysqlConfig.user,
          mysqlConfig.password,
          mysqlConfig.database
        );
        utils.getConnection();

        mySQLExpectation.verify();
        mySQLMock.restore();
      });
    });
  });
});
