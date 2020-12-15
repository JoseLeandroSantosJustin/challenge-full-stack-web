const sinon = require('sinon');
const assert = require('chai').assert;
const mysql = require('mysql');
const MySQL = require('./MySQL');

describe('Unit test database/MySQL', function() {
  describe('When invoking "getPoolConnection"', function() {
    describe('Should use given parameters to involke "createPool"', function() {
      it('Then return the created connection', function() {
        const host = 'host';
        const port = 'port';
        const user = 'user';
        const password = 'password';
        const database = 'database';
        const result = { connection: true };

        const mysqlMock = sinon.mock(mysql);
        const mysqlMockExpectation = mysqlMock.expects('createPool');
        mysqlMockExpectation.withArgs({
          connectionLimit : 10,
          host: host,
          port: port,
          user: user,
          password: password,
          database: database
        });
        mysqlMockExpectation.returns(result);

        assert.equal(
          MySQL.getPoolConnection(host, port, user, password, database),
          result
        );

        mysqlMock.verify();
      });
    });
  });

  it('The "execQuery" unit test was no possible', function() {
    this.skip();
  });

  describe('When involking "endConnection"', function() {
    describe('Should involke "end" method of the given parameter', function() {
      it('Then close the given connection', function() {
        const connection = { end: () => {} }
        const connectionSpy = sinon.spy(connection, 'end');
        
        MySQL.endConnection(connection);
        assert.isTrue(connectionSpy.calledOnce);
        connectionSpy.restore();
      });
    });
  });
});
