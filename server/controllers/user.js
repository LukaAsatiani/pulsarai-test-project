const db = require('../models');
const { Op } = require('sequelize');
require('dotenv').config();

module.exports = {
  get: async (req, res) => {
    if (req.auth.user_id === parseInt(req.params.id)){
      const user_id = req.auth.user_id;
      const user = await db.user.findOne({ where: { id: user_id }, attributes: ['id', 'email', 'username', 'login_count']})
      
      const { logout_count, ...diselected } = user.toJSON();
      
      res.send({
        ok: true,
        user: diselected,
        message: 'user.data'
      });
    } else {
      res.send({
        ok: false,
        message: 'access.denied'
      });
    }
  },

  all: async (req, res) => {
    if (!req.isAuth)
      return {
        ok: false,
        message: 'unauth'
      }

    try {
      const users = await db.user.findAll()
      return {
        ok: true,
        users
      }
    } catch (e) {
      return {
        ok: false,
        errors: e.errors
      }
    }
  }
}