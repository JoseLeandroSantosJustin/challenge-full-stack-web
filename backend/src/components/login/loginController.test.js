const sinon = require('sinon');
const loginController = require('./loginController');
const assert = require('chai').assert;
const { userService } = require('../user');
const utils = require('./utils');

describe('Unit test login/loginController', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When involking "login"', function() {
    describe('Should thrown an error', function() {
      describe('If email', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            loginController.login(0, '12345678');
          }, Error, '"value" must be a string');

          assert.throws(() => {
            loginController.login(true, '12345678');
          }, Error, '"value" must be a string');

          assert.throws(() => {
            loginController.login({}, '12345678');
          }, Error, '"value" must be a string');

          assert.throws(() => {
            loginController.login([], '12345678');
          }, Error, '"value" must be a string');
        });

        it('Is less than 3 characters', function() {
          assert.throws(() => {
            loginController.login('@.', '12345678');
          }, Error, '"value" length must be at least 3 characters long');
        });

        it('Is longer than 255 characters', function() {
          assert.throws(() => {
            loginController.login(
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
            loginController.login('teste', '12345678');
          }, Error, '"value" with value "teste" fails to match the required pattern: /@{1}.*./');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            loginController.login(undefined, '12345678');
          }, Error, '"value" is required');
        });
      });

      describe('If password', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            loginController.login('teste@teste.com', 0);
          }, Error, '"value" must be a string');

          assert.throws(() => {
            loginController.login('teste@teste.com', true);
          }, Error, '"value" must be a string');

          assert.throws(() => {
            loginController.login('teste@teste.com', {});
          }, Error, '"value" must be a string');

          assert.throws(() => {
            loginController.login('teste@teste.com', []);
          }, Error, '"value" must be a string');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            loginController.login('teste@teste.com', undefined);
          }, Error, '"value" is required');
        });
      });
    });

    describe('Should involke "readUserByEmail" from userService', function() {
      describe('With the given email and password', function() {
        describe('Then return a message', function() {
          it('If no user was found', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const readUserByEmailExpectation = sinon.mock(userService)
              .expects('readUserByEmail')
              .withArgs(email)
              .resolves({});

            await loginController.login(email, password).then((result) => {
              readUserByEmailExpectation.verify();

              assert.deepEqual(
                result,
                { message: 'User not found' }
              );
            });
          });

          it('If no password does not match', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const readUserByEmailExpectation = sinon.mock(userService)
              .expects('readUserByEmail')
              .withArgs(email)
              .resolves({ _password: 'hasedPassword' });

            const comparePasswordToHashExpectation = sinon.mock(utils)
              .expects('comparePasswordToHash')
              .withArgs(password, 'hasedPassword')
              .returns(false);

            await loginController.login(email, password).then((result) => {
              readUserByEmailExpectation.verify();
              comparePasswordToHashExpectation.verify();

              assert.deepEqual(
                result,
                { message: 'Password does not match' }
              );
            });
          });

          it('If works properly', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const readUserByEmailExpectation = sinon.mock(userService)
              .expects('readUserByEmail')
              .withArgs(email)
              .resolves({ 
                _id: 94,
                _email: 'teste@teste.com',
                _password: 'hasedPassword'
              });

            const utilsMock = sinon.mock(utils);

            const comparePasswordToHashExpectation = utilsMock
              .expects('comparePasswordToHash')
              .withArgs(password, 'hasedPassword')
              .returns(true);

            const generateJWTExpectation = utilsMock
              .expects('generateJWT')
              .withArgs()
              .returns('jwtToken');

            await loginController.login(email, password).then((result) => {
              readUserByEmailExpectation.verify();
              comparePasswordToHashExpectation.verify();
              generateJWTExpectation.verify();

              assert.deepEqual(
                result,
                {
                  message: 'Authenticated',
                  user: {
                    _id: 94,
                    _email: 'teste@teste.com',
                    _password: 'Password is hidden'
                  },
                  token: 'jwtToken'
                }
              );
            });
          });
        });

        describe('Then return the caught error', function() {
          it('If "readUserByEmail" fails', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const readUserByEmailExpectation = sinon.mock(userService)
              .expects('readUserByEmail')
              .withArgs(email)
              .rejects(new Error('Error caught'));

            await loginController.login(email, password).catch((error) => {
              readUserByEmailExpectation.verify();

              assert.deepEqual(
                error.message,
                'Error caught'
              );
            });
          });
        });
      });
    });
  });
});
