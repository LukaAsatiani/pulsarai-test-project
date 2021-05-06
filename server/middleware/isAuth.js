const db = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (needAuth = true) => {
  return async (req, res, next) => {
    const authHeader = req.get('Authorization') || 'Bearer';
    const token = authHeader.split(' ')[1];
    let user_id;

    const parseToken = async () => {
      if (!token || token === '') {
        return {
          status: false
        }
      }

      try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await db.user.findOne({ where: { id: decodedToken.user_id }});
        
        if(user.logout_count !== decodedToken.logout_count){
          return {
            status: false
          }
        }

        return {
          status: true,
          user_id: decodedToken.user_id
        }
      } catch {
        return {
          status: false
        }
      }
    }
    
    const auth = await parseToken()
    
    if(needAuth === auth.status){
      req.auth = auth;
      return next();
    } else {
      res.send({
        ok: false,
        message: "access.denied"
      });
    }
  }
};