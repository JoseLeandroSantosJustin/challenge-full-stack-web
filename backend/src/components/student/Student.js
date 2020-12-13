const utils = require('./utils');
const cpfCheck = require('cpf-check');

class Student {
  /**
   * @param {string} name 
   * @param {string} email 
   * @param {string} ra 
   * @param {string} cpf 
   */
  constructor(name, email, ra, cpf) {
    this.name = name;
    this.email = email;
    this.ra = ra;
    this.cpf = cpf;
  }

  /**
   * @param {string} name
   */
  set name(name) {
    if(!utils.isValidField(name)) name = undefined;

    this._name = name;
  }

  get name() {
    return this._name
  }

  /**
   * @param {string} email
   */
  set email(email) {
    if(!utils.isValidField(email)) email = undefined;

    this._email = email;
  }

  get email() {
    return this._email;
  }

  /**
   * @param {string} ra
   */
  set ra(ra) {
    if(!utils.isValidField(ra)) throw new Error('Student must have an RA');

    this._ra = ra;
  }

  get ra() {
    return this._ra;
  }

  /**
   * @param {string} cpf
   */
  set cpf(cpf) {
    if(!utils.isValidField(cpf)) throw new Error('Student must have an CPF');

    if(!cpfCheck.validate(cpf)) throw new Error('Student must have an valid CPF');

    this._cpf = cpfCheck.strip(cpf);
  }

  get cpf() {
    return cpfCheck.format(this._cpf);
  }
}

module.exports = Student;
