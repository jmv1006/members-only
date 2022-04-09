const express = require("express");
const router = express.Router()
const index_page_controller = require('../controllers/index_controller')

router.get('/', 
    index_page_controller.index_page_get
);

router.post('/',
    index_page_controller.index_page_post
);

module.exports = router;