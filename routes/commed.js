const express = require("express");
const router = express.Router();

const commed = require("../controllers/commed");

const email = require("../controllers/email");

const auth = require("../middleware/adimen");
router.get("/", commed.getData);
router.post("/:id", commed.createCommed);
router.post("/Datacommde2/:id", commed.createCommed2);

router.delete("/fineCommeds/:id", commed.fineCommeds);
router.get("/recherUser/:email", commed.recherUser);
router.get("/getCommedsUser/:email", commed.getCommedsUser);

router.post("/vaidetionLaDomonde/:id", commed.vaidetionLaDomonde);

router.get("/email", email.email);
router.get("/getUneCommed/:id", commed.getUneCommed);
module.exports = router;
