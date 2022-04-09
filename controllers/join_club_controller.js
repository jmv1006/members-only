const User = require('../models/user');

exports.join_club_get = function(req, res) {
    res.render('join-club')
}

exports.join_club_post = function(req, res) {

    if(req.body.code == process.env.MEMBER_CODE) {
        //sucess
       User.findByIdAndUpdate(res.locals.currentUser.id, {$set:{membership: 'member'}}, (err, result) => {
            if(err) {
                res.send('Error')
                return
            }
            res.redirect('/')
       });
    } else {
        res.send('Wrong')
    }
}
