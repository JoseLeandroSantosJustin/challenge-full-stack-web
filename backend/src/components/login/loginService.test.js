const sinon = require('sinon');
const utils = require('./utils');
const loginService = require('./loginService');
const assert = require('chai').assert;

describe('Unit test login/loginService', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When involking "authenticateRequest"', function() {
    describe('Should invoke next parameter', function() {
      it('If the given token pass in "isValidJWT" function', function() {
        const req = { get: () => { return 'Bearer JWT' }};
        const isValidJWTExpectation = sinon.mock(utils)
          .expects('isValidJWT')
          .withArgs('JWT')
          .returns(true);

        const next = sinon.spy();

        loginService.authenticateRequest(req, 'res', next);
        isValidJWTExpectation.verify();
        assert.isTrue(next.called);
      });
    });

    describe('Should set the end of the request', function() {
      it('If the given token does not pass in "isValidJWT" function', function() {
        const req = { get: () => { return 'Bearer JWT' }};
        const isValidJWTExpectation = sinon.mock(utils)
          .expects('isValidJWT')
          .withArgs('JWT')
          .returns(false);

        class Res {
          status(){}
          type(){}
          send(){}
          end(){}
        }

        const res = new Res();
        res.status();

        const resMock = sinon.mock(Res.prototype);
        const statusExpectation = resMock.expects('status')
          .withArgs(401)
          .returnsThis();

        const typeExpectation = resMock.expects('type')
          .withArgs('application/json')
          .returnsThis();

        const sendExpectation = resMock.expects('send')
          .withArgs({ error: 'Authentication token failed, try again with another' })
          .returnsThis();

        const endExpectation = resMock.expects('end')
          .withArgs()
          .returnsThis();

        loginService.authenticateRequest(req, res, 'next');
        isValidJWTExpectation.verify();
        statusExpectation.verify();
        typeExpectation.verify();
        sendExpectation.verify();
        endExpectation.verify();
      });
    });
  });
});
