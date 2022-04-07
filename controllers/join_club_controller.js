const User = require('../models/user');

exports.join_club_get = function(req, res) {
    res.render('join-club', { user: res.locals.currentUser })
}

exports.join_club_post = function(req, res) {

    if(req.body.code == process.env.MEMBER_CODE) {
        //sucess
        User.findById
    } else {
        res.send('Wrong')
    }
}
