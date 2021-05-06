// routes for homepage
const router = require('express').Router();
const sequelize= require('../config/connection');
const { Owner, Vehicle, MaintLog } = require('../models');



router.get('/', (req, res) => {
  res.render('homepage',{loggedIn: req.session.loggedIn});
})

router.get('/login', (req, res) => {
if(req.session.loggedIn) {
  res.redirect('/');
  return;
}
res.render('login');

});

  router.get('/signup', (req, res) => {
res.render('signup')
  });
module.exports = router;