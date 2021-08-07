
const admin = require("firebase-admin");
const moment = require("moment-timezone");
const express = require("express");
const {getServiceAccount} = require("./helpers");
const {validateBody} = require("./middlewares");
const {MORNING_HOUR} = require("./constants");
const app = express();
app.use(express.json());

if (process.env.NODE_ENV != "production") {
  console.log("load env variables..");
  require("dotenv").config();
}


admin.initializeApp({
  credential: admin.credential.cert(getServiceAccount()),
  databaseURL: process.env.DATABASE_URL,
});

const PORT = process.env.PORT || 5000;

app.get("/api/:id/pharmacies", async (req, res) =>{
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({success: false});
  }

  const ref = admin.database().ref(`cities/c-${id}`);

  const snap = await ref.get();

  if (snap.exists) {
    const arr = [];
    snap.forEach((item)=> {
      arr.push(item);
    });

    return res.json(arr);
  } else {
    return res.json([]);
  }
});

app.get("/api/:id/pharmacies/today", async (req, res) =>{
  const id = req.params.id;

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

  const ref = admin.database().ref(`cities/c-${id}/${dayStr}`);

  const snap = await ref.get();

  if (snap.exists) {
    const arr = [];
    snap.forEach((item)=> {
      arr.push(item);
    });

    return res.json(arr);
  } else {
    return res.json([]);
  }
});


app.post("/api/:id/pharmacies", validateBody, async (req, res) => {
  const id = req.params.id;
  const {payload} = res.locals;

  const ref = admin.database().ref(`cities/c-${id}`);

  await ref.set(payload);

  return res.json({
    success: true,
  });
});

app.get("*", (req, res)=>{
  res.status(200).json({
    message: "welcome to pharmacie-de-garde api!",
  });
});
app.listen(PORT, ()=>{
  console.log("start server api");
});
