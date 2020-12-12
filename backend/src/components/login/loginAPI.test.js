const sinon = require('sinon');
const loginController = require('./loginController');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const loginAPI = require('./loginAPI');
const request = require('supertest');
const assert = require('chai').assert;

app.use(bodyParser.json());
app.use(loginAPI);

describe('Unit test login/loginAPI', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When send a POST request to /', function() {
    describe('Should invoke "login" from loginController', function() {
      describe('And use the body params to login the user', function(){
        describe('Then return', function() {
          it('Status code 200 if works properly', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const loginExpectation = 
              sinon.mock(loginController).expects('login');

            loginExpectation.withArgs(email, password)
              .resolves({ message: 'Any result' });

            await request(app)
              .post('')
              .send({
                email: email,
                password: password})
              .expect(200)
              .then((result) => {
                loginExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { message: 'Any result' });
              });
          });
        });

        describe('Then return the error', function() {
          it('And status code 500 if "createUser" fails', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const loginExpectation = 
              sinon.mock(loginController).expects('login');

            loginExpectation.withArgs(email, password)
              .rejects(new Error('Error caught'));

            await request(app)
              .post('')
              .send({
                email: email,
                password: password})
              .expect(500)
              .then((result) => {
                loginExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { error: 'Error caught' });
              });
          });

          it('And status code 400 if resquest is bad', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const loginExpectation = 
              sinon.mock(loginController).expects('login');

            loginExpectation.withArgs(email, password)
              .throws(new Error('Bad request'));

            await request(app)
              .post('')
              .send({
                email: email,
                password: password})
              .expect(400)
              .then((result) => {
                loginExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { error: 'Bad request' });
              });
          });
        });
      });
    });
  });
});