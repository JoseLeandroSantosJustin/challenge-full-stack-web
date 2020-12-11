const assert = require('chai').assert;
const User = require('./User');
const userController = require('./userController');
const sinon = require('sinon');
const userDAL = require('./userDAL');
const utils = require('./utils');

describe('Unit test user/userController', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When involking "createUser"', function() {
    describe('Should thrown an error', function() {
      describe('If email', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            userController.createUser(0, '123456');
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userController.createUser(true, '123456');
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userController.createUser({}, '123456');
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userController.createUser([], '123456');
          }, Error, '"value" must be a string');
        });

        it('Is less than 3 characters', function() {
          assert.throws(() => {
            userController.createUser('@.', '123456');
          }, Error, '"value" length must be at least 3 characters long');
        });

        it('Is longer than 255 characters', function() {
          assert.throws(() => {
            userController.createUser(
              `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
              '123456'
            );
          }, Error, '"value" length must be less than or equal to 255 characters long');
        });

        it('Has no "@" and "."', function() {
          assert.throws(() => {
            userController.createUser(
              'teste',
              '123456'
            );
          }, Error, '"value" with value "teste" fails to match the required pattern: /@{1}.*./');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            userController.createUser(
              undefined,
              '123456'
            );
          }, Error, '"value" is required');
        });
      });

      describe('If password', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            userController.createUser('teste@teste.com', 0);
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userController.createUser('teste@teste.com', true);
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userController.createUser('teste@teste.com', {});
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userController.createUser('teste@teste.com', []);
          }, Error, '"value" must be a string');
        });

        it('Is less then 6 characters', function() {
          assert.throws(() => {
            userController.createUser(
              'teste@teste.com',
              '12345'
            );
          }, Error, '"value" length must be at least 6 characters long');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            userController.createUser(
              'teste@teste.com',
              undefined
            );
          }, Error, '"value" is required');
        });
      });
    });

    describe('Should invoke "createUser" from userDAL', function() {
      describe('With given email and hased password by "hashPassword" from utils', function() {
        describe('Then return the created user', function() {
          it('If works properly', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const hashPasswordExpectation = sinon.mock(utils).expects('hashPassword');
            hashPasswordExpectation.withArgs(password)
              .returns('hashedPassword');

            const createUserExpectation = sinon.mock(userDAL).expects('createUser');
            createUserExpectation.withArgs(email, 'hashedPassword')
              .resolves({ insertId: 94 });

            await userController.createUser(email, password).then((result) => {
              hashPasswordExpectation.verify();
              createUserExpectation.verify();
              assert.deepEqual(
                result,
                new User(94, email, 'Password is hidden')
              );
            });
          });

          it('If throws an error', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const hashPasswordExpectation = sinon.mock(utils).expects('hashPassword');
            hashPasswordExpectation.withArgs(password)
              .returns('hashedPassword');

            const createUserExpectation = sinon.mock(userDAL).expects('createUser');
            createUserExpectation.withArgs(email, 'hashedPassword')
              .rejects('Error caught');

            await userController.createUser(email, password).catch((error) => {
              hashPasswordExpectation.verify();
              createUserExpectation.verify();
              assert.equal(error, 'Error caught');
            });
          });
        });
      });
    });
  });

  describe('When involking "readAllUsers"', function() {
    describe('Should involke "readAllUsers" from userDAL', function() {
      describe('Then return all users', function() {
        it('If works properly', async function() {
          const readAllUsersExpectation = sinon.mock(userDAL).expects('readAllUsers');
          readAllUsersExpectation.withArgs()
            .resolves([
              { id: 94, email: 'teste@teste.com' },
              { id: 95, email: 'teste2@teste.com' }
            ]);

            await userController.readAllUsers().then((result) => {
              readAllUsersExpectation.verify();
              assert.deepEqual(
                result,
                [new User(94, 'teste@teste.com', 'Password is hidden'),
                new User(95, 'teste2@teste.com', 'Password is hidden')]
              );
            });
        });

        it('If throws an error', async function() {
          const readAllUsersExpectation = sinon.mock(userDAL).expects('readAllUsers');
          readAllUsersExpectation.withArgs()
            .rejects('Error caught');

            await userController.readAllUsers().catch((error) => {
              readAllUsersExpectation.verify();
              assert.equal(error, 'Error caught');
            });
        });
      });
    });
  });

  describe('When involking "readUserById"', function() {
    describe('Should thrown an error', function() {
      describe('If id', function() {
        it('Is not a number', function() {
          assert.throws(() => {
            userController.readUserById('A');
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.readUserById(true);
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.readUserById({});
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.readUserById([]);
          }, Error, '"value" must be a number');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            userController.readUserById(undefined);
          }, Error, '"value" is required');
        });
      });
    });

    describe('Should involke "readUserById" from userDAL', function() {
      describe('Then return an user', function() {
        it('If works properly', async function() {
          const id = 94;
          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .resolves([{ id: 94, email: 'teste@teste.com' }]);

          await userController.readUserById(id).then((result) => {
            readUserByIdExpectation.verify();
            assert.deepEqual(
              result,
              new User(94, 'teste@teste.com', 'Password is hidden')
            );
          });
        });

        it('If throws an error', async function() {
          const id = 94;
          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .rejects('Error caught');

          await userController.readUserById(id).catch((error) => {
            readUserByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });
  });
  
  describe('When involking "updateUserById"', function() {
    describe('Should thrown an error', function() {
      describe('If id', function() {
        it('Is not a number', function() {
          assert.throws(() => {
            userController.updateUserById(
              'A',
              'teste@teste.com',
              '12345678'
            );
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.updateUserById(
              true,
              'teste@teste.com',
              '12345678'
            );
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.updateUserById(
              {},
              'teste@teste.com',
              '12345678'
            );
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.updateUserById(
              [],
              'teste@teste.com',
              '12345678'
            );
          }, Error, '"value" must be a number');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            userController.updateUserById(
              undefined,
              'teste@teste.com',
              '12345678'
            );
          }, Error, '"value" is required');
        });
      });

      describe('If email is defined and', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            userController.updateUserById(
              94,
              94,
              '12345678'
            );
          }, Error, '"value" must be a string');
  
          assert.throws(() => {
            userController.updateUserById(
              94,
              true,
              '12345678'
            );
          }, Error, '"value" must be a string');
        });
  
        it('Is less than 3 characters', function() {
          assert.throws(() => {
            userController.updateUserById(
              94,
              '@.',
              '12345678'
            );
          }, Error, '"value" length must be at least 3 characters long');
        });
  
        it('Is longer than 255 characters', function() {
          assert.throws(() => {
            userController.updateUserById(
              94,
              `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
              '12345678'
            );
          }, Error, '"value" length must be less than or equal to 255 characters long');
        });
  
        it('Has no "@" and "."', function() {
          assert.throws(() => {
            userController.updateUserById(
              94,
              'teste',
              '12345678'
            );
          }, Error, '"value" with value "teste" fails to match the required pattern: /@{1}.*./');
        });
      });

      describe('If password is defined and', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            userController.updateUserById(
              94,
              'teste@teste.com',
              0
            );
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userController.updateUserById(
              94,
              'teste@teste.com',
              true
            );
          }, Error, '"value" must be a string');
        });

        it('Is less then 6 characters', function() {
          assert.throws(() => {
            userController.updateUserById(
              94,
              'teste@teste.com',
              '12345'
            );
          }, Error, '"value" length must be at least 6 characters long');
        });
      });
    });

    describe('Should involke "updateUserById" from userDAL', function() {
      it('If throws an error', async function() {
        const id = 94;
        const email = 'teste@teste.com';
        const password = '12345678';

        const hashPasswordExpectation = sinon.mock(utils).expects('hashPassword');
        hashPasswordExpectation.withArgs(password)
          .returns('hashedPassword');

        const createUserExpectation = sinon.mock(userDAL).expects('updateUserById');
        createUserExpectation.withArgs(id, email, 'hashedPassword')
          .rejects('Error caught');

        await userController.updateUserById(id, email, password).catch((error) => {
          hashPasswordExpectation.verify();
          createUserExpectation.verify();
          assert.equal(error, 'Error caught');
        });
      });

      describe('Then involke "readUserById" from userDAL', function() {
        it('If works properly without email defined', async function() {
          const id = 94;
          const email = [];
          const password = '12345678';
  
          const hashPasswordExpectation = sinon.mock(utils).expects('hashPassword');
          hashPasswordExpectation.withArgs(password)
            .returns('hashedPassword');
  
          const updateUserByIdExpectation = sinon.mock(userDAL).expects('updateUserById');
          updateUserByIdExpectation.withArgs(id, undefined, 'hashedPassword')
            .resolves();

          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .resolves([{ email: 'teste@teste.com'}]);
  
          await userController.updateUserById(id, email, password).then((result) => {
            hashPasswordExpectation.verify();
            updateUserByIdExpectation.verify();
            readUserByIdExpectation.verify();
            assert.deepEqual(
              result,
              new User(id, 'teste@teste.com', 'Password is hidden')
            );
          });
        });

        it('If works properly without password defined', async function() {
          const id = 94;
          const email = 'teste@teste.com';
  
          const updateUserByIdExpectation = sinon.mock(userDAL).expects('updateUserById');
          updateUserByIdExpectation.withArgs(id, email, undefined)
            .resolves();

          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .resolves([{ email: email}]);
  
          await userController.updateUserById(id, email).then((result) => {
            updateUserByIdExpectation.verify();
            readUserByIdExpectation.verify();
            assert.deepEqual(
              result,
              new User(id, 'teste@teste.com', 'Password is hidden')
            );
          });
        });

        it('If works properly with given email and password', async function() {
          const id = 94;
          const email = 'teste@teste.com';
          const password = '12345678';
  
          const hashPasswordExpectation = sinon.mock(utils).expects('hashPassword');
          hashPasswordExpectation.withArgs(password)
            .returns('hashedPassword');
  
          const updateUserByIdExpectation = sinon.mock(userDAL).expects('updateUserById');
          updateUserByIdExpectation.withArgs(id, email, 'hashedPassword')
            .resolves();

          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .resolves([{ email: email}]);
  
          await userController.updateUserById(id, email, password).then((result) => {
            hashPasswordExpectation.verify();
            updateUserByIdExpectation.verify();
            readUserByIdExpectation.verify();
            assert.deepEqual(
              result,
              new User(id, email, 'Password is hidden')
            );
          });
        });

        it('If throws an error', async function() {
          const id = 94;
          const email = 'teste@teste.com';
          const password = '12345678';
  
          const hashPasswordExpectation = sinon.mock(utils).expects('hashPassword');
          hashPasswordExpectation.withArgs(password)
            .returns('hashedPassword');
  
          const updateUserByIdExpectation = sinon.mock(userDAL).expects('updateUserById');
          updateUserByIdExpectation.withArgs(id, email, 'hashedPassword')
            .resolves();

          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .rejects('Error caught');
  
          await userController.updateUserById(id, email, password).catch((error) => {
            hashPasswordExpectation.verify();
            updateUserByIdExpectation.verify();
            readUserByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });
  });

  describe('When involking "deleteUserById"', function() {
    describe('Should thrown an error', function() {
      describe('If id', function() {
        it('Is not a number', function() {
          assert.throws(() => {
            userController.deleteUserById('A');
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.deleteUserById(true);
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.deleteUserById({});
          }, Error, '"value" must be a number');

          assert.throws(() => {
            userController.deleteUserById([]);
          }, Error, '"value" must be a number');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            userController.deleteUserById(undefined);
          }, Error, '"value" is required');
        });
      });
    });

    describe('Should involke "readUserById" from userDAL', function() {
      describe('And throws an error', function() {
        it('If throws an error', async function() {
          const id = 94;

          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .rejects('Error caught');

          await userController.deleteUserById(id).catch((error) => {
            readUserByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });

    describe('Should involke "deleteUserById" from userDAL', function() {
      describe('Then return the romved user', function() {
        it('If works properly', async function() {
          const id = 94;

          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .resolves([{ id: 94, email: 'teste@teste.com' }]);

          const deleteUserByIdExpectation = sinon.mock(userDAL).expects('deleteUserById');
          deleteUserByIdExpectation.withArgs(id)
            .resolves({ affectedRows: 1 });

          await userController.deleteUserById(id).then((result) => {
            readUserByIdExpectation.verify();
            deleteUserByIdExpectation.verify();
            assert.deepEqual(
              result,
              new User(id, 'teste@teste.com', 'Password is hidden')
            );
          });
        });

        it('if it works but dont remove', async function() {
          const id = 94;

          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .resolves([{ id: 94, email: 'teste@teste.com' }]);

          const deleteUserByIdExpectation = sinon.mock(userDAL).expects('deleteUserById');
          deleteUserByIdExpectation.withArgs(id)
            .resolves({ affectedRows: 0 });

          await userController.deleteUserById(id).catch((error) => {
            readUserByIdExpectation.verify();
            deleteUserByIdExpectation.verify();
            assert.deepEqual(error.message, 'Problems removing the user');
          });
        });

        it('If throws an error', async function() {
          const id = 94;

          const readUserByIdExpectation = sinon.mock(userDAL).expects('readUserById');
          readUserByIdExpectation.withArgs(id)
            .resolves([{ id: 94, email: 'teste@teste.com' }]);

          const deleteUserByIdExpectation = sinon.mock(userDAL).expects('deleteUserById');
          deleteUserByIdExpectation.withArgs(id)
            .rejects('Error caught');

          await userController.deleteUserById(id).catch((error) => {
            readUserByIdExpectation.verify();
            deleteUserByIdExpectation.verify();
            assert.equal(error, 'Error caught');
          });
        });
      });
    });
  });
});
