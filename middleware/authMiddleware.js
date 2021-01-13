const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if(token) {
    jwt.verify(token, 'we the best music as we are programmer', (err, decodedToken) => {
      if(err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  }
  else {
    res.redirect('/login');
  }
  next();
}

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if(token) {
    jwt.verify(token, 'we the best music as we are programmer', async (err, decodedToken) => {
      if(err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let junior = await User.findById(decodedToken.id);
        let user = await User.findById(junior);
        res.locals.user = user;
        next();
      }
    });
  }
  else {
    res.locals.user = null;
    next();
  }

}

module.exports = {requireAuth, checkUser};
// module.exports = checkUser;
// module.exports = requireAuth;