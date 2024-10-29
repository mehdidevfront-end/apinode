const mongoose = require("mongoose");

const Vouture = mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  Image: { type: Array, required: true },
  LesPlaquesMatricule: { type: String, required: true },
  dataDupe: { type: String, required: true },
  dataFini: { type: String, required: true },
  prix: { type: String, required: true },
  VerifierDisponibilite: { type: Boolean, required: true },
  numerJoue: { type: Number, required: true },
});

module.exports = mongoose.model("Vouture", Vouture);
