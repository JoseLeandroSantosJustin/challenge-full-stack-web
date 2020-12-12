const sinon = require('sinon');
const User = require('./User');
const userController = require('./userController');
const express = require('express');
const app = express();
const userRouterAPI = require('./userAPI');
const bodyParser = require('body-parser');
const request = require('supertest');
const assert = require('chai').assert;

app.use(bodyParser.json());
app.use(userRouterAPI);

describe('Unit test user/userAPI', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When send a POST request to /users', function() {
    describe('Should invoke "userController" from userController', function() {
      describe('And use the body params to create the user', function(){
        describe('Then return the created user', function() {
          it('And status code 201 if works properly', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const createUserExpectation = 
              sinon.mock(userController).expects('createUser');

            createUserExpectation.withArgs(email, password)
              .resolves(new User(94, email, password));

            await request(app)
              .post('')
              .send({
                email: email,
                password: password})
              .expect(201)
              .then((result) => {
                createUserExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { _id: 94, _email: 'teste@teste.com', _password: '12345678' });
              });
          });
        });

        describe('Then return the error', function() {
          it('And status code 500 if "createUser" fails', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const createUserExpectation = 
              sinon.mock(userController).expects('createUser');

            createUserExpectation.withArgs(email, password)
              .rejects(new Error('Error caught'));

            await request(app)
              .post('')
              .send({
                email: email,
                password: password})
              .expect(500)
              .then((result) => {
                createUserExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { error: 'Error caught' });
              });
          });

          it('And status code 400 if resquest is bad', async function() {
            const email = 'teste@teste.com';
            const password = '12345678';

            const createUserExpectation = 
              sinon.mock(userController).expects('createUser');

            createUserExpectation.withArgs(email, password)
              .throws(new Error('Bad request'));

            await request(app)
              .post('')
              .send({
                email: email,
                password: password})
              .expect(400)
              .then((result) => {
                createUserExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { error: 'Bad request' });
              });
          });
        });
      });
    });
  });

  describe('When send a GET request to /users', function() {
    describe('Should invoke "readAllUsers" from userController', function() {
      describe('Then read and return all users from database', function(){
        it('If there is any', async function() {
          const readAllUsersExpectation = 
            sinon.mock(userController).expects('readAllUsers');

          readAllUsersExpectation.withArgs()
            .resolves([new User(94, 'teste@teste.com', '12345678')]);

          await request(app)
            .get('')
            .expect(200)
            .then((result) => {
              readAllUsersExpectation.verify();

              assert.deepEqual(
                result.body,
                [{ _id: 94, _email: 'teste@teste.com', _password: '12345678' }]);
            });
        });

        it('If there is none', async function() {
          const readAllUsersExpectation = 
            sinon.mock(userController).expects('readAllUsers');

          readAllUsersExpectation.withArgs()
            .resolves({});

          await request(app)
            .get('')
            .expect(204)
            .then((result) => {
              readAllUsersExpectation.verify();

              assert.deepEqual(
                result.body,
                '');
            });
        });
      });

      describe('Then return the error', function() {
        it('And status code 500 if "readAllUsers" fails', async function() {
          const readAllUsersExpectation = 
            sinon.mock(userController).expects('readAllUsers');

          readAllUsersExpectation.withArgs()
            .rejects(new Error('Error caught'));

          await request(app)
            .get('')
            .expect(500)
            .then((result) => {
              readAllUsersExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Error caught' });
            });
        });

        it('And status code 400 if resquest is bad', async function() {
          const readAllUsersExpectation = 
            sinon.mock(userController).expects('readAllUsers');

          readAllUsersExpectation.withArgs()
            .throws(new Error('Bad request'));

          await request(app)
            .get('')
            .expect(400)
            .then((result) => {
              readAllUsersExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
        });
      });
    });
  });

  describe('When send a GET request to /users/94', function() {
    describe('Should invoke "readUserById" from userController', function() {
      describe('Then read and return the user from database', function(){
        it('If it exists', async function() {
          const readUserByIdExpectation = 
            sinon.mock(userController).expects('readUserById');

          readUserByIdExpectation.withArgs('94')
            .resolves(new User(94, 'teste@teste.com', '12345678'));

          await request(app)
            .get('/94')
            .expect(200)
            .then((result) => {
              readUserByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { _id: 94, _email: 'teste@teste.com', _password: '12345678' });
            });
        });

        it('If there is none', async function() {
          const readUserByIdExpectation = 
            sinon.mock(userController).expects('readUserById');

          readUserByIdExpectation.withArgs('94')
            .resolves({});

          await request(app)
            .get('/94')
            .expect(204)
            .then((result) => {
              readUserByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                '');
            });
        });
      });

      describe('Then return the error', function() {
        it('And status code 500 if "readUserById" fails', async function() {
          const readUserByIdExpectation = 
            sinon.mock(userController).expects('readUserById');

          readUserByIdExpectation.withArgs('94')
            .rejects(new Error('Error caught'));

          await request(app)
            .get('/94')
            .expect(500)
            .then((result) => {
              readUserByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Error caught' });
            });
        });

        it('And status code 400 if resquest is bad', async function() {
          const readUserByIdExpectation = 
            sinon.mock(userController).expects('readUserById');

          readUserByIdExpectation.withArgs('94')
            .throws(new Error('Bad request'));

          await request(app)
            .get('/94')
            .expect(400)
            .then((result) => {
              readUserByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
        });
      });
    });
  });

  describe('When send a PUT request to /users/94', function() {
    describe('Should invoke "updateUserById" from userController', function() {
      describe('And use the body and the params', function(){
        describe('To update the user', function() {
          it('If it exists', async function() {
            const id = '94';
            const email = 'teste@teste.com';
            const password = '12345678';

            const updateUserByIdExpectation = 
              sinon.mock(userController).expects('updateUserById');

            updateUserByIdExpectation.withArgs(id, email, password)
              .resolves(new User(94, 'teste@teste.com', '12345678'));

            await request(app)
              .put('/94')
              .send({
                email: email,
                password: password
              })
              .expect(200)
              .then((result) => {
                updateUserByIdExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { _id: 94, _email: 'teste@teste.com', _password: '12345678' });
              });
          });

          it('If there is none', async function() {
            const id = '94';
            const email = 'teste@teste.com';
            const password = '12345678';

            const updateUserByIdExpectation = 
              sinon.mock(userController).expects('updateUserById');

            updateUserByIdExpectation.withArgs(id, email, password)
              .resolves({});

            await request(app)
              .put('/94')
              .send({
                email: email,
                password: password
              })
              .expect(204)
              .then((result) => {
                updateUserByIdExpectation.verify();

                assert.deepEqual(
                  result.body,
                  '');
              });
          });
        });
      });

      describe('Then return the error', function() {
        it('And status code 500 if "updateUserById" fails', async function() {
          const id = '94';
          const email = 'teste@teste.com';
          const password = '12345678';

          const updateUserByIdExpectation = 
            sinon.mock(userController).expects('updateUserById');

          updateUserByIdExpectation.withArgs(id, email, password)
            .rejects(new Error('Error caught'));

          await request(app)
            .put('/94')
            .send({
              email: email,
              password: password
            })
            .expect(500)
            .then((result) => {
              updateUserByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Error caught' });
            });
        });

        it('And status code 400 if resquest is bad', async function() {
          const id = '94';
          const email = 'teste@teste.com';
          const password = '12345678';

          const updateUserByIdExpectation = 
            sinon.mock(userController).expects('updateUserById');

          updateUserByIdExpectation.withArgs(id, email, password)
            .throws(new Error('Bad request'));

          await request(app)
            .put('/94')
            .expect(400)
            .send({
              email: email,
              password: password
            })
            .then((result) => {
              updateUserByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
        });
      });
    });
  });

  describe('When send a DELETE request to /users/94', function() {
    describe('Should invoke "deleteUserById" from userController', function() {
      describe('And use the params', function(){
        describe('To delete the user', function() {
          it('If it exists', async function() {
            const id = '94';

            const deleteUserByIdExpectation = 
              sinon.mock(userController).expects('deleteUserById');

            deleteUserByIdExpectation.withArgs(id)
              .resolves(new User(94, 'teste@teste.com', '12345678'));

            await request(app)
              .delete('/94')
              .expect(200)
              .then((result) => {
                deleteUserByIdExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { _id: 94, _email: 'teste@teste.com', _password: '12345678' });
              });
          });

          it('If there is none', async function() {
            const id = '94';

            const deleteUserByIdExpectation = 
              sinon.mock(userController).expects('deleteUserById');

            deleteUserByIdExpectation.withArgs(id)
              .resolves({});

            await request(app)
              .delete('/94')
              .expect(204)
              .then((result) => {
                deleteUserByIdExpectation.verify();

                assert.deepEqual(
                  result.body,
                  '');
              });
          });
        });
      });

      describe('Then return the error', function() {
        it('And status code 500 if "updateUserById" fails', async function() {
          const id = '94';

          const deleteUserByIdExpectation = 
            sinon.mock(userController).expects('deleteUserById');

          deleteUserByIdExpectation.withArgs(id)
            .rejects(new Error('Error caught'));

          await request(app)
            .delete('/94')
            .expect(500)
            .then((result) => {
              deleteUserByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Error caught' });
            });
        });

        it('And status code 400 if resquest is bad', async function() {
          const id = '94';

          const deleteUserByIdExpectation = 
            sinon.mock(userController).expects('deleteUserById');

          deleteUserByIdExpectation.withArgs(id)
            .throws(new Error('Bad request'));

          await request(app)
            .delete('/94')
            .expect(400)
            .then((result) => {
              updateUserByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
        });
      });
    });
  });
});


