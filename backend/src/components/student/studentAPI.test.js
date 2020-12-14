const sinon = require('sinon');
const cpfCheck = require('cpf-check');
const Student = require('./Student');
const studentController = require('./studentController');
const express = require('express');
const app = express();
const studentAPI = require('./studentAPI');
const bodyParser = require('body-parser');
const request = require('supertest');
const assert = require('chai').assert;

app.use(bodyParser.json());
app.use(studentAPI);

describe('Unit test student/studentAPI', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When send a POST request to /', function() {
    describe('Should invoke "createStudent" from studentController', function() {
      describe('And use the body params to create the student', function(){
        describe('Then return the created student', function() {
          it('And status code 201 if works properly', async function() {
            const name = 'teste';
            const email = 'teste@teste.com';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const createStudentExpectation = sinon.mock(studentController)
              .expects('createStudent')
              .withArgs(name, email, ra, cpf)
              .resolves(new Student(94, name, email, ra, cpf));

            await request(app)
              .post('')
              .send({
                name: name,
                email: email,
                ra: ra,
                cpf: cpf})
              .expect(201)
              .then((result) => {
                createStudentExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { _id: 94, 
                    _name: name,
                    _email: email,
                    _ra: ra,
                    _cpf: cpf
                  });
              });
          });
        });

        describe('Then return the error', function() {
          it('And status code 500 if "createUser" fails', async function() {
            const name = 'teste';
            const email = 'teste@teste.com';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const createStudentExpectation = sinon.mock(studentController)
              .expects('createStudent')
              .withArgs(name, email, ra, cpf)
              .rejects(new Error('Error caught'));

            await request(app)
              .post('')
              .send({
                name: name,
                email: email,
                ra: ra,
                cpf: cpf})
              .expect(500)
              .then((result) => {
                createStudentExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { error: 'Error caught' });
              });
          });

          it('And status code 400 if resquest is bad', async function() {
            const name = 'teste';
            const email = 'teste@teste.com';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const createStudentExpectation = sinon.mock(studentController)
              .expects('createStudent')
              .withArgs(name, email, ra, cpf)
              .throws(new Error('Bad request'));

            await request(app)
              .post('')
              .send({
                name: name,
                email: email,
                ra: ra,
                cpf: cpf})
              .expect(400)
              .then((result) => {
                createStudentExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
          });
        });
      });
    });
  });

  describe('When send a GET request to /', function() {
    describe('Should invoke "readAllStudents" from studentController', function() {
      describe('Then read and return all students from database', function(){
        it('If there is any', async function() {
          const cpf1 = cpfCheck.generate();
          const cpf2 = cpfCheck.generate();

          const readAllStudentsExpectation = sinon.mock(studentController)
            .expects('readAllStudents')
            .withArgs()
            .resolves([
              new Student(
                94,
                'teste1',
                'teste1@teste.com',
                'alu202000001',
                cpf1),
              new Student(
                95,
                'teste2',
                'teste2@teste.com',
                'alu202000002',
                cpf2),
            ]);

          await request(app)
            .get('')
            .expect(200)
            .then((result) => {
              readAllStudentsExpectation.verify();

              assert.deepEqual(
                result.body,
                [
                  { 
                    _id: 94,
                    _name: 'teste1',
                    _email: 'teste1@teste.com',
                    _ra: 'alu202000001',
                    _cpf: cpf1
                  },
                  { 
                    _id: 95,
                    _name: 'teste2',
                    _email: 'teste2@teste.com',
                    _ra: 'alu202000002',
                    _cpf: cpf2
                  }
                ]
              );
            });
        });

        it('If there is none', async function() {
          const readAllStudentsExpectation = sinon.mock(studentController)
            .expects('readAllStudents')
            .withArgs()
            .resolves({});

          await request(app)
            .get('')
            .expect(204)
            .then((result) => {
              readAllStudentsExpectation.verify();

              assert.deepEqual(
                result.body,
                '');
            });
        });
      });

      describe('Then return the error', function() {
        it('And status code 500 if "readAllUsers" fails', async function() {
          const readAllStudentsExpectation = sinon.mock(studentController)
            .expects('readAllStudents')
            .withArgs()
            .rejects(new Error('Error caught'));

          await request(app)
            .get('')
            .expect(500)
            .then((result) => {
              readAllStudentsExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Error caught' });
            });
        });

        it('And status code 400 if resquest is bad', async function() {
          const readAllStudentsExpectation = sinon.mock(studentController)
            .expects('readAllStudents')
            .withArgs()
            .throws(new Error('Bad request'));

          await request(app)
            .get('')
            .expect(400)
            .then((result) => {
              readAllStudentsExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
        });
      });
    });
  });

  describe('When send a GET request to /94', function() {
    describe('Should invoke "readStudentById" from studentController', function() {
      describe('Then read and return the student from database', function(){
        it('If it exists', async function() {
          const name = 'teste';
          const email = 'teste@teste.com';
          const ra = 'alu202000001';
          const cpf = cpfCheck.generate();

          const readStudentByIdExpectation = sinon.mock(studentController)
            .expects('readStudentById')
            .withArgs('94')
            .resolves(new Student(94, name, email, ra, cpf));

          await request(app)
            .get('/94')
            .expect(200)
            .then((result) => {
              readStudentByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { 
                  _id: 94,
                  _name: name,
                  _email: email,
                  _ra: ra,
                  _cpf: cpf
                }
              );
            });
        });

        it('If there is none', async function() {
          const readStudentByIdExpectation = sinon.mock(studentController)
            .expects('readStudentById')
            .withArgs('94')
            .resolves({});

          await request(app)
            .get('/94')
            .expect(204)
            .then((result) => {
              readStudentByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                ''
              );
            });
        });
      });

      describe('Then return the error', function() {
        it('And status code 500 if "readUserById" fails', async function() {
          const readStudentByIdExpectation = sinon.mock(studentController)
            .expects('readStudentById')
            .withArgs('94')
            .rejects(new Error('Error caught'));

          await request(app)
            .get('/94')
            .expect(500)
            .then((result) => {
              readStudentByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Error caught' });
            });
        });

        it('And status code 400 if resquest is bad', async function() {
          const readStudentByIdExpectation = sinon.mock(studentController)
            .expects('readStudentById')
            .withArgs('94')
            .throws(new Error('Bad request'));

          await request(app)
            .get('/94')
            .expect(400)
            .then((result) => {
              readStudentByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
        });
      });
    });
  });

  describe('When send a PUT request to /94', function() {
    describe('Should invoke "updateStudentById" from studentController', function() {
      describe('And use the body and the params', function(){
        describe('To update the user', function() {
          it('If it exists', async function() {
            const id = '94';
            const name = 'teste';
            const email = 'teste@teste.com';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const updateStudentByIdExpectation = sinon.mock(studentController)
              .expects('updateStudentById')
              .withArgs(id, name, email)
              .resolves(new Student(id, name, email, ra, cpf));

            await request(app)
              .put('/94')
              .send({
                name: name,
                email: email})
              .expect(200)
              .then((result) => {
                updateStudentByIdExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { 
                    _id: id,
                    _name: name,
                    _email: email,
                    _ra: ra,
                    _cpf: cpf
                  }
                );
              });
          });

          it('If there is none', async function() {
            const id = '94';
            const name = 'teste';
            const email = 'teste@teste.com';

            const updateStudentByIdExpectation = sinon.mock(studentController)
              .expects('updateStudentById')
              .withArgs(id, name, email)
              .resolves({});

            await request(app)
              .put('/94')
              .send({
                name: name,
                email: email})
              .expect(204)
              .then((result) => {
                updateStudentByIdExpectation.verify();

                assert.deepEqual(
                  result.body,
                  '');
              });
          });
        });
      });

      describe('Then return the error', function() {
        it('And status code 500 if "updateStudentById" fails', async function() {
          const id = '94';
          const name = 'teste';
          const email = 'teste@teste.com';

          const updateStudentByIdExpectation = sinon.mock(studentController)
            .expects('updateStudentById')
            .withArgs(id, name, email)
            .rejects(new Error('Error caught'));

          await request(app)
            .put('/94')
            .send({
              name: name,
              email: email})
            .expect(500)
            .then((result) => {
              updateStudentByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Error caught' });
            });
        });

        it('And status code 400 if resquest is bad', async function() {
          const id = '94';
          const name = 'teste';
          const email = 'teste@teste.com';

          const updateStudentByIdExpectation = sinon.mock(studentController)
            .expects('updateStudentById')
            .withArgs(id, name, email)
            .throws(new Error('Bad request'));

          await request(app)
            .put('/94')
            .expect(400)
            .send({
              name: name,
              email: email})
            .then((result) => {
              updateStudentByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
        });
      });
    });
  });

  describe('When send a DELETE request to /94', function() {
    describe('Should invoke "deleteStudentById" from studentController', function() {
      describe('And use the params', function(){
        describe('To delete the user', function() {
          it('If it exists', async function() {
            const id = '94';
            const name = 'teste';
            const email = 'teste@teste.com';
            const ra = 'alu202000001';
            const cpf = cpfCheck.generate();

            const deleteStudentByIdExpectation = sinon.mock(studentController)
              .expects('deleteStudentById')
              .withArgs(id)
              .resolves(new Student(id, name, email, ra, cpf));

            await request(app)
              .delete('/94')
              .expect(200)
              .then((result) => {
                deleteStudentByIdExpectation.verify();

                assert.deepEqual(
                  result.body,
                  { 
                    _id: id,
                    _name: name,
                    _email: email,
                    _ra: ra,
                    _cpf: cpf
                  }
                );
              });
          });

          it('If there is none', async function() {
            const id = '94';

            const deleteStudentByIdExpectation = sinon.mock(studentController)
              .expects('deleteStudentById')
              .withArgs(id)
              .resolves({});

            await request(app)
              .delete('/94')
              .expect(204)
              .then((result) => {
                deleteStudentByIdExpectation.verify();

                assert.deepEqual(
                  result.body,
                  ''
                );
              });
          });
        });
      });

      describe('Then return the error', function() {
        it('And status code 500 if "deleteStudentById" fails', async function() {
          const id = '94';

          const deleteStudentByIdExpectation = sinon.mock(studentController)
            .expects('deleteStudentById')
            .withArgs(id)
            .rejects(new Error('Error caught'));

          await request(app)
            .delete('/94')
            .expect(500)
            .then((result) => {
              deleteStudentByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Error caught' }
              );
            });
        });

        it('And status code 400 if resquest is bad', async function() {
          const id = '94';

          const deleteStudentByIdExpectation = sinon.mock(studentController)
            .expects('deleteStudentById')
            .withArgs(id)
            .throws(new Error('Bad request'));

          await request(app)
            .delete('/94')
            .expect(400)
            .then((result) => {
              deleteStudentByIdExpectation.verify();

              assert.deepEqual(
                result.body,
                { error: 'Bad request' });
            });
        });
      });
    });
  });
});
