const moment = require("moment-timezone");

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

  if (data.weekGarde.filter( (item) => !Array.isArray(item)).length != 0) {
    return res.status(400).json({success: false,
      message: "body.weekGarde.item must be an array"});
  }

  const today = moment().tz("Africa/Algiers");
  // .sort((a, b)=>b.index > a.index)
  const payload = data.weekGarde
      .reduce((obj, dayGardes=[], index)=>{
        const nextday = today.add(index, "day").format("yyyy-MM-DD");
        obj[nextday]= dayGardes.map((item)=>({
          name: item.name,
          date: nextday,
          hourFrom: item.hourFrom,
          hourTo: item.hourTo,
          location: `${item.lat},${item.lng}`,
          rating: 5,
        }));
        return obj;
      }, {});

  res.locals.payload = payload;
  return next();
};


module.exports = {
  validateBody,
};
