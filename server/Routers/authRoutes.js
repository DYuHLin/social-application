const register = require('../Controllers/registerController');
const express = require('express')

const router = express.Router();

router.post('/', register.post_register);

module.exports = router;