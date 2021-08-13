const {Router} = require("express");
const {verifyToken} = require("../../middlewares");
const {getAllCityPharmacies} = require("./controller");

// eslint-disable-next-line new-cap
const router = Router();

router.get("/:id", verifyToken, getAllCityPharmacies);

module.exports = router;
