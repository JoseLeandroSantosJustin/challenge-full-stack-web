const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const config = require('config');
const loginService = require('./loginService');
const assert = require('chai').assert;

describe('Unit test login/loginService', function() {
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
            loginService.generateJWT(),
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
              loginService.isValidJWT(jwtToken)
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
              loginService.isValidJWT(jwtToken)
            );

            verifyExpectation.verify();
          });
        });
      });
    });
  });
});
