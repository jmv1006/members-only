const Message = require('../models/message');

exports.create_message_get = function(req, res) {
    res.render('create-message')
}

exports.create_message_post = function(req, res) {
    res.send('Posted')
}


