const express = require("express");
const router = express.Router();

const Vouture = require("../controllers/Vouture");

router.get("/", Vouture.getData);
router.post("/", Vouture.createVouture);


router.get("/:id", Vouture.getUneVouture);
router.get("/getCalendrierdelaVouture/:id", Vouture.getCalendrierdelaVouture);
router.put("/modifi/:id", Vouture.modifivouture);
router.delete("/delete/:id", Vouture.deleteVouture);

module.exports = router;
