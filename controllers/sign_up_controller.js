const User = require('../models/user')
const Joi = require("joi");
const bcrypt = require('bcryptjs');

exports.sign_up_get = function (req, res) {
    res.render('sign-up', {errors: null, previousInput: {}})
}

exports.sign_up_post = function (req, res) {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .messages({
                'string.min': 'First Name must be at least 3 characters.'
            }),
        lastName: Joi.string()
            .min(3)
            .messages({
                'string.min': 'Last Name must be at least 3 characters.'
            }),
        username: Joi.string()
            .min(3)
            .messages({
                'string.min': 'Email must be at least 3 characters.'
            }),
        password: Joi.string()
            .min(3)
            .messages({
                'string.min': 'Password must be at least 3 characters.'
            }),
        confirmedPassword: Joi.string()
            .min(3)
            .valid(Joi.ref('password'))
            .messages({
                'any.only': 'Passwords must match'
            })
    });

    const { error, value } = schema.validate(req.body, {abortEarly: false})

    if(error) {
        res.render('sign-up', {errors: error.details, previousInput: req.body})
        return
    } 

    

    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            res.send('ERROR')
            return
        }
        if(user) {
            //user already exists
            res.send('User exists')
            return
        }
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            const newUser = new User({
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                username: req.body.username,
                password: hashedPassword,
                membership: 'non-member',
                admin: false
            });
            
            newUser.save((err) => {
                if(err) {
                    res.send('ERROR')
                }
                else {
                    res.redirect('/sign-in')
                }
            });
        })
    });
};