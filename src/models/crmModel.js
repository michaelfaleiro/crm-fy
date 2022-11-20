const mongoose = require("mongoose");

const crmSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  whatsapp: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
  },
  cotacoes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cotacao' 
  }]
});

module.exports = mongoose.model("Crm", crmSchema);
