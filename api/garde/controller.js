const moment = require("moment-timezone");
const {MORNING_HOUR} = require("../../constants");
const {firebaseAdmin} = require("../../helpers");

/**
 * get today's gardes by city
 * @param {*} req
 * @param {*} res
 * @returns response
 */
const todayGardes=async (req, res)=>{
  const id = req.params.id; // city id

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "missing id",
    });
  }

  let dayStr = null;
  const today = moment().tz("Africa/Algiers");


  if (today.hour() < MORNING_HOUR) {
    dayStr = today.add(-1, "day").format("yyyy-MM-DD");
  } else {
    dayStr = today.format("yyyy-MM-DD");
  }

  // dayStr = yyyy-mm-dd
  const ref = firebaseAdmin().database().ref(`cities/${id}/${dayStr}`);

  const snap = await ref.get();

  if (snap.exists) {
    const arr = [];
    // create response body array
    snap.forEach((item, key) => {
      item.key = key;
      arr.push(item);
    });

    return res.status(200).json(arr);
  } else {
    return res.json([]);
  }
};

/**
 * update a city gardes
 * @param {*} req
 * @param {*} res
 * @return response
 */
const updateCityGardes= async (req, res)=>{
  const id = req.params.id; // city id
  const {payload} = res.locals;

  const ref = firebaseAdmin()
      .database()
      .ref(`cities/${id}`);

  // update data
  await ref.set(payload);


  return res.status(201).json({
    success: true,
  });
};

/**
 * get all city's gardes
 * @param {*} req
 * @param {*} res
 * @returns [gardes]
 */
const getAllCityGardes=async (req, res) => {
  const id = req.params.id; // city id
  if (!id) {
    return res.status(400).json({success: false});
  }

  const ref = firebaseAdmin()
      .database()
      .ref(`cities/${id}`);

  // retreive data
  const snap = await ref.get();

  if (snap.exists) {
    const arr = [];
    // make the response body array
    snap.forEach((item) => {
      const payload = [...item.val()]
          .map((ele) => Object.assign(ele, {date: item.key}));

      arr.push(payload);
    });
    return res.json(arr);
  } else {
    return res.json([]);
  }
};


module.exports = {
  todayGardes,
  getAllCityGardes,
  updateCityGardes,
};
