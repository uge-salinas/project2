const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require("../models/User")
const Parcela = require("../models/Parcela")

const passport = require("passport");
const ensureLogin = require("connect-ensure-login");


/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

//SIGN UP

router.get('/signup', (req, res, next) => res.render('auth/signup'))

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username == "" || password == "" || email == "") {
    res.render("auth/signup", { message: "Por favor complete todos los campos" })
    return
  }

  //User.findOne({"username": username})
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "Nombre de usuario no disponible, por favor elija uno nuevo" })
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    })

    newUser.save()
      .then(() => res.redirect("/"))
      .catch(err => console.log(err))
  })
})

//LOG IN

router.get('/login', (req, res, next) => res.render('auth/login'))

router.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


//LOG OUT

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => res.redirect('/login'))
})

module.exports = router;
