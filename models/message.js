const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        text: { type: String },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
        date: { type: String }
    }
);


module.exports = mongoose.model('Message', MessageSchema);