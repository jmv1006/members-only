const express = require("express");
const app = express();
const path = require('path');
const User = require('./models/user')
const passport = require('passport');
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')
require('dotenv').config()

const indexRouter = require('./routes/index_route');
const signUpRouter = require('./routes/sign_up');
const signInRouter = require('./routes/sign_in');
const joinClubRouter = require('./routes/join_club')
const createMessageRouter = require('./routes/create_message')

var mongoose = require('mongoose');
var mongoDB = `mongodb+srv://jmv1006:${process.env.DB_PW}@membersonlycluster.63dsj.mongodb.net/users?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//functions here
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/sign-up', signUpRouter);
app.use('/sign-in', signInRouter);
app.use('/join', joinClubRouter);
app.use('/create-message', createMessageRouter)
app.get("/sign-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get('*', (req, res) => {
  res.render('404')
})

const port = process.env.PORT || '3000';

app.listen(port, () => console.log(`App running on port ${port}!`));