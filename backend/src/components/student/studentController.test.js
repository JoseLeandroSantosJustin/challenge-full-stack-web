const sinon = require('sinon');
const assert = require('chai').assert;
const studentController = require('./studentController');
const cpfCheck = require('cpf-check');
const Student = require('./Student');
const studentDAL = require('./studentDAL');

describe('Unit test student/userController', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When involking "createStudent"', function() {
    describe('Should thrown an error', function() {
      describe('If RA', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              0,
              cpfCheck.generate()
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              true,
              cpfCheck.generate()
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              {},
              cpfCheck.generate()
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              [],
              cpfCheck.generate()
            );
          }, Error, '"value" must be a string');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              undefined,
              cpfCheck.generate()
            );
          }, Error, '"value" is required');
        });
      });

      describe('If CPF', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              'alu202000001',
              0
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              'alu202000001',
              true
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              'alu202000001',
              {}
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              'alu202000001',
              []
            );
          }, Error, '"value" must be a string');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              'alu202000001',
              undefined
            );
          }, Error, '"value" is required');
        });

        it('Is not valid', function() {
          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste@teste.com',
              'alu202000001',
              '94949494949'
            );
          }, Error, 'Invalid CPF');
        });
      });

      describe('If name', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            studentController.createStudent(
              0,
              'teste@teste.com',
              'alu202000001',
              cpfCheck.generate()
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.createStudent(
              true,
              'teste@teste.com',
              'alu202000001',
              cpfCheck.generate()
            );
          }, Error, '"value" must be a string');
        });
      });

      describe('If email', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            studentController.createStudent(
              'teste',
              0,
              'alu202000001',
              cpfCheck.generate()
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.createStudent(
              'teste',
              true,
              'alu202000001',
              cpfCheck.generate()
            );
          }, Error, '"value" must be a string');
        });

        it('Is less than 3 characters', function() {
          assert.throws(() => {
            studentController.createStudent(
              'teste',
              '@.',
              'alu202000001',
              cpfCheck.generate()
            );
          }, Error, '"value" length must be at least 3 characters long');
        });

        it('Is longer than 255 characters', function() {
          assert.throws(() => {
              studentController.createStudent(
                'teste',
                `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
                'alu202000001',
                cpfCheck.generate()
              );
          }, Error, '"value" length must be less than or equal to 255 characters long');
        });

        it('Has no "@" and "."', function() {
          assert.throws(() => {
            studentController.createStudent(
              'teste',
              'teste',
              'alu202000001',
              cpfCheck.generate()
            );
          }, Error, '"value" with value "teste" fails to match the required pattern: /@{1}.*./');
        });
      });
    });

    describe('Should invoke "createStudent" from studentDAL', function() {
      describe('With given parameters', function() {
        describe('Then return the created student', function() {
          it('If works properly just with name', async function() {
            const name = 'teste';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const createStudentExpectation = sinon.mock(studentDAL).expects('createStudent');
            createStudentExpectation.withArgs(name, '', ra, cpf)
              .resolves({ insertId: 94 });

            await studentController.createStudent(name, '', ra, cpf).then((result) => {
              createStudentExpectation.verify();
              assert.deepEqual(
                result,
                new Student(94, name, undefined, ra, cpf)
              );
            });
          });

          it('If works properly just with email', async function() {
            const email = 'teste@teste.com';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const createStudentExpectation = sinon.mock(studentDAL).expects('createStudent');
            createStudentExpectation.withArgs('', email, ra, cpf)
              .resolves({ insertId: 94 });

            await studentController.createStudent('', email, ra, cpf).then((result) => {
              createStudentExpectation.verify();
              assert.deepEqual(
                result,
                new Student(94, '', email, ra, cpf)
              );
            });
          });
          
          it('If works properly with name and email', async function() {
            const name = 'teste';
            const email = 'teste@teste.com';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const createStudentExpectation = sinon.mock(studentDAL).expects('createStudent');
            createStudentExpectation.withArgs(name, email, ra, cpf)
              .resolves({ insertId: 94 });

            await studentController.createStudent(name, email, ra, cpf).then((result) => {
              createStudentExpectation.verify();
              assert.deepEqual(
                result,
                new Student(94, name, email, ra, cpf)
              );
            });
          });

          it('If throws an error', async function() {
            const name = 'teste';
            const email = 'teste@teste.com';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const createStudentExpectation = sinon.mock(studentDAL).expects('createStudent');
            createStudentExpectation.withArgs(name, email, ra, cpf)
              .rejects('Error caught');

            await studentController.createStudent(name, email, ra, cpf).catch((error) => {
              createStudentExpectation.verify();
              assert.equal(error, 'Error caught');
            });
          });
        });
      });
    });
  });

  describe('When involking "readAllStudents"', function() {
    describe('Should involke "readAllStudents" from studentDAL', function() {
      describe('Then return all students', function() {
        it('If works properly', async function() {
          const cpf1 = cpfCheck.generate();
          const cpf2 = cpfCheck.generate();

          const readAllStudentsExpectation = sinon.mock(studentDAL).expects('readAllStudents');
          readAllStudentsExpectation.withArgs()
            .resolves([
              { id: 94, name: 'teste1', email: 'teste1@teste.com', ra: 'alu202000001', cpf: cpf1 },
              { id: 95, name: 'teste2', email: 'teste2@teste.com', ra: 'alu202000002', cpf: cpf2 }
            ]);

            await studentController.readAllStudents().then((result) => {
              readAllStudentsExpectation.verify();
              assert.deepEqual(
                result,
                [
                  new Student(94, 'teste1', 'teste1@teste.com', 'alu202000001', cpf1),
                  new Student(95, 'teste2', 'teste2@teste.com', 'alu202000002', cpf2)
                ]
              );
            });
        });

        it('If throws an error', async function() {
          const readAllStudentsExpectation = sinon.mock(studentDAL).expects('readAllStudents');
          readAllStudentsExpectation.withArgs()
            .rejects('Error caught');

            await studentController.readAllStudents().catch((error) => {
              readAllStudentsExpectation.verify();
              assert.equal(error, 'Error caught');
            });
        });
      });
    });
  });

  describe('When involking "readStudentById"', function() {
    describe('Should thrown an error', function() {
      describe('If id', function() {
        it('Is not a number', function() {
          assert.throws(() => {
            studentController.readStudentById('A');
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.readStudentById(true);
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.readStudentById({});
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.readStudentById([]);
          }, Error, '"value" must be a number');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            studentController.readStudentById(undefined);
          }, Error, '"value" is required');
        });
      });
    });

    describe('Should involke "readStudentById" from studentDAL', function() {
      describe('Then return a student', function() {
        it('If there is a student', async function() {
          const cpf = cpfCheck.generate();
          const id = 94;
          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([{ id: 94, name: 'teste1', email: 'teste1@teste.com', ra: 'alu202000001', cpf:cpf }]);

          await studentController.readStudentById(id).then((result) => {
            readStudentByIdExpectation.verify();
            assert.deepEqual(
              result,
              new Student(94, 'teste1', 'teste1@teste.com', 'alu202000001', cpf)
            );
          });
        });

        it('If there is no student', async function() {
          const id = 94;
          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([]);

          await studentController.readStudentById(id).then((result) => {
            readStudentByIdExpectation.verify();
            assert.deepEqual(
              result,
              {}
            );
          });
        });

        it('If throws an error', async function() {
          const id = 94;
          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .rejects('Error caught');

          await studentController.readStudentById(id).catch((error) => {
            readStudentByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });
  });
  
  describe('When involking "updateStudentById"', function() {
    describe('Should thrown an error', function() {
      describe('If id', function() {
        it('Is not a number', function() {
          assert.throws(() => {
            studentController.updateStudentById(
              'A',
              'teste',
              'teste@teste.com'
            );
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.updateStudentById(
              true,
              'teste',
              'teste@teste.com'
            );
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.updateStudentById(
              {},
              'teste',
              'teste@teste.com'
            );
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.updateStudentById(
              [],
              'teste',
              'teste@teste.com'
            );
          }, Error, '"value" must be a number');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            studentController.updateStudentById(
              undefined,
              'teste',
              'teste@teste.com'
            );
          }, Error, '"value" is required');
        });
      });

      describe('If name is defined and', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            studentController.updateStudentById(
              94,
              0,
              'teste@teste.com'
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.updateStudentById(
              94,
              true,
              'teste@teste.com'
            );
          }, Error, '"value" must be a string');
        });
      });

      describe('If email is defined and', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            studentController.updateStudentById(
              94,
              'teste',
              94
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            studentController.updateStudentById(
              94,
              'teste',
              true
            );
          }, Error, '"value" must be a string');
        });

        it('Is less than 3 characters', function() {
          assert.throws(() => {
            studentController.updateStudentById(
              94,
              'teste',
              '@.'
            );
          }, Error, '"value" length must be at least 3 characters long');
        });

        it('Is longer than 255 characters', function() {
          assert.throws(() => {
            studentController.updateStudentById(
              94,
              'teste',
              `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
            );
          }, Error, '"value" length must be less than or equal to 255 characters long');
        });

        it('Has no "@" and "."', function() {
          assert.throws(() => {
            studentController.updateStudentById(
              94,
              'teste',
              'teste'
            );
          }, Error, '"value" with value "teste" fails to match the required pattern: /@{1}.*./');
        });
      });
    });

    describe('Should involke "updateStudentById" from studentDAL', function() {
      describe('Then return', function() {
        it('Nothing if the is no student', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';

          const updateStudentByIdExpectation = sinon.mock(studentDAL).expects('updateStudentById');
          updateStudentByIdExpectation.withArgs(id, name, email)
            .resolves({ affectedRows: 0 });

          await studentController.updateStudentById(id, name, email).then((result) => {
            updateStudentByIdExpectation.verify();
            assert.deepEqual(result, {});
          });
        });

        it('An error if something goes wrong', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';
  
          const updateStudentByIdExpectation = sinon.mock(studentDAL).expects('updateStudentById');
          updateStudentByIdExpectation.withArgs(id, name, email)
            .rejects('Error caught');
  
          await studentController.updateStudentById(id, name, email).catch((error) => {
            updateStudentByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });

      describe('Then involke "readStudentById" from studentDAL', function() {
        it('If works properly without email defined', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';
          const ra = 'alu202000001';
          const cpf = cpfCheck.generate();
  
          const updateStudentByIdExpectation = sinon.mock(studentDAL).expects('updateStudentById');
          updateStudentByIdExpectation.withArgs(id, name, '')
            .resolves({ affectedRows: 1 });

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([{ 
              id: id,
              name: name,
              email: email,
              ra: ra,
              cpf: cpf
            }]);
  
          await studentController.updateStudentById(id, name, '').then((result) => {
            updateStudentByIdExpectation.verify();
            readStudentByIdExpectation.verify();
            assert.deepEqual(
              result,
              new Student(id, name, email, ra, cpf)
            );
          });
        });

        it('If works properly without name defined', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';
          const ra = 'alu202000001';
          const cpf = cpfCheck.generate();
  
          const updateStudentByIdExpectation = sinon.mock(studentDAL).expects('updateStudentById');
          updateStudentByIdExpectation.withArgs(id, '', email)
            .resolves({ affectedRows: 1 });

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([{ 
              id: id,
              name: name,
              email: email,
              ra: ra,
              cpf: cpf
            }]);
  
          await studentController.updateStudentById(id, '', email).then((result) => {
            updateStudentByIdExpectation.verify();
            readStudentByIdExpectation.verify();
            assert.deepEqual(
              result,
              new Student(id, name, email, ra, cpf)
            );
          });
        });

        it('If works properly with given name and email', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';
          const ra = 'alu202000001';
          const cpf = cpfCheck.generate();
  
          const updateStudentByIdExpectation = sinon.mock(studentDAL).expects('updateStudentById');
          updateStudentByIdExpectation.withArgs(id, name, email)
            .resolves({ affectedRows: 1 });

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([{ 
              id: id,
              name: name,
              email: email,
              ra: ra,
              cpf: cpf
            }]);
  
          await studentController.updateStudentById(id, name, email).then((result) => {
            updateStudentByIdExpectation.verify();
            readStudentByIdExpectation.verify();
            assert.deepEqual(
              result,
              new Student(id, name, email, ra, cpf)
            );
          });
        });

        it('If throws an error', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';
  
          const updateStudentByIdExpectation = sinon.mock(studentDAL).expects('updateStudentById');
          updateStudentByIdExpectation.withArgs(id, name, email)
            .resolves({ affectedRows: 1 });

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .rejects('Error caught');
  
          await studentController.updateStudentById(id, name, email).catch((error) => {
            updateStudentByIdExpectation.verify();
            readStudentByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });
  });

  describe('When involking "deleteStudentById"', function() {
    describe('Should thrown an error', function() {
      describe('If id', function() {
        it('Is not a number', function() {
          assert.throws(() => {
            studentController.deleteStudentById('A');
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.deleteStudentById(true);
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.deleteStudentById({});
          }, Error, '"value" must be a number');

          assert.throws(() => {
            studentController.deleteStudentById([]);
          }, Error, '"value" must be a number');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            studentController.deleteStudentById(undefined);
          }, Error, '"value" is required');
        });
      });
    });

    describe('Should involke "readStudentById" from studentDAL', function() {
      describe('And return an empty object', function() {
        it('If there is no user', async function() {
          const id = 94;

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves({});

          await studentController.deleteStudentById(id).then((result) => {
            assert.deepEqual(result, {});
          });
        });
      });

      describe('And throws an error', function() {
        it('If throws an error', async function() {
          const id = 94;

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .rejects('Error caught');

          await studentController.deleteStudentById(id).catch((error) => {
            readStudentByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });

    describe('Should involke "deleteStudentById" from studentDAL', function() {
      describe('And return an empty object', function() {
        it('If there is no user anymore', async function() {
          const id = 94;
          const cpf = cpfCheck.generate();

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([{ 
              id: 94, 
              name: 'teste',
              email: 'teste@teste.com',
              ra: 'alu202000001',
              cpf: cpf
            }]);

          const deleteStudentByIdExpectation = sinon.mock(studentDAL).expects('deleteStudentById');
          deleteStudentByIdExpectation.withArgs(id)
            .resolves({ affectedRows: 0 });

          await studentController.deleteStudentById(id).then((result) => {
            readStudentByIdExpectation.verify();
            deleteStudentByIdExpectation.verify();
            assert.deepEqual(result, {});
          });
        });
      });

      describe('Then return the removed student', function() {
        it('If works properly', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';
          const ra = 'alu202000001';
          const cpf = cpfCheck.generate();

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([{ 
              id: 94, 
              name: name,
              email: email,
              ra: ra,
              cpf: cpf
            }]);

          const deleteStudentByIdExpectation = sinon.mock(studentDAL).expects('deleteStudentById');
          deleteStudentByIdExpectation.withArgs(id)
            .resolves({ affectedRows: 1 });

          await studentController.deleteStudentById(id).then((result) => {
            readStudentByIdExpectation.verify();
            deleteStudentByIdExpectation.verify();
            assert.deepEqual(
              result,
              new Student(id, name, email, ra, cpf)
            );
          });
        });

        it('if it works but dont remove', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';
          const ra = 'alu202000001';
          const cpf = cpfCheck.generate();

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([{ 
              id: 94, 
              name: name,
              email: email,
              ra: ra,
              cpf: cpf
            }]);

          const deleteStudentByIdExpectation = sinon.mock(studentDAL).expects('deleteStudentById');
          deleteStudentByIdExpectation.withArgs(id)
            .resolves({ affectedRows: 0 });

          await studentController.deleteStudentById(id).then((result) => {
            readStudentByIdExpectation.verify();
            deleteStudentByIdExpectation.verify();
            assert.deepEqual(result, {});
          });
        });

        it('If throws an error', async function() {
          const id = 94;
          const name = 'teste';
          const email = 'teste@teste.com';
          const ra = 'alu202000001';
          const cpf = cpfCheck.generate();

          const readStudentByIdExpectation = sinon.mock(studentDAL).expects('readStudentById');
          readStudentByIdExpectation.withArgs(id)
            .resolves([{ 
              id: 94, 
              name: name,
              email: email,
              ra: ra,
              cpf: cpf
            }]);

          const deleteStudentByIdExpectation = sinon.mock(studentDAL).expects('deleteStudentById');
          deleteStudentByIdExpectation.withArgs(id)
            .rejects('Error caught');

          await studentController.deleteStudentById(id).catch((error) => {
            readStudentByIdExpectation.verify();
            deleteStudentByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });
  });
});
