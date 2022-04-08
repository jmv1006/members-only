const User = require('../models/user');

exports.join_club_get = function(req, res) {
    res.render('join-club')
}

exports.join_club_post = function(req, res) {

    if(req.body.code == process.env.MEMBER_CODE) {
        //sucess
       User.findByIdAndUpdate()
        
    } else {
        res.send('Wrong')
    }
}
