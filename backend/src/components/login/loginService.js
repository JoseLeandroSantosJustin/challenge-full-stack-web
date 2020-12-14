const utils = require('./utils');

/**
 * Express middleware
 * Middleware to authenticate the user request
 */
const authenticateRequest = (req, res, next) => {
  const authorizationHeader = String(req.get('Authorization'));
  const tokenJWT = authorizationHeader.slice(authorizationHeader.indexOf(' ') + 1);

  if (utils.isValidJWT(tokenJWT)) {
    next();
  } else {
    res.status(401)
      .type('application/json')
      .send({ error: 'Authentication token failed, try again with another' })
      .end();
  }
}

module.exports = {
  authenticateRequest
}
