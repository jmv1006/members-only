const express = require("express");
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {user: res.locals.currentUser})
});

module.exports = router;