const router = require('express').Router();
const loginController = require('./loginController');

router.post('', function (req, res) {
  try {
    loginController.login(
      req.body.email,
      req.body.password
    ).then((result) => {
      res.status(200)
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

module.exports = router;
