const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parcelaSchema = new Schema({
  tipo: String,
  dimensiones: String,
  venta: String,
  precio: Number
})

const Parcela = mongoose.model("Parcela", parcelaSchema);

module.exports = Parcela;