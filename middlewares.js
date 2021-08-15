const moment = require("moment-timezone");
const {getPharmacyById, createPharmacy} = require("./api/pharmacy/controller");
const {firebaseAdmin} = require("./helpers");

/**
 * this function will validate the array item
 * @example
 * {
                "name":"PHARMACY NAME",
                "hourFrom": "07:00",
                "hourTo": "12:00",
                "lat": 35.3808,
                "lng": 5.9020
    }
 * also will populate the item if it contains a pharmacyId
    @example
    {
                "pharmacyId": "-Mgyt3sOg3K2CBcXHn5Y",
                "hourFrom": "07:00",
                "hourTo": "12:00"
    }
 * @param {*} nextday this will be the key yyyy-mm-dd
 * @param {*} cityId city id
 * @returns garde
 */
const wrapItem = (nextday, cityId) => (item) => {
  if (item.pharmacyId) {
    return getPharmacyById(item.pharmacyId, cityId)
        .then((pharmacy) => {
          if (pharmacy) {
            return {
              pharmacyId: item.pharmacyId,
              name: pharmacy.name,
              date: nextday,
              hourFrom: item.hourFrom,
              hourTo: item.hourTo,
              location: `${pharmacy.lat},${pharmacy.lng}`,
              rating: pharmacy.rating || 5,
            };
          } else return {};
        })
        .catch((error) => {
          console.trace(error.message);
          return {};
        });
  } else {
    // insert the new pharmacy to database

    return createPharmacy({
      name: item.name || "unamed",
      lat: item.lat || 1,
      lng: item.lng || 1,
      cityId,
      rating: 5,
    }).then((pharmacyId)=>({
      pharmacyId,
      name: item.name,
      date: nextday,
      hourFrom: item.hourFrom,
      hourTo: item.hourTo,
      location: `${item.lat},${item.lng}`,
      rating: 5,
    }));
  }
};

/**
 * validate the body schema before saving it to database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns next
 */
const validateBody = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  if (!id || !data || !data.weekGarde) {
    return res.status(400).json({success: false});
  }

  if (!Array.isArray(data.weekGarde) || data.weekGarde.length > 31) {
    return res.status(400).json({
      success: false,
      message: "body.weekGarde must be an array len <= 30",
    });
  }

  if (data.weekGarde.filter((item) => !Array.isArray(item)).length != 0) {
    return res.status(400).json({
      success: false,
      message: "body.weekGarde.item must be an array",
    });
  }

  const today = moment().tz("Africa/Algiers");

  const arrayOfGardesToObject = async (obj, dayGardes = [], index) => {
    const nextday = today.add(index, "day").format("yyyy-MM-DD");
    obj[nextday] = await Promise.all(dayGardes.map(wrapItem(nextday, id)));
    return obj;
  };

  // create firebase entry
  const payload = await data.weekGarde.reduce(arrayOfGardesToObject, {});

  res.locals.payload = payload;
  return next();
};


const verifyToken=async (req, res, next)=>{
  const authorization = req.headers["authorization"] ||
  req.headers["Authorization"];

  if (!authorization || !authorization.split(" ")[1]) {
    return res.status(401).json({success: false});
  }

  try {
    const decoded = await firebaseAdmin().auth().verifyIdToken(authorization.split(" ")[1]);
    res.locals.user = {
      email: decoded.email,
      uid: decoded.uid,
      email_verified: decoded.email_verified,
    };
    return next();
  } catch (error) {
    return res.status(401).json({success: false, message: error.message});
  }
};

module.exports = {
  validateBody,
  verifyToken,
};

/**
 * ,
            {
                "name":"Bouhentala",
                "hourFrom": "07:00",
                "hourTo": "12:00",
                "lat": 35.3808,
                "lng": 5.9020
            },
            {
                "name":"Aziz",
                "hourFrom": "12:00",
                "hourTo": "19:00",
                "lat": 35.3808,
                "lng": 5.9022
            },
            {
                "name":"Seddam",
                "hourFrom": "19:00",
                "hourTo": "00:00",
                "lat": 35.3808,
                "lng": 5.9022
            }
        ],
        [
            {
                "name":"Bouhentala",
                "hourFrom": "07:00",
                "hourTo": "12:00",
                "lat": 35.3808,
                "lng": 5.9020
            },
            {
                "name":"Aziz",
                "hourFrom": "12:00",
                "hourTo": "19:00",
                "lat": 35.3808,
                "lng": 5.9022
            },
            {
                "name":"Seddam",
                "hourFrom": "19:00",
                "hourTo": "00:00",
                "lat": 35.3808,
                "lng": 5.9022
            }
 */
