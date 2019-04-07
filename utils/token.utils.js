var jwt = require('jsonwebtoken');

var createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
  generateToken: function(req, res, next) {
      console.log('generate token :: ', req.user)
      req.token = createToken(req.auth);
      return next();
  },
  sendToken: function(req, res) {
      console.log('send token :: ', req.user)
      res.setHeader('x-auth-token', req.token);
      return res.status(200).send(JSON.stringify(req.user));
  }
};