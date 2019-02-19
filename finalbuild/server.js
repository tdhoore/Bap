const CreateVideo = require("./classes/CreateVideo.js");
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 5000;

//set up multer
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});
//setup upload
const upload = multer({
  storage: storage
});

if (process.env.PORT === undefined) {
  //is real
  app.use(`/`, express.static(__dirname));
  console.log("help");
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

app.post("/createaftermovie", upload.single("clip"), (req, res) => {
  console.log(req.body.videoLinks);
  const genVideo = new CreateVideo();
  //tester
  genVideo.createAfterMovie(["test1", "test2"]);
  res.send(req.file);
});

app.post("/postclipsmetadata", upload.single(), (req, res) => {
  console.log("meta: " + req.body.durations);

  //create the video
  const genVideo = new CreateVideo({ meta: req.body, res: res });
  genVideo.createVideo();
});

//fix empty links
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {});
