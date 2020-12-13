const assert = require('chai').assert;
const utils = require('./utils');

describe('Unit test student/utils', function() {
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

      it('If the given parameter is an array', function() {
        const field = [];

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
});
