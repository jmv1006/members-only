const User = require('../models/user');

exports.sign_in_get = function(req, res) {
    res.render('sign-in')
}