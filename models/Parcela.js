const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parcelaSchema = Schema({
  regadio: Boolean,
  dimensiones: Number,
  venta: Boolean,
  alquiler: Boolean,
  precio: Number
})

const Parcela = mongoose.model("Parcela", parcelaSchema);

module.exports = Parcela;