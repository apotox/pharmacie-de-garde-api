const {Router} = require("express");
const {getAllCityPharmacies} = require("./controller");

// eslint-disable-next-line new-cap
const router = Router();

router.get("/:id", getAllCityPharmacies);

module.exports = router;
