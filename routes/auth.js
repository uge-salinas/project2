const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const ensureLogin = require("connect-ensure-login");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


//SIGN UP

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username == "" || password == "" || email == "") {
    res.render("auth/signup", { message: "Por favor complete todos los campos" })
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "Nombre de usuario no disponible, por favor elija uno nuevo" })
      return
    }

    if (err) return "Error de ejecución"
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
});


//LOG IN

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/member",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));


//MEMBER'S SITE

router.get("/member", ensureLogin.ensureLoggedIn(), (req, res, next) => res.render("auth/member"))


//LOG OUT

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;