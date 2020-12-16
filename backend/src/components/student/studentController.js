const joi = require('joi');
const cpfCheck = require('cpf-check');
const utils = require('./utils');
const studentDAL = require('./studentDAL');
const Student = require('./Student');

/**
 * @param {string} name 
 * @param {string} email 
 * @param {string} ra 
 * @param {string} cpf 
 */
const createStudent = (name, email, ra, cpf) => {
  try {
    joi.assert(
      ra,
      joi.string()
        .required()
    );

    joi.assert(
      cpf,
      joi.string()
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  if(!cpfCheck.validate(cpf)) throw new Error('Invalid CPF');

  if(utils.isValidField(name)) {
    try {
      joi.assert(
        name,
        joi.string()
      );
    } catch (error) {
      throw new Error(error.details[0].message);
    }
  } else {
    name = undefined;
  }

  if(utils.isValidField(email)) {
    try {
      joi.assert(
        email,
        joi.string()
          .min(3)
          .max(255)
          .pattern(new RegExp('@{1}.*.'))
      );
    } catch (error) {
      throw new Error(error.details[0].message);
    }
  } else {
    email = undefined;
  }

  return new Promise((resolve, reject) => {
    studentDAL.createStudent(name, email, ra, cpfCheck.strip(cpf)).then((result) => {
      const student = new Student(result.insertId, name, email, ra, cpf);

      resolve(student);
    }).catch((error) => {
      reject(error);
    });
  });
};

const readAllStudents = () => {
  return new Promise((resolve, reject) => {
    studentDAL.readAllStudents().then((result) => {
      const students = [];

      result.forEach((student) => {
        students.push(
          new Student(
            student.id,
            student.name,
            student.email,
            student.ra,
            student.cpf
          )
        );
      });

      resolve(students);
    }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * @param {number} id 
 */
const readStudentById = (id) => {
  try {
    joi.assert(
      id,
      joi.number()
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  return new Promise((resolve, reject) => {
    studentDAL.readStudentById(id).then((result) => {
      if(result.length === 0) return resolve({});

      const user = new Student(
        result[0].id,
        result[0].name,
        result[0].email,
        result[0].ra,
        result[0].cpf
      );

      resolve(user);
    }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * @param {number} id 
 * @param {string} name 
 * @param {string} email 
 */
const updateStudentById = (id, name, email) => {
  try {
    joi.assert(
      id,
      joi.number()
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  if(utils.isValidField(name)) {
    try {
      joi.assert(
        name,
        joi.string()
          .required()
      );
    } catch (error) {
      throw new Error(error.details[0].message);
    }
  } else {
    name = undefined;
  }

  if(utils.isValidField(email)) {
    try {
      joi.assert(
        email,
        joi.string()
          .min(3)
          .max(255)
          .pattern(new RegExp('@{1}.*.'))
          .required()
      );
    } catch (error) {
      throw new Error(error.details[0].message);
    }
  } else {
    email = undefined;
  }

  return new Promise((resolve, reject) => {
    studentDAL.updateStudentById(id, name, email).then((updateResult) => {
      if(updateResult.affectedRows === 0) return resolve({});

      studentDAL.readStudentById(id).then((readResult) => {
        resolve(new Student(
          readResult[0].id,
          readResult[0].name,
          readResult[0].email,
          readResult[0].ra,
          readResult[0].cpf
        ));
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

/**
 * @param {number} id 
 */
const deleteStudentById = (id) => {
  try {
    joi.assert(
      id,
      joi.number()
        .required()
    );
  } catch (error) {
    throw new Error(error.details[0].message);
  }

  return new Promise((resolve, reject) => {
    studentDAL.readStudentById(id).then((readResult) => {
      if(Object.keys(readResult).length === 0 && readResult.constructor === Object) return resolve({});

      studentDAL.deleteStudentById(id).then((deleteResult) => {
        if(deleteResult.affectedRows === 0) return resolve({});

        resolve(new Student(
          readResult[0].id,
          readResult[0].name,
          readResult[0].email,
          readResult[0].ra,
          readResult[0].cpf
        ));
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

module.exports = {
  createStudent,
  readAllStudents,
  readStudentById,
  updateStudentById,
  deleteStudentById
}
