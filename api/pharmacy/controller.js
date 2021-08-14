const {firebaseAdmin} = require("../../helpers");

/**
 * get pharmacy from database using its id (unique key)
 * @param {*} id
 * @returns pharmacy
 */
const getPharmacyById=async (id, cityId)=>{
  const snap = await firebaseAdmin()
      .database()
      .ref(`pharmacies/${cityId}/${id}`)
      .get();
  if (snap.exists()) {
    return snap.val();
  } else {
    return null;
  }
};

/**
 * create new pharmcy entry
 * @param {*} item
 * @returns key
 */
const createPharmacy=async (item)=>{
  const result = await firebaseAdmin()
      .database()
      .ref(`pharmacies/${item.cityId}`)
      .push(item);
  if (result.key) {
    console.log(`create-pharmacy: ${result.key}`);
  }

  return result.key;
};

/**
 * retreive all city's pharmacies
 * @param {*} req
 * @param {*} res
 * @returns [pharmacy]
 */
const getAllCityPharmacies=async (req, res) => {
  const id = req.params.id; // city id
  if (!id) {
    return res.status(400).json({success: false});
  }

  const ref = firebaseAdmin()
      .database()
      .ref(`pharmacies/${id}`);

  // retreive data
  const snap = await ref.get();

  if (snap.exists) {
    const arr = [];
    // make the response body array
    snap.forEach((item) => {
      const payload = Object.assign(item.val(), {key: item.key});

      arr.push(payload);
    });
    return res.json(arr);
  } else {
    return res.json([]);
  }
};

module.exports = {
  getAllCityPharmacies,
  getPharmacyById,
  createPharmacy,
};
