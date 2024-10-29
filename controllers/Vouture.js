
const Commeds = require("../models/commed");
const Vouture = require("../models/Vouture");
const VoutureData = require("../data/Vouture.json");

exports.getData = (req, res, next) => {
  Vouture.find()
    .then((Voutures) => {
      res.status(200).json(Voutures);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createVouture = (req, res, next) => {
  const Voutur = new Vouture(req.body);

  Voutur.save()
    .then((e) => {
      res.status(201).json({
        message: "ok",
        data: e,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.deleteVouture = (req, res, next) => {
  Vouture.findOne({ _id: req.params.id })
    .then((v) => {
      if (!v) {
        return res
          .status(401)
          .json({ message: "elle trouve  pas sur databese" });
      } else {
        if (v.VerifierDisponibilite) {
          return res.status(401).json({ message: "deja rezrve" });
        } else {
          Vouture.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({
                message: "Deleted!",
              });
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
              });
            });
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifivouture = (req, res, next) => {
  let datavouture = req.body;
  const Voutur = new Vouture(datavouture);

  Vouture.updateOne({ _id: req.params.id }, datavouture)
    .then(() => {
      res.status(200).json({
        message: " updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getUneVouture = (req, res, next) => {
  Vouture.findOne({
    _id: req.params.id,
  })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
exports.getCalendrierdelaVouture = (req, res, next) => {
  Vouture.findOne({
    _id: req.params.id,
  })
    .then((thing) => {




      Commeds.findOne({
        idVouture: req.params.id,
      })
        .then((Commed) => {

          res.status(200).json({
            Vouture: thing,
            VerifierDisponibilite: false,
            dataDupe: Commed.dataDupe,
            dataFini: Commed.dataFini
          });
        })
        .catch((error) => {
          res.status(200).json({
            Vouture: thing,
            VerifierDisponibilite: true,
          });

        });











    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
