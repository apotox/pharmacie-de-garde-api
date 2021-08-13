const {Router} = require("express");
const {validateBody, verifyToken} = require("../../middlewares");
const {todayGardes,
  updateCityGardes, getAllCityGardes} = require("./controller");

// eslint-disable-next-line new-cap
const router = Router();

router.get("/:id/today", todayGardes);
router.get("/:id/", verifyToken, getAllCityGardes);
router.put("/:id", verifyToken, validateBody, updateCityGardes);

module.exports = router;
