const express = require("express");
const router = express.Router();

const User = require("../controllers/user");

router.post("/create", User.createUsers);
router.post("/login", User.login);
router.get("/", User.getData);
router.get("/clinet", User.getDataclinet);

router.put("/modifi/:id", User.modifiUser);
router.post("/m/:id", User.infoUser);
router.delete("/delete/:id", User.deleteUser);
module.exports = router;
