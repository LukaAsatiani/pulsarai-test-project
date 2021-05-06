const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const controller = require('../controllers').auth;
const validation = require('../validation')

router.post('/signup', isAuth(false), validate(validation.signup, {}, {}), controller.signup);

router.post('/login', isAuth(false), validate(validation.login, {}, {}), controller.login);

router.get('/logout', isAuth(), controller.logout);

module.exports = router;