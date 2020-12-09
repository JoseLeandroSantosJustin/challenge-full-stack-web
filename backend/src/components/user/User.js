class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
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

    if(email.search(/@{1}.*\./) < 0) 
      throw new Error('User email needs to be at least one "@" and one "."');

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

    if(password.length < 6) throw new Error('Password must be at least 6 characters');

    this._password = password;
  }

  get password(){
    return this._password;
  }
}

module.exports = User;
