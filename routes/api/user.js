const router = require("express").Router();
// const controller = require("../../controller/controller");
var { generateToken, sendToken } = require('../../utils/token.utils');
var passport = require('passport');
require('../../passport')();

// router.route("/user")
//   .post(controller.createUser);

// Matches with "/api/transactions/auth
router.route('/auth/google')
    .post(passport.authenticate('google-token', {session: false}), function(req, res, next) {
        console.log('auth route :: ', req.user)
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user._id
        };
        console.log('before next in auth route....')
        next();
    }, generateToken, sendToken);

module.exports = router;