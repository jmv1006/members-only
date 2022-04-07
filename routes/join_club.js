const express = require("express");
const router = express.Router()
const join_club_controller = require('../controllers/join_club_controller')

router.get('/', 
    join_club_controller.join_club_get
);

router.post('/',
    join_club_controller.join_club_post
)
module.exports = router;