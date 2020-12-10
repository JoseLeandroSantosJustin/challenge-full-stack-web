const assert = require('chai').assert;
const utils = require('./utils');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const config = require('config');

describe('Unit test user/utils', function() {
  describe('When involking "isValidField"', function() {
    describe('Should return false', function() {
      it('If the given parameter is undefined', function() {
        const field = undefined;

        assert.isFalse(utils.isValidField(field));
      });

      it('If the given parameter is null', function() {
        const field = null;

        assert.isFalse(utils.isValidField(field));
      });

      it('If the given parameter is an empty string', function() {
        const field = '';

        assert.isFalse(utils.isValidField(field));
      });

      it('If the given parameter is an object', function() {
        const field = {};

        assert.isFalse(utils.isValidField(field));
      });
    });

    describe('Should return true', function() {
      it('If is a boolean', function() {
        assert.isTrue(utils.isValidField(false));
        assert.isTrue(utils.isValidField(true));
      });

      it('If is a string', function() {
        assert.isTrue(utils.isValidField('Non empty string'));
      });

      it('If is a number', function() {
        assert.isTrue(utils.isValidField(0));
      });
    })
  });

  describe('When involking "hashPassword"', function() {
    describe('Should involke "hashSync" from bcrypt', function() {
      it('With given password And bcrypt.salt state of default config json', function() {
        const password = '12345678';
        const bcryptSpy = sinon.spy(bcrypt, 'hashSync')
          .withArgs(
          password,
          config.get('bcrypt').salt
        );

        utils.hashPassword(password);
        assert.isTrue(bcryptSpy.calledOnce);
      });
    });
  });
});
