const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const Parcela = require("../models/Parcela");
const ensureLogin = require("connect-ensure-login");
const key = process.env.KEYMAP;

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
    res.render("auth/signup", {
      message: "Por favor complete todos los campos"
    });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", {
        message: "Nombre de usuario no disponible, por favor elija uno nuevo"
      });
      return;
    }

    if (err) return "Error de ejecución";
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    });

    newUser
      .save()
      .then(() => res.redirect("/"))
      .catch(err => console.log(err));
  });
});

//LOG IN

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/auth/member",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

//DISPLAY OR HIDE ELEMENTS

router.get('/logueado', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.send(JSON.stringify({ log: true }))
})
//MEMBER'S SITE

router.get("/member", ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render("auth/member", { key })
}
);

router.post("/member", (req, res, next) => {
  const tipo = req.body.tipo;
  const dimensiones = req.body.dimensiones;
  const venta = req.body.venta;
  const precio = req.body.precio;
  const coordenadas = JSON.parse(req.body.coordenadas);
  //const userEmail = req.user.email;
  const userID = req.user.id;

  const nuevaParcela = new Parcela({
    tipo,
    dimensiones,
    venta,
    precio,
    coordenadas,
    //userEmail,
    userID
  });

  nuevaParcela
    .save()
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
});

//LOG OUT

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//CARDS

router.get("/card", ensureLogin.ensureLoggedIn(), (req, res) => {
  Parcela.find()
    .then(parcelas => {
      res.render("auth/card", { parcelas });
    })
    .catch(() => res.redirect("/auth/login"))
});

//INDIVIDUAL INFO AND MAP

router.get("/card/:id", (req, res, next) => {
  Parcela.findOne({ "_id": req.params.id })
    .then((parcela) => {
      const plotsInfo = [{
        coordenadas: parcela.coordenadas,
        venta: parcela.venta,
        tipo: parcela.tipo,
        precio: parcela.precio,
        dimensiones: parcela.dimensiones
      }]
      console.log(plotsInfo)
      res.render("auth/cardMap", { key, plotsInfo: JSON.stringify(plotsInfo) })
    })
    .catch(() => res.redirect("/auth/login"))

})

//VIEW JUST THEIR OWN PROPERTIES

router.get("/mine", (req, res, next) => {
  Parcela.find({ userID: req.user.id })
    .populate("userID")
    .then((parcelas) => res.render("auth/mine", { parcelas }))
    .catch(err => console.log(err))
})

module.exports = router;
