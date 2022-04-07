const express = require("express");
const router = express.Router()
const sign_up_controller = require('../controllers/sign_up_controller')

router.get('/',
    sign_up_controller.sign_up_get
);

router.post('/',
    sign_up_controller.sign_up_post
);

module.exports = router;