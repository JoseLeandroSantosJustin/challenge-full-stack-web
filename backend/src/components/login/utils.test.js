const sinon = require('sinon');
const assert = require('chai').assert;
const bcrypt = require('bcrypt');
const utils = require('./utils');

describe('Unit test login/utils', function() {
  afterEach(function() {
    sinon.restore();
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
