const Users = require("../models/Users");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Commeds = require("../models/commed");
const Vouture = require("../models/Vouture");
exports.getData = (req, res, next) => {
  Commeds.find()
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createCommed = (req, res, next) => {
  Vouture.findOne({ _id: req.params.id })
    .then((thing) => {
      if (!thing.VerifierDisponibilite) {
        let Voutu = thing;

        const Commed = new Commeds(req.body.data);
        Commed.idVouture = req.params.id;
        Commed.save()
          .then(() => {
            Voutu.dataDupe = req.body.data.dataDupe;
            Voutu.dataFini = req.body.data.dataFini;
            Voutu.numerJoue = req.body.data.numerJoue;

            Voutu.VerifierDisponibilite = true;

            const datavoutur = new Vouture(Voutu);

            Vouture.updateOne({ _id: req.params.id }, datavoutur)
              .then(() => {
                bcrypt
                  .hash(req.body.password, 10)
                  .then((hash) => {
                    const user = new Users({
                      email: req.body.data.Email,
                      password: hash,
                      pername: req.body.data.prename,
                      name: req.body.data.nameclinet,
                      tel: req.body.data.tel,
                      role: "clinet",
                    });

                    user
                      .save()
                      .then(() => {
                        res.status(200).json({
                          message: " ok !",
                          datavoutur: datavoutur,
                          Commed: Commed,
                        });
                      })
                      .catch((error) => {
                        res.status(490).json({
                          error: error,
                        });
                      });
                  })
                  .catch((error) => res.status(500).json({ error }));
              })
              .catch((error) => {
                res.status(401).json({
                  error: error,
                });
              });
          })
          .catch((error) => {
            res.status(400).json({
              error: error,
            });
          });
      } else {
        res.status(202).json({
          message: "deja ronpli disponiple a " + thing.dataFini,
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
exports.createCommed2 = (req, res, next) => {
  Vouture.findOne({ _id: req.params.id })
    .then((thing) => {
      if (!thing.VerifierDisponibilite) {
        let Voutu = thing;

        const Commed = new Commeds(req.body.data);
        Commed.idVouture = req.params.id;
        Commed.save()
          .then(() => {
            Voutu.dataDupe = req.body.data.dataDupe;
            Voutu.dataFini = req.body.data.dataFini;
            Voutu.numerJoue = req.body.data.numerJoue;

            Voutu.VerifierDisponibilite = true;

            const datavoutur = new Vouture(Voutu);

            Vouture.updateOne({ _id: req.params.id }, datavoutur)
              .then(() => {
                res.status(200).json({
                  message: " ok !",
                  datavoutur: datavoutur,
                  Commed: Commed,
                });
              })
              .catch((error) => {
                res.status(401).json({
                  error: error,
                });
              });
          })
          .catch((error) => {
            res.status(400).json({
              error: error,
            });
          });
      } else {
        res.status(202).json({
          message: "deja ronpli disponiple a " + thing.dataFini,
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
exports.recherUser = (req, res, next) => {
  Users.findOne({ email: req.params.email })
    .then((thing) => {
      if (thing) {
        res.status(200).json({
          val: true,
        });
      } else {
        res.status(202).json({
          val: false,
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.fineCommeds = (req, res, next) => {
  Commeds.findOne({ _id: req.params.id })
    .then((v) => {
      if (!v) {
        return res
          .status(201)
          .json({ message: "elle trouve la commend pas sur databese" });
      } else {
        let idV = v.idVouture;
        Commeds.deleteOne({ _id: req.params.id })
          .then(() => {
            Vouture.findOne({
              _id: idV,
            })
              .then((el) => {
                if (!el) {
                  return res
                    .status(206)
                    .json({ message: "elle trouve  pas sur databese" });
                } else {
                  const dtavoutur = new Vouture(el);
                  dtavoutur.dataDupe = "";
                  dtavoutur.dataFini = "";
                  dtavoutur.numerJoue = 0;

                  dtavoutur.VerifierDisponibilite = false;
                  Vouture.updateOne({ _id: idV }, dtavoutur)
                    .then(() => {
                      return res.status(201).json({ message: "fine" });
                    })
                    .catch((error) => {
                      res.status(201).json({
                        error: error,
                      });
                    });
                }
              })
              .catch((error) => {
                res.status(274).json({
                  error: "4",
                });
              });
          })
          .catch((error) => {
            res.status(208).json({
              error: error,
            });
          });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.vaidetionLaDomonde = (req, res, next) => {
  Commeds.findOne({ _id: req.params.id })
    .then((v) => {
      if (!v) {
        return res
          .status(401)
          .json({ message: "elle trouve la commend pas sur databese" });
      } else {
        let data = v;
        data.vaidetionLaDomonde = true;
        Commeds.updateOne({ _id: req.params.id }, data)
          .then(() => {
            return res.status(201).json({ message: "valide de luer domond" });
          })
          .catch((error) => {
            res.status(401).json({
              error: error,
            });
          });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getCommedsUser = (req, res, next) => {
  let Email = req.params.email;

  Commeds.find()
    .then((e) => {
      let data = e;
      let t = data.filter((e) => e.Email === Email);
      res.status(200).json(t);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getUneCommed = (req, res, next) => {
  Commeds.findOne({
    _id: req.params.id,
  })
    .then((Commed) => {
      Vouture.findOne({
        _id: Commed.idVouture,
      })
        .then((Voutur) => {
          res.status(200).json({
            commed: Commed,
            voitur: Voutur,
          });
        })
        .catch((error) => {
          res.status(404).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};
