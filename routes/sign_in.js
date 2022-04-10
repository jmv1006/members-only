const express = require("express");
const router = express.Router();
var passport = require('passport');
const sign_in_controller = require('../controllers/sign_in_controller')


router.get('/', 
   sign_in_controller.sign_in_get
);


router.post('/',
  passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/sign-in"
  })
);

module.exports = router;