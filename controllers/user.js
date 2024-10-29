const Users = require("../models/Users");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.getData = (req, res, next) => {
  Users.find()
    .then((User) => {
      res.status(200).json(User);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.getDataclinet = (req, res, next) => {
  Users.find()
    .then((User) => {
      let t = [];
      User.map((e) => {
        let l = {
          name: e.name,
          email: e.email,
          pername: e.pername,

          tel: e.tel,
        };
        t.push(l);
      });
      res.status(200).json(t);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.createUsers = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new Users({
        email: req.body.email,
        password: hash,
        pername: req.body.pername,
        name: req.body.name,
        tel: req.body.tel,
        role: req.body.role,
      });

      user
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
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.infoUser = (req, res, next) => {
  Users.findOne({ _id: req.params.id })
    .then((User) => {
      let l = {
        name: User.name,
        email: User.email,
        pername: User.pername,

        tel: User.tel,
        role: User.role,
      };

      res.status(200).json(l);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.login = (req, res, next) => {
  Users.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Paire login/mot de passe incorrecte" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(402)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,

            name: user.name,
            role: user.role,
            token: jwt.sign(
              {
                userId: user._id,
                email: user.email,
                name: user.name,
                tel: user.tel,
                role: user.role,
              },
              process.env.TOKEN_SECRET,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  console.log(req.params.id);
  Users.findOne({ _id: req.params.id })
    .then((v) => {
      if (!v) {
        return res
          .status(401)
          .json({ message: "elle trouve  pas sur databese" });
      } else {
        Users.deleteOne({ _id: req.params.id })
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
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.modifiUser = (req, res, next) => {
  let data = new Users(req.body);

  Users.findOne({ _id: req.params.id })
    .then((v) => {
      if (!v) {
        return res
          .status(408)
          .json({ message: "elle trouve  pas sur databese" });
      } else {
        console.log(req.body, "v", v);
        bcrypt
          .compare(req.body.tonmodepass, v.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(402)
                .json({ message: "Paire login/mot de passe incorrecte" });
            } else {
              bcrypt
                .hash(req.body.novomodepass, 10)
                .then((hash) => {
                  const user = new Users({
                    email: req.body.user.email,
                    password: hash,
                    pername: req.body.user.pername,
                    name: req.body.user.name,
                    tel: req.body.user.tel,
                    role: req.body.user.role,
                  });

                  Users.updateOne({ _id: req.params.id }, user)
                    .then(() => {
                      return res.status(201).json({ message: "fine" });
                    })
                    .catch((error) => {
                      res.status(202).json({
                        error: error,
                      });
                    });
                })
                .catch((error) => res.status(503).json({ error }));
            }
          })
          .catch((error) => res.status(502).json({ error }));
      }
    })
    .catch((error) => res.status(501).json({ error }));
};
