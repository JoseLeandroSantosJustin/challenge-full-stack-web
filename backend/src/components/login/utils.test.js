const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const config = require('config');
const assert = require('chai').assert;
const bcrypt = require('bcrypt');
const utils = require('./utils');

describe('Unit test login/utils', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When involking "generateJWT"', function() {
    describe('Should involke "sign" from jsonwebtoken', function() {
      describe('With jwt.secret from config', function() {
        it('Then return the generated JWT token', function() {
          sinon.stub(Date, 'now').returns(0);

          const signExpectation = sinon.mock(jwt)
            .expects('sign')
            .withArgs(
              { exp: 3600 },
              config.get('jwt').secret)
            .returns('jsonWEBtoken');

          assert.equal(
            utils.generateJWT(),
            'jsonWEBtoken'
          );

          signExpectation.verify();
        });
      });
    });
  });

  describe('When involking "isValidJWT"', function() {
    describe('Should involke "verify" from jsonwebtoken', function() {
      describe('With the given jwtToken and jwt.secret from config', function() {
        describe('Then return the result', function() {
          it('If the validation is valid', function() {
            const jwtToken = 'jwtToken';
            const verifyExpectation = sinon.mock(jwt)
              .expects('verify')
              .withArgs(
                jwtToken,
                config.get('jwt').secret)
              .returns();

            assert.isTrue(
              utils.isValidJWT(jwtToken)
            );

            verifyExpectation.verify();
          });

          it('If the validation is not valid', function() {
            const jwtToken = 'jwtToken';
            const verifyExpectation = sinon.mock(jwt)
              .expects('verify')
              .withArgs(
                jwtToken,
                config.get('jwt').secret)
              .throws(new Error('Something with token does not match'));

            assert.isFalse(
              utils.isValidJWT(jwtToken)
            );

            verifyExpectation.verify();
          });
        });
      });
    });
  });

  describe('When involking "comparePasswordToHash"', function() {
    describe('Should involke "compareSync" from bcrypt', function() {
      describe('With given password and hash', function() {
        describe('Then return the "compareSync" result', function() {
          it('If the password and hash match', function() {
            const password = '12345678';
            const hash = 'hashedPassword';

            const compareSyncExpectation = sinon.mock(bcrypt)
              .expects('compareSync')
              .withArgs(
                password,
                hash)
              .returns(true);

            assert.isTrue(
              utils.comparePasswordToHash(
                password,
                hash
              )
            );

            compareSyncExpectation.verify();
          });

          it('If the password and hash does not match', function() {
            const password = '12345678';
            const hash = 'hashedPassword';

            const compareSyncExpectation = sinon.mock(bcrypt)
              .expects('compareSync')
              .withArgs(
                password,
                hash)
              .returns(false);

            assert.isFalse(
              utils.comparePasswordToHash(
                password,
                hash
              )
            );

            compareSyncExpectation.verify();
          });
        });
      });
    });
  });
});
