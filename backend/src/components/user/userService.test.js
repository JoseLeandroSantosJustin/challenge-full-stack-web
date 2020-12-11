const sinon = require('sinon');
const assert = require('chai').assert;
const userService = require('./userService');
const userDAL = require('./userDAL');
const User = require('./User');

describe('Unit test user/userService', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When involking "readUserByEmail"', function(){
    describe('Should thrown an error', function() {
      describe('If email', function() {
        it('Is not a string', function() {
          assert.throws(() => {
            userService.readUserByEmail(0);
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userService.readUserByEmail(true);
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userService.readUserByEmail({});
          }, Error, '"value" must be a string');

          assert.throws(() => {
            userService.readUserByEmail([]);
          }, Error, '"value" must be a string');
        });

        it('Is less than 3 characters', function() {
          assert.throws(() => {
            userService.readUserByEmail('@.');
          }, Error, '"value" length must be at least 3 characters long');
        });

        it('Is longer than 255 characters', function() {
          assert.throws(() => {
            userService.readUserByEmail(
              `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`);
          }, Error, '"value" length must be less than or equal to 255 characters long');
        });

        it('Has no "@" and "."', function() {
          assert.throws(() => {
            userService.readUserByEmail('teste');
          }, Error, '"value" with value "teste" fails to match the required pattern: /@{1}.*./');
        });

        it('Is not defined', function() {
          assert.throws(() => {
            userService.readUserByEmail(undefined);
          }, Error, '"value" is required');
        });
      });
    });

    describe('Should invoke "readUserByEmail" from userDAL', function() {
      describe('With given email', function() {
        describe('Then return the user who matched', function() {
          it('If there is a user', async function() {
            const email = 'teste@teste.com';

            const createUserExpectation = sinon.mock(userDAL).expects('readUserByEmail');
            createUserExpectation.withArgs(email)
              .resolves([{ id: 94, email: email, password: 'hashedPassword' }]);

            await userService.readUserByEmail(email).then((result) => {
              createUserExpectation.verify();
              assert.deepEqual(
                result,
                new User(94, email, 'hashedPassword')
              );
            });
          });

          it('If there is no user', async function() {
            const email = 'teste@teste.com';

            const readUserByEmailExpectation = sinon.mock(userDAL).expects('readUserByEmail');
            readUserByEmailExpectation.withArgs(email)
              .resolves([]);

            await userService.readUserByEmail(email).then((result) => {
              readUserByEmailExpectation.verify();
              assert.deepEqual(
                result,
                {}
              );
            });
          });

          it('If throws an error', async function() {
            const email = 'teste@teste.com';

            const readUserByEmailExpectation = sinon.mock(userDAL).expects('readUserByEmail');
            readUserByEmailExpectation.withArgs(email)
              .rejects('Error caught');

            await userService.readUserByEmail(email).catch((error) => {
              readUserByEmailExpectation.verify();
              assert.equal(error, 'Error caught');
            });
          });
        });
      });
    });
  });
});
