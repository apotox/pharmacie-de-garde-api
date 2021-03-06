const admin = require("firebase-admin");

// load firebase service account from envirenment variable `SERVICE_ACCOUNT`
const getServiceAccount=()=>{
  try {
    const buf = Buffer.from(process.env.SERVICE_ACCOUNT, "base64"); // Ta-da
    return JSON.parse(buf);
  } catch (err) {
    console.warn("getServiceAccount", err.message, err.stack);
    return null;
  }
};

// get configured firebase admin
const firebaseAdmin = ()=>{
  if (admin.apps.length == 0) {
    admin.initializeApp({
      credential: admin.credential.cert(getServiceAccount()),
      databaseURL: process.env.DATABASE_URL,
    });
  }
  return admin;
};


module.exports = {
  getServiceAccount,
  firebaseAdmin,
};
