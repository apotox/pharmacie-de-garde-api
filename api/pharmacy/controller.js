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
  const id = req.params.id;
  return res.json([id]);
};

module.exports = {
  getAllCityPharmacies,
  getPharmacyById,
  createPharmacy,
};
