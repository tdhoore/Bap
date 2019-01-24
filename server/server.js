const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 5000;

//set up multer
const storage = multer.diskStorage({
  destination: "./server/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});
//setup upload
const upload = multer({
  storage: storage
});

if (process.env.PORT) {
  //is real
  app.use(`/`, express.static(__dirname));
} else {
  //is tester
  app.use(express.static(`./src`));
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/postclips", upload.single("clip"), (req, res) => {
  console.log("clip: " + req.file);
  res.send(req.file);
});

app.post("/postclipsmetadata", upload.single(), (req, res) => {
  console.log("meta: " + req.body.durations);
  res.send(req.body);
});

app.listen(port, () => {});
