const moment = require("moment");

const validateBody = (req, res, next)=>{
  const id = req.params.id;
  const data = req.body;

  if (!id || !data || !data.weekGarde) {
    return res.status(400).json({success: false});
  }

  if (!Array.isArray(data.weekGarde) || data.weekGarde.length > 30) {
    return res.status(400).json({success: false,
      message: "body.weekGarde must be an array len <= 30"});
  }

  const today = moment().tz("Africa/Algiers");

  const payload = data.weekGarde.sort((a, b)=>b.index > a.index)
      .map((item, index)=>{
        const nextday = today.add(index, "day");
        return {
          name: item.name,
          date: nextday.format("yyyy-MM-dd"),
          hourFrom: item.hourFrom,
          hourTo: item.hourTo,
          location: `${item.lat},${item.lng}`,
          rating: 5,
        };
      });

  res.locals.data = payload;
  return next();
};


module.exports = {
  validateBody,
};
