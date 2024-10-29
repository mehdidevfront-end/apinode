const statutvoitures = require("../models/statutvoiture");
const Vouture = require("../models/Vouture");
exports.getdata = (req, res, next) => {
  statutvoitures
    .find()
    .then((statutvoiture) => {
      res.status(200).json(statutvoiture);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.create = (req, res, next) => {
  const statutvoiture = new statutvoitures(req.body);

  statutvoiture
    .save()
    .then(() => {
      res.status(201).json({
        message: "ok",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.modifi = (req, res, next) => {
  let data = req.body;

  const statutvoiture = new statutvoitures(data);

  statutvoitures
    .updateOne({ _id: statutvoiture._id }, statutvoiture)
    .then((e) => {
      res.status(200).json({
        message: " updated successfully!",
        e,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.statusVoiture = (req, res, next) => {
  
  
  Vouture.findOne({
    _id: req.params.id,
  })
    .then((thing) => {statutvoitures
      .findOne({
        Idvoiture: req.params.id,
      })
      .then((el) => {
  res.status(200).json({
    
    voitur:thing,
    status:el
  });
      })
      .catch((error) => {
        res.status(404).json(error);
      });
      
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
  
    
};
exports.gatUnestatutvoiture = (req, res, next) => {
  statutvoitures
    .findOne({
      Idvoiture: req.params.id,
    })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        klmdevidange: "",
        Idvoiture: "",
        Klm: "",
        status: "",
        dataFiniTax: "",
        VerifierDisponibilite: "",
        dataFiniVisiteTechnique: "",
        dataFiniAttestation_d_assurance: "",
      });
    });
};
