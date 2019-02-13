//require("dotenv").config();
const express = require("express");
const router = express.Router();
const key = process.env.KEYMAP;
const Parcela = require("../models/Parcela");

/* GET home page */
router.get("/", (req, res, next) => {

  Parcela.find()
    .then((parcelas) => {
      let coordenadas = parcelas.map(parcela => parcela.coordenadas);
      res.render("index", { key, coordenadas: JSON.stringify(coordenadas) })
    })
})

module.exports = router;
