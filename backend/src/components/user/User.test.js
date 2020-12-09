const User = require('./User');

const assert = require('chai').assert;

describe('Unit test user/User', function() {
  describe('When instantiating an User', function() {
    describe('Should throw an error', function() {
      it('If id is empty', function() {
        assert.throws(() => {
          new User('', 'teste@teste.com', 'password');
        }, Error, 'User must have an id');
      });

      it('If id is null', function() {
        assert.throws(() => {
          new User(null, 'teste@teste.com', 'password');
        }, Error, 'User must have an id');
      });

      it('If id is undefined', function() {
        assert.throws(() => {
          new User(undefined, 'teste@teste.com', 'password');
        }, Error, 'User must have an id');
      });

      it('If id is an empty object', function() {
        assert.throws(() => {
          new User({}, 'teste@teste.com', 'password');
        }, Error, 'User must have an id');
      });

      it('If email is empty', function() {
        assert.throws(() => {
          new User(94, '', 'password');
        }, Error, 'User must have an email');
      });

      it('If email is null', function() {
        assert.throws(() => {
          new User(94, null, 'password');
        }, Error, 'User must have an email');
      });

      it('If email is undefined', function() {
        assert.throws(() => {
          new User(94, undefined, 'password');
        }, Error, 'User must have an email');
      });

      it('If password is empty', function() {
        assert.throws(() => {
          new User(94, 'teste@teste.com', '');
        }, Error, 'User must have a password');
      });

      it('If password is null', function() {
        assert.throws(() => {
          new User(94, 'teste@teste.com', null);
        }, Error, 'User must have a password');
      });

      it('If password is undefined', function() {
        assert.throws(() => {
          new User(94, 'teste@teste.com', undefined);
        }, Error, 'User must have a password');
      });
    });

    describe('Should return the given email', function() {
      it('If User was instatiated properly', function() {
        const email = 'teste@teste.com';
        const user = new User(94, email, 'password');

        assert.equal(user.email, email);
      });
    });

    describe('Should return the given password', function() {
      it('If User was instatiated properly', function() {
        const password = 'password';
        const user = new User(94, 'teste@teste.com', password);

        assert.equal(user.password, password);
      });
    });
  });
});
