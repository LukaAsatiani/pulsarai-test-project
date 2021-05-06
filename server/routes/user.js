const express = require('express');
const { validate } = require('express-validation');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const controller = require('../controllers').user;
const validation = require('../validation');

router.get('/:id', isAuth(), (req, res, next) => {
  const { id } = req.params;
  
  if(!id.match(/^[0-9]{1,5}$/g)){
    return next();
  }
    
  controller.get(req, res);
});

module.exports = router;