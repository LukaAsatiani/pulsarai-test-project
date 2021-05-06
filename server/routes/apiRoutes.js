// const express = require('express');
// const path = require('path');
// const router = express.Router();
// const db = require('../models');

// const Mailer = require('../mail/index')
// const mails_list = require('../mail/list')
// require('dotenv').config({path: '../.env'});

// router.get('/', (req, res) => {
//   res.send('Connection has been established successfully.')
// })

// router.get('/user/:id', (req, res) => {
//   db.user.findOne({ where: { id: req.params.id }})
//     .then(user => {
//       if (user) {
//         res.json(user)
//       } else {
//         res.json('User not found')
//       };
//     })
// })

// router.put('/user', (req, res) => {
//   db.user.create({
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password
//   }).then(user => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(400).json('Error in insert new record');
//       }
//     })
// })

// module.exports = router