const Message = require('../models/message');

exports.index_page_get = function(req, res) {

    Message.find({})
    .populate('author')
    .exec((err, messages) => {
        console.log(messages)
        res.render('index', {messages: messages})
    })

}



