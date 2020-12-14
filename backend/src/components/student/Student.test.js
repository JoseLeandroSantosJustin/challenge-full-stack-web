const sinon = require('sinon');
const Student = require('./Student');
const cpfCheck = require('cpf-check');
const utils = require('./utils');
const assert = require('chai').assert;

describe('Unit test student/Student', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('When to instantiate Student', function() {
    it('Should to set all parameter by the default set methods', function() {
      const id = 94;
      const name = 'teste';
      const email = 'teste@teste.com';
      const ra = 'alu202000001';
      const cpf = cpfCheck.generate();

      const idSetterStub = sinon.stub();
      sinon.stub(Student.prototype, 'id').set(idSetterStub);

      const nameSetterStub = sinon.stub();
      sinon.stub(Student.prototype, 'name').set(nameSetterStub);

      const emailSetterStub = sinon.stub();
      sinon.stub(Student.prototype, 'email').set(emailSetterStub);

      const raSetterStub = sinon.stub();
      sinon.stub(Student.prototype, 'ra').set(raSetterStub);

      const cpfSetterStub = sinon.stub();
      sinon.stub(Student.prototype, 'cpf').set(cpfSetterStub);

      new Student(id, name, email, ra, cpf);
      assert.isTrue(idSetterStub.called);
      assert.isTrue(nameSetterStub.called);
      assert.isTrue(emailSetterStub.called);
      assert.isTrue(raSetterStub.called);
      assert.isTrue(cpfSetterStub.called);
    });
  });

  describe('When to set the Stundent\'s id', function() {
    describe('Should throws an error', function(){
      it('If the given id fails "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const id = ''; // Any ID that fails isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(id)
          .returns(false);

        assert.throws(() => {
          student.id = id;
        }, Error, 'Student must have an id');
        isValidFieldExpectation.verify();
      });
    });

    describe('Should be the given id ', function(){
      it('If id pass "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const id = 94; // Any RA that pass isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(id)
          .returns(true);

        student.id = id;

        assert.equal(student.id, id);
        isValidFieldExpectation.verify();
      });
    });
  });

  describe('When to set the Stundent\'s name', function() {
    describe('Should be', function(){
      it('Undefined if the given name fails "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const name = ''; // Any name that fails isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(name)
          .returns(false);

        student.name = name;

        assert.isUndefined(student.name);
        isValidFieldExpectation.verify();
      });

      it('The given name if name pass "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const name = 'teste'; // Any name that pass isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(name)
          .returns(true);

        student.name = name;

        assert.equal(student.name, name);
        isValidFieldExpectation.verify();
      });
    });
  });

  describe('When to set the Stundent\'s email', function() {
    describe('Should be', function(){
      it('Undefined if the given email fails "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const email = ''; // Any email that fails isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(email)
          .returns(false);

        student.email = email;

        assert.isUndefined(student.email);
        isValidFieldExpectation.verify();
      });

      it('The given email if email pass "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const email = 'teste@teste.com'; // Any email that pass isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(email)
          .returns(true);

        student.email = email;

        assert.equal(student.email, email);
        isValidFieldExpectation.verify();
      });
    });
  });

  describe('When to set the Stundent\'s RA', function() {
    describe('Should throws an error', function(){
      it('If the given RA fails "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const ra = ''; // Any RA that fails isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(ra)
          .returns(false);

        assert.throws(() => {
          student.ra = ra;
        }, Error, 'Student must have an RA');
        isValidFieldExpectation.verify();
      });
    });

    describe('Should be the given RA ', function(){
      it('If RA pass "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const ra = 'alu202000001'; // Any RA that pass isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(ra)
          .returns(true);

        student.ra = ra;

        assert.equal(student.ra, ra);
        isValidFieldExpectation.verify();
      });
    });
  });

  describe('When to set the Stundent\'s CPF', function() {
    describe('Should throws an error', function(){
      it('If the given CPF fails "isValidField" from "./utils"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const cpf = ''; // Any CPF that fails isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(cpf)
          .returns(false);

        assert.throws(() => {
          student.cpf = cpf;
        }, Error, 'Student must have an CPF');
        isValidFieldExpectation.verify();
      });

      it('If the given CPF fails "validate" from "cpf-check"', function() {
        const student = new Student(
          94,
          'teste',
          'teste@teste.com',
          'alu202000001',
          cpfCheck.generate()
        );

        const cpf = '94949494949'; // Any CPF that fails isValidField
        const isValidFieldExpectation = sinon.mock(utils)
          .expects('isValidField')
          .withArgs(cpf)
          .returns(true);

        const validateExpectation = sinon.mock(cpfCheck)
          .expects('validate')
          .withArgs(cpf)
          .returns(false);

        assert.throws(() => {
          student.cpf = cpf;
        }, Error, 'Student must have an valid CPF');
        isValidFieldExpectation.verify();
        validateExpectation.verify();
      });
    });

    describe('Should be the given CPF with mask', function(){
      describe('If CPF pass "isValidField" from "./utils"', function(){
        it('And also pass "validate" from "cpf-check"', function() {
          const student = new Student(
            94,
            'teste',
            'teste@teste.com',
            'alu202000001',
            cpfCheck.generate()
          );

          const cpf = '94949494949'; // Any CPF that pass isValidField
          const isValidFieldExpectation = sinon.mock(utils)
            .expects('isValidField')
            .withArgs(cpf)
            .returns(true);

          const validateExpectation = sinon.mock(cpfCheck)
            .expects('validate')
            .withArgs(cpf)
            .returns(true);

          student.cpf = cpf;

          const cpfWithMask = '949.494.949-49';
          assert.equal(student.cpf, cpfWithMask);
          isValidFieldExpectation.verify();
          validateExpectation.verify();
        });
      });
    });
  });
});