const utils = require('./utils');

class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  set id(id) {
    if(!utils.isValidField(id)) throw new Error('User must have an id');

    this._id = id;
  }

  get id() {
    return this._id;
  }

  /**
   * @param {string} email
   */
  set email(email) {
    if(
      email === undefined ||
      email === null ||
      email === ''
    ) throw new Error('User must have an email');

    this._email = email;
  }

  get email() {
    return this._email;
  }

  /**
   * @param {string} password
   */
  set password(password) {
    if(
      password === undefined ||
      password === null ||
      password === ''
    ) throw new Error('User must have a password');

    this._password = password;
  }

  get password(){
    return this._password;
  }
}

module.exports = User;
