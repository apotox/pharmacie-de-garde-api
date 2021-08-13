const {Router} = require("express");
const {validateBody} = require("../../middlewares");
const {todayGardes,
  updateCityGardes, getAllCityGardes} = require("./controller");

// eslint-disable-next-line new-cap
const router = Router();

router.get("/:id/today", todayGardes);
router.get("/:id/", getAllCityGardes);
router.put("/:id", validateBody, updateCityGardes);

module.exports = router;
