const mongoose = require("mongoose");

const statutvoitures = mongoose.Schema({
  Idvoiture: { type: String, required: true },
  klmdevidange: { type: String, required: true },
  Klm: { type: String, required: true },
  status: { type: String, required: true },
  dataFiniAttestation_d_assurance: { type: String, required: true },
  dataFiniVisiteTechnique: { type: String, required: true },
  dataFiniTax: { type: String, required: true },
  VerifierDisponibilite: { type: String, required: true },
});

module.exports = mongoose.model("statutvoitures", statutvoitures);
