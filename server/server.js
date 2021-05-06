const express = require('express');
const { ValidationError } = require('express-validation');

const routes = require('./routes');
const db = require('./models');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/auth', routes.auth);
app.use('/users', routes.user);

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.send({
      ok: false,
      type: 'fields.validation',
      message: err.details.body[0].message
    });
  }
  
  return res.status(500).json(err);
})

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log("Connected to DB.");
  });
});