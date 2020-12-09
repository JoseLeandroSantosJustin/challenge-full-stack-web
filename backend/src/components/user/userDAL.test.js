const sinon = require('sinon');
const database = require('../database');
const userDAL = require('./userDAL');
const assert = require('chai').assert;

describe('Unit testing user/UserDAL', function() {
  describe('When creating a new user', function() {
    describe('Should involke "execQuery" from MySQL', function() {
      describe('With connection, insert statement and given parameters', function() {
        describe('Then involke "endConnection" from MySQL', function() {
          describe('And then return "execQuery" result', async function() {    
            it('If working properly', async function() {          
              const email = 'teste@teste.com';
              const password = '12345678';
              
              sinon.stub(database, 'getConnection').returns('connection');
              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'INSERT INTO user(email, password) VALUES(?, ?)',
                  [email, password])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await userDAL.createUser(email, password).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If then return "execQuery" throw an error', async function() { 
              const email = 'teste@teste.com';
              const password = '12345678';
              
              sinon.stub(database, 'getConnection').returns('connection');
              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'INSERT INTO user(email, password) VALUES(?, ?)',
                  [email, password])
                .rejects('Error caught');

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await userDAL.createUser(email, password).catch((error) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.equal(error, 'Error caught');
              });
            });
          });
        });
      });
    })
  });

  describe('When reading', function() {
    describe('All users', function() {
      describe('Should invoke "execQuery" from MySQL', function() {
        describe('With connection and select statement', function() {
          describe('Then involke "endConnection" from MySQL', function() {
            describe('And then return "execQuery" result', function() {
              it('If working properly', async function() {
                sinon.stub(database, 'getConnection').returns('connection');
                const mysqlMock = sinon.mock(database.MySQL);
                const execQueryExpectation = mysqlMock.expects('execQuery')
                  .withArgs(
                    'connection',
                    'SELECT * FROM user')
                  .resolves([{ user: 1 }, { user: 2 }])

                const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

                await userDAL.readAllUsers().then((result) => {
                  sinon.restore();
                  execQueryExpectation.verify();
                  endConnectionExpectation.verify();
                  assert.deepEqual(result, [{ user: 1 }, { user: 2 }]);
                });
              });

              it('If "execQuery" throws an error', async function() {
                sinon.stub(database, 'getConnection').returns('connection');
                const mysqlMock = sinon.mock(database.MySQL);
                const execQueryExpectation = mysqlMock.expects('execQuery')
                  .withArgs(
                    'connection',
                    'SELECT * FROM user')
                  .rejects('Error caught');

                const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

                await userDAL.readAllUsers().catch((error) => {
                  sinon.restore();
                  execQueryExpectation.verify();
                  endConnectionExpectation.verify();
                  assert.equal(error, 'Error caught');
                });
              });
            });
          });
        });
      });
    });

    describe('An especifc user', function() {
      describe('Should involke "execQuery" from MySQL', function() {
        describe('With connection, select statement and given parameters', function() {
          describe('Then involke "endConnection" from MySQL', function() {
            describe('And then return "execQuery" result', function() {    
              it('If working properly', async function() {          
                const id = '123';
                
                sinon.stub(database, 'getConnection').returns('connection');
                const mysqlMock = sinon.mock(database.MySQL);
                const execQueryExpectation = mysqlMock.expects('execQuery')
                  .withArgs(
                    'connection',
                    'SELECT * FROM user WHERE id = ?',
                    [id])
                  .resolves([{ id: 123, email: 'teste@teste.com'}]);

                const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

                await userDAL.readUserById(id).then((result) => {
                  sinon.restore();
                  execQueryExpectation.verify();
                  endConnectionExpectation.verify();
                  assert.deepEqual(result, [{ id: 123, email: 'teste@teste.com'}]);
                });
              });

              it('If "execQuery" throws an error', async function() {
                const id = '123';
                
                sinon.stub(database, 'getConnection').returns('connection');
                const mysqlMock = sinon.mock(database.MySQL);
                const execQueryExpectation = mysqlMock.expects('execQuery')
                  .withArgs(
                    'connection',
                    'SELECT * FROM user WHERE id = ?',
                    [id])
                  .rejects('Error caught');

                const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

                await userDAL.readUserById(id).catch((error) => {
                  sinon.restore();
                  execQueryExpectation.verify();
                  endConnectionExpectation.verify();
                  assert.equal(error, 'Error caught');
                });
              });
            });
          });
        });
      });
    });
  });

  describe('When updating an user', function() {
    describe('Should thrown an error', function() {
      it('If parameters email and password are undefined', async function() {
        await userDAL.updateUserById(1, undefined, undefined).catch((error) => {
          assert.deepEqual(error.message, '"updateUserById" - No parameters are valid');
        });
      });
    });

    describe('Should invoke "execQuery" from MySQL', function() {
      describe('With connection, query and given parameters', function() {
        describe('Then involke "endConnection" from MySQL', function() {
          describe('And then return "execQuery" result', function() {
            it('If just email is defined', async function() {
              const id = 94;
              const email = 'teste@teste.com';
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'UPDATE user SET email = ? WHERE id = ?',
                  [email, id])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await userDAL.updateUserById(id, email).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If just password is defined', async function() {
              const id = 94;
              const password = '12345678';
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'UPDATE user SET password = ? WHERE id = ?',
                  [password, id])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await userDAL.updateUserById(id, undefined, password).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If email and password are defined', async function() {
              const id = 94;
              const email = 'teste@teste.com';
              const password = '12345678';
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'UPDATE user SET email = ? password = ? WHERE id = ?',
                  [email, password, id])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await userDAL.updateUserById(id, email, password).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If "execQuery" throws an error', async function() { 
              const id = 94;
              const email = 'teste@teste.com';
              const password = '12345678';
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'UPDATE user SET email = ? password = ? WHERE id = ?',
                  [email, password, id])
                .rejects('Error caught');

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await userDAL.updateUserById(id, email, password).catch((error) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.equal(error, 'Error caught');
              });
            });
          });
        });
      });
    });
  });

  describe('When deleting an user', function() {
    describe('Should invoke "execQuery" from MySQL', function() {
      describe('With connection, delete statement and parameters', function() {
        describe('Then involke "endConnection" from MySQL', function() {
          describe('And then return "execQuery" result', function() {
            it('If working properly', async function() {
              const id = 94;
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'DELETE FROM user WHERE id = ?',
                  [id])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

              await userDAL.deleteUserById(id).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If "execQuery" throws an error', async function() {
              const id = 94;
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'DELETE FROM user WHERE id = ?',
                  [id])
                .rejects('Error caught');

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

              await userDAL.deleteUserById(id).catch((error) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.equal(error, 'Error caught');
              });
            });
          });
        });
      });
    });
  });
});
