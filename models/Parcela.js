const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parcelaSchema = new Schema({
  tipo: String,
  dimensiones: String,
  venta: String,
  precio: Number,
  coordenadas: Array,
  userEmail: String,
  userID: { type: Schema.Types.ObjectId, ref: "User" }

})

const Parcela = mongoose.model("Parcela", parcelaSchema);

module.exports = Parcela;