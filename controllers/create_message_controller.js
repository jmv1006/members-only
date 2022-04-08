const Message = require('../models/message');
const User = require('../models/user')

exports.create_message_get = function(req, res) {
    if(res.locals.currentUser) {
        res.render('create-message')
        return
    }
    res.redirect('/')
}

exports.create_message_post = function(req, res) {
    
    User.findById( res.locals.currentUser.id, (err, result) => {

        if(err) {
            res.send('Error')
            return
        }
        
        const date = new Date();

        let newMessage = new Message({
            text: req.body.messageText,
            author: result._id,
            date: date.toLocaleDateString('en-US')
        })
        
        newMessage.save((err) => {
            if(err) {
                res.send('ERROR')
                return
            }
            res.redirect('/')
        })
        
    })
    
}


