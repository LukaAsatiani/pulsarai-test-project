const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize')
require('dotenv').config();

const LUCKY_SERIAL_NUMBER = 3


const tokenGenerator = async (res, user, data = {}) => {
  const token = jwt.sign(
    { email: user.email, logout_count: user.logout_count, user_id: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );

  res.send({
    ok: true,
    token: {
      user_id: user.id,
      value: token
    },
    ...data
  });
}

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body
    
    const user = await db.user.findOne({where: { email: email }});
    
    if(!user){
      res.send({
        ok: false,
        message: 'Wrong email or password.'
      })
    
      return
    }

    const isEqual = await bcrypt.compare(password, user.password); 
    await user.update({login_count: user.login_count + 1});

    if (isEqual) {
      tokenGenerator(res, user)

      return;
    }

    res.send({
      ok: false,
      message: 'Wrong email or password.'
    })
  },

  signup: async (req, res) => {
    const fields = req.body
    
    const count = await db.user.count({where: { [Op.or]: [{ username: fields.username }, { email: fields.email }] }})
    
    if(count !== 0){
      res.send({
        ok: false,
        message: "User with this email or username already exists"
      })
    
      return
    }

    const hashedPassword = await bcrypt.hash(fields.password, 12);
    const new_user = await db.user.create({ ...fields, password: hashedPassword, logout_count: 0, login_count: 0});
    
    const isLucky = async () => {
      const serial_number = await db.user.count();
      return serial_number % LUCKY_SERIAL_NUMBER === 0 ? true : false;
    }

    const iL = await isLucky()

    tokenGenerator(res, new_user, {
      message: iL ? 'You’re lucky person' : 'Account created',
      isLucky: iL
    })
  },

  logout: async (req, res) => {
    const { user_id } = req.auth
    
    const user = await db.user.findOne({where: {id: user_id}});
    await user.update({logout_count: user.logout_count + 1});
    
    res.send({
      ok: true,
      message: 'user.logout'
    });
  }
}