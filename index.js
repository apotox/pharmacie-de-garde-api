
const admin = require("firebase-admin");

const express = require("express");
const {getServiceAccount} = require("./helpers");
const app = express();


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

  const ref = admin.database().ref(`cities/${id}`);

  const doc = await ref.get();

  if (doc.exists) {
    return res.json({
      success: true,
      data: doc.toJSON(),
    });
  } else {
    return res.json({
      success: false,
      data: {},
    });
  }
});

app.post("/api/:id/pharmacies", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!id || !body) {
    return res.status(400).json({success: false});
  }

  const ref = admin.database().ref(`cities/${id}`);

  await ref.set(body);

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
