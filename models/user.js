const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstname: { type: String },
        lastname: { type: String },
        username: { type: String },
        password: { type: String },
        membership: { type: String }
    }
);

UserSchema
.virtual('fullname')
.get(function () {

    const fullname = this.firstname + this.lastname

    return fullname;
});

module.exports = mongoose.model('User', UserSchema)