//require("dotenv").config();
const express = require("express");
const router = express.Router();
const key = process.env.KEYMAP;
const Parcela = require("../models/Parcela");

/* GET home page */
router.get("/", (req, res, next) => {
  Parcela.find().then(plots => {
    const plotsInfo = plots.map(
      ({ coordenadas, venta, tipo, precio, dimensiones }) => ({
        coordenadas,
        venta,
        tipo,
        precio,
        dimensiones
      })
    );
    res.render("index", { key, plotsInfo: JSON.stringify(plotsInfo) });
  });
});

module.exports = router;
