const sinon = require('sinon');
const database = require('../database');
const studentDAL = require('./studentDAL');
const assert = require('chai').assert;

describe('Unit test student/studentDAL', function() {
  describe('When creating a new student', function() {
    describe('Should involke "execQuery" from MySQL', function() {
      describe('With connection, insert statement and given parameters', function() {
        describe('Then involke "endConnection" from MySQL', function() {
          describe('And then return "execQuery" result', function() {    
            it('If working properly', async function() {
              const name = 'teste';    
              const email = 'teste@teste.com';
              const ra = 'alu202000004';
              const cpf = '94949494949';
              
              sinon.stub(database, 'getConnection').returns('connection');
              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'INSERT INTO student(name, email, ra, cpf) VALUES(?, ?, ?, ?)',
                  [name, email, ra, cpf])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await studentDAL.createStudent(name, email, ra, cpf).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If then return "execQuery" throw an error', async function() { 
              const name = 'teste';    
              const email = 'teste@teste.com';
              const ra = 'alu202000004';
              const cpf = '94949494949';
              
              sinon.stub(database, 'getConnection').returns('connection');
              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'INSERT INTO student(name, email, ra, cpf) VALUES(?, ?, ?, ?)',
                  [name, email, ra, cpf])
                .rejects('Error caught');

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await studentDAL.createStudent(name, email, ra, cpf).catch((error) => {
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
    describe('All students', function() {
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
                    'SELECT * FROM student')
                  .resolves([{ student: 1 }, { student: 2 }])

                const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

                await studentDAL.readAllStudents().then((result) => {
                  sinon.restore();
                  execQueryExpectation.verify();
                  endConnectionExpectation.verify();
                  assert.deepEqual(result, [{ student: 1 }, { student: 2 }]);
                });
              });

              it('If "execQuery" throws an error', async function() {
                sinon.stub(database, 'getConnection').returns('connection');
                const mysqlMock = sinon.mock(database.MySQL);
                const execQueryExpectation = mysqlMock.expects('execQuery')
                  .withArgs(
                    'connection',
                    'SELECT * FROM student')
                  .rejects('Error caught');

                const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

                await studentDAL.readAllStudents().catch((error) => {
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

    describe('An especifc student', function() {
      describe('Should involke "execQuery" from MySQL', function() {
        describe('With connection, select statement and given parameters', function() {
          describe('Then involke "endConnection" from MySQL', function() {
            describe('And then return "execQuery" result', function() {
              describe('If reading by id', function() {
                it('And if working properly', async function() {          
                  const id = '94';
                  
                  sinon.stub(database, 'getConnection').returns('connection');
                  const mysqlMock = sinon.mock(database.MySQL);
                  const execQueryExpectation = mysqlMock.expects('execQuery')
                    .withArgs(
                      'connection',
                      'SELECT * FROM student WHERE id = ?',
                      [id])
                    .resolves([{ 
                      id: 94, 
                      email: 'teste@teste.com',
                      ra: 'alu202000001',
                      cpf: '94949494949'}]
                    );

                  const endConnectionExpectation = mysqlMock.expects('endConnection')
                    .withArgs('connection')
                    .returns();

                  await studentDAL.readStudentById(id).then((result) => {
                    sinon.restore();
                    execQueryExpectation.verify();
                    endConnectionExpectation.verify();
                    assert.deepEqual(
                      result,
                      [{ 
                        id: 94,
                        email: 'teste@teste.com',
                        ra: 'alu202000001',
                        cpf: '94949494949'
                      }]
                    );
                  });
                });

                it('And if "execQuery" throws an error', async function() {
                  const id = '94';
                  
                  sinon.stub(database, 'getConnection').returns('connection');
                  const mysqlMock = sinon.mock(database.MySQL);
                  const execQueryExpectation = mysqlMock.expects('execQuery')
                    .withArgs(
                      'connection',
                      'SELECT * FROM student WHERE id = ?',
                      [id])
                    .rejects('Error caught');

                  const endConnectionExpectation = mysqlMock.expects('endConnection')
                    .withArgs('connection')
                    .returns();

                  await studentDAL.readStudentById(id).catch((error) => {
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
  });

  describe('When updating an student', function() {
    describe('Should thrown an error', function() {
      it('If parameters name and email are undefined', async function() {
        await studentDAL.updateStudentById(1, undefined, undefined).catch((error) => {
          assert.deepEqual(error.message, '"updateStudentById" - No parameters are valid');
        });
      });
    });

    describe('Should invoke "execQuery" from MySQL', function() {
      describe('With connection, query and given parameters', function() {
        describe('Then involke "endConnection" from MySQL', function() {
          describe('And then return "execQuery" result', function() {
            it('If just name is defined', async function() {
              const id = 94;
              const name = 'teste';
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'UPDATE student SET name = ? WHERE id = ?',
                  [name, id])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await studentDAL.updateStudentById(id, name).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If just email is defined', async function() {
              const id = 94;
              const email = 'teste@teste.com';
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'UPDATE student SET email = ? WHERE id = ?',
                  [email, id])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await studentDAL.updateStudentById(id, undefined, email).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If name and email are defined', async function() {
              const id = 94;
              const name = 'teste';
              const email = 'teste@teste.com';
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'UPDATE student SET name = ?, email = ? WHERE id = ?',
                  [name, email, id])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await studentDAL.updateStudentById(id, name, email).then((result) => {
                sinon.restore();
                execQueryExpectation.verify();
                endConnectionExpectation.verify();
                assert.isTrue(result);
              });
            });

            it('If "execQuery" throws an error', async function() { 
              const id = 94;
              const name = 'teste';
              const email = 'teste@teste.com';
              sinon.stub(database, 'getConnection').returns('connection');

              const mysqlMock = sinon.mock(database.MySQL);
              const execQueryExpectation = mysqlMock.expects('execQuery')
                .withArgs(
                  'connection',
                  'UPDATE student SET name = ?, email = ? WHERE id = ?',
                  [name, email, id])
                .rejects('Error caught');

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                .withArgs('connection')
                .returns();

              await studentDAL.updateStudentById(id, name, email).catch((error) => {
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

  describe('When deleting an studen', function() {
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
                  'DELETE FROM student WHERE id = ?',
                  [id])
                .resolves(true);

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

              await studentDAL.deleteStudentById(id).then((result) => {
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
                  'DELETE FROM student WHERE id = ?',
                  [id])
                .rejects('Error caught');

              const endConnectionExpectation = mysqlMock.expects('endConnection')
                  .withArgs('connection')
                  .returns();

              await studentDAL.deleteStudentById(id).catch((error) => {
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
