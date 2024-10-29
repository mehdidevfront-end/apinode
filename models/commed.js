const mongoose = require("mongoose");

const CommedsSchema = mongoose.Schema({
  nameclinet: { type: String, required: true },
  prename: { type: String, required: true },
  LesPlaquesMatricule: { type: String, required: true },
  tel: { type: String, required: true },
  Email: { type: String, required: true },
  ville: { type: String, required: true },
  dataDupe: { type: String, required: true },
  dataFini: { type: String, required: true },
  numerJoue: { type: String, required: true },
  idVouture: { type: String, required: true },
  vaidetionLaDomonde: { type: Boolean, required: true },
  vaidetionClinet: { type: Boolean, required: true },
  finir: { type: Boolean, required: true },
});

module.exports = mongoose.model("Commeds", CommedsSchema);
