const Message = require('../models/message');

exports.index_page_get = function(req, res) {
    Message.find({})
    .populate('author')
    .exec((err, messages) => {
        if(err) {
            res.send('Error')
            return
        }
        res.render('index', {messages: messages})
    })
};

exports.index_page_post = function(req, res) {
    Message.findByIdAndDelete(req.body.messageId, (err) => {
        if(err) {
            res.send('Error')
            return
        }
        res.redirect('/')
    })
};



