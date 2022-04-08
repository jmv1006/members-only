const express = require("express");
const router = express.Router()
const index_page_controller = require('../controllers/index_controller')

router.get('/', 
    index_page_controller.index_page_get
);

module.exports = router;