const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require("../models/User")

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

router.get('/signup', (req, res, next) => res.render('auth/signup'))

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  if (username == "" || password == "" || email == "") {
    res.render("auth/signup", { message: "Please fill in all the fields" })
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "That username is already registered, please choose a different one." })
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
module.exports = router;
