

const moment = require("moment-timezone");
const express = require("express");
const path = require("path");
const cors = require("cors");
const {firebaseAdmin} = require("./helpers");
const {validateBody} = require("./middlewares");
const {MORNING_HOUR} = require("./constants");

/**
 * EXPRESS APP
 */
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV != "production") {
  console.log("local: load env variables..");
  require("dotenv").config();
}


const PORT = process.env.PORT || 5000;

app.get("/api/:id/gardes", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({success: false});
  }

  const ref = firebaseAdmin().database().ref(`cities/c-${id}`);

  const snap = await ref.get();

  if (snap.exists) {
    const arr = [];

    snap.forEach((item) => {
      const payload = [...item.val()]
          .map((ele) => Object.assign(ele, {date: item.key}));

      arr.push(payload);
    });
    return res.json(arr);
  } else {
    return res.json([]);
  }
});

app.get("/api/:id/gardes/today", async (req, res) => {
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

  const ref = firebaseAdmin().database().ref(`cities/c-${id}/${dayStr}`);

  const snap = await ref.get();

  if (snap.exists) {
    const arr = [];
    snap.forEach((item, key) => {
      item.key = key;
      arr.push(item);
    });

    return res.json(arr);
  } else {
    return res.json([]);
  }
});


app.post("/api/:id/gardes", validateBody, async (req, res) => {
  const id = req.params.id;
  const {payload} = res.locals;

  const ref = firebaseAdmin().database().ref(`cities/c-${id}`);

  await ref.set(payload);

  return res.json({
    success: true,
  });
});

app.use("/", express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.status(200).json({
    message: "welcome to pharmacie-de-garde api!",
  });
});
app.listen(PORT, () => {
  console.log("start server api");
});
