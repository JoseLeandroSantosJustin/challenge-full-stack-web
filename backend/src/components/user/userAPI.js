const router = require('express').Router();
const userController = require('./userController');

router.post('', function (req, res) {
  try {
    userController.createUser(
      req.body.email,
      req.body.password
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
    userController.readAllUsers().then((result) => {
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
    userController.readUserById(
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
    userController.updateUserById(
      req.params.id,
      req.body.email,
      req.body.password
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

router.delete('/:id', function (req, res) {
  try {
    userController.deleteUserById(
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
