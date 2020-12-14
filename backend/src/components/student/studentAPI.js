const router = require('express').Router();
const studentController = require('./studentController');

router.post('', function (req, res) {
  try {
    studentController.createStudent(
      req.body.name,
      req.body.email,
      req.body.ra,
      req.body.cpf
    ).then((result) => {
      res.status(201)
        .type('application/json')
        .send(result)
        .end()
    }).catch((err) => {
      res.status(500)
        .type('application/json')
        .send({ error: err.message })
        .end()
    });
  } catch (err) {
    res.status(400)
      .type('application/json')
      .send({ error: err.message })
      .end()
  }
});

router.get('', function (req, res) {
  try {
    studentController.readAllStudents().then((result) => {
      if (
        Object.keys(result).length === 0 &&
        result.constructor === Object
      ) {
        res.status(204)
        .type('application/json')
        .end()
      } else {
        res.status(200)
        .type('application/json')
        .send(result)
        .end()
      }
    }).catch((err) => {
      res.status(500)
        .type('application/json')
        .send({ error: err.message })
        .end()
    });
  } catch (err) {
    res.status(400)
      .type('application/json')
      .send({ error: err.message })
      .end()
  }
});

router.get('/:id', function (req, res) {
  try {
    studentController.readStudentById(
      req.params.id
    ).then((result) => {
      if (
        Object.keys(result).length === 0 &&
        result.constructor === Object
      ) {
        res.status(204)
        .type('application/json')
        .end()
      } else {
        res.status(200)
        .type('application/json')
        .send(result)
        .end()
      }
    }).catch((err) => {
      res.status(500)
        .type('application/json')
        .send({ error: err.message })
        .end()
    });
  } catch (err) {
    res.status(400)
      .type('application/json')
      .send({ error: err.message })
      .end()
  }
});

router.put('/:id', function (req, res) {
  try {
    studentController.updateStudentById(
      req.params.id,
      req.body.name,
      req.body.email
    ).then((result) => {
      if (
        Object.keys(result).length === 0 &&
        result.constructor === Object
      ) {
        res.status(204)
        .type('application/json')
        .end()
      } else {
        res.status(200)
        .type('application/json')
        .send(result)
        .end()
      }
    }).catch((err) => {
      res.status(500)
        .type('application/json')
        .send({ error: err.message })
        .end()
    });
  } catch (err) {
    console.log(err.message);
    res.status(400)
      .type('application/json')
      .send({ error: err.message })
      .end()
  }
});

router.delete('/:id', function (req, res) {
  try {
    studentController.deleteStudentById(
      req.params.id
    ).then((result) => {
      if (
        Object.keys(result).length === 0 &&
        result.constructor === Object
      ) {
        res.status(204)
        .type('application/json')
        .end()
      } else {
        res.status(200)
        .type('application/json')
        .send(result)
        .end()
      }
    }).catch((err) => {
      res.status(500)
        .type('application/json')
        .send({ error: err.message })
        .end()
    });
  } catch (err) {
    res.status(400)
      .type('application/json')
      .send({ error: err.message })
      .end()
  }
});

module.exports = router;
