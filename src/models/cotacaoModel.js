const mongoose = require("mongoose");

const cotacaoSchema = new mongoose.Schema({
  produto: {
    type: String,
    require: true,
  },
  preco: {
    type: String,
  },
  crm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crm",
  }
});

module.exports = mongoose.model("Cotacao", cotacaoSchema);
