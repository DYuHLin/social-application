const register = require('../Controllers/registerController');
const login = require('../Controllers/loginController');
const express = require('express')

const router = express.Router();

router.post('/register', register.post_register);
router.delete('/deleteaccount', register.post_delete);
router.put('/updateaccount', register.update_acc);
router.put('/addfollower', register.add_follower);
router.put('/removefollower', register.delete_follower);
router.get('/getusers', register.get_users);
router.get('/singleuser', register.get_user);
router.post('/login', login.post_login);
router.post('/logout', login.post_logout);

module.exports = router;