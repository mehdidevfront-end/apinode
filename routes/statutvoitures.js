const express = require("express");
const router = express.Router();

const statutvoitures = require("../controllers/statutvoitures");

router.get("/me/:id", statutvoitures.statusVoiture);
router.get("/", statutvoitures.getdata);
router.post("/", statutvoitures.create);

router.get("/:id", statutvoitures.gatUnestatutvoiture);
router.put("/modifi/:id", statutvoitures.modifi);

module.exports = router;
