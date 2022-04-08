const express = require("express");
const router = express.Router()
const create_message_controller = require('../controllers/create_message_controller')

router.get('/', 
    create_message_controller.create_message_get
);

router.post('/', 
    create_message_controller.create_message_post
)

module.exports = router;