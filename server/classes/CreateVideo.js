const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const uniqid = require("uniqid");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

class CreateVideo {
  constructor(
    param = {
      meta: false,
      res: false
    }
  ) {
    this.metaData = param.meta;
    this.res = param.res;

    this.counter = 0;
    this.isOneClip = false;

    this.tester = ``;
  }

  durationToTimeStamp(time) {
    const intTime = parseInt(time);
    let minutes = 0;
    let seconds = 0;

    //calc minutes
    minutes = this.addLeadingZeros(Math.floor(intTime / 60));

    //calc seconds
    seconds = this.addLeadingZeros(Math.floor(intTime - minutes * 60));

    return `00:${minutes}:${seconds}`;
  }

  addLeadingZeros(number) {
    if (number < 10) {
      number = `0${number}`;
      return number;
    }

    return number.toString();
  }

  cutVideo(clipName, startDur, dur, isLastCLip, totalVideoCount) {
    const dir = __dirname.replace(`/classes`, ``);

    //if one clip  this is final video name approperiatly
    let clipFinalName = `${clipName}Edited`;

    if (this.isOneClip) {
      clipFinalName = uniqid();
    }

    new ffmpeg(`${dir}/uploads/${clipName}.mp4`)
      .setStartTime(startDur)
      .setDuration(dur)
      .noAudio()
      .size("1280x720")
      .save(`${dir}/uploads/${clipFinalName}.mp4`)
      .on("start", function(commandLine) {
        console.log("start : " + commandLine);
      })
      .on("progress", function(progress) {
        console.log("In Progress !!" + Date());
      })
      .on("end", () => {
        console.log("cut resolved");

        //delete old clip
        fs.unlinkSync(`${dir}/uploads/${clipName}.mp4`);

        //if one clip then send result
        if (this.isOneClip) {
          this.res.send(`server/uploads/${clipFinalName}.mp4`);
        }

        //add to the counter
        this.counter++;

        //first video has been cut start the next one
        if (
          this.counter <= this.metaData.durations.length - 1 &&
          !this.isOneClip
        ) {
          this.cutMoreVideos();
        }

        //merge videos
        this.mergeClips(isLastCLip, totalVideoCount);

        return `done`;
      })
      .on("error", function(err) {
        console.log(err);
        return err;
      });
  }

  mergeClips(isLastCLip, totalVideoCount) {
    const dir = __dirname.replace(`/classes`, ``);

    //merge files if needed
    if (isLastCLip && totalVideoCount > 0) {
      //add videos to merge
      let toMergeVideo = new ffmpeg();

      for (let i = 0; i < totalVideoCount; i++) {
        toMergeVideo = toMergeVideo.mergeAdd(
          `${dir}/uploads/clip${i}Edited.mp4`
        );
      }

      //gen random name
      const vidName = uniqid();

      //merge the videos
      toMergeVideo
        .mergeToFile(`${dir}/uploads/${vidName}.mp4`, `${dir}/tmp`)
        .on("progress", function(progress) {
          console.log("In Progress !!" + Date());
        })
        .on("end", () => {
          console.log(`done`);

          //delete old edit files
          for (let i = 0; i < totalVideoCount; i++) {
            fs.unlinkSync(`${dir}/uploads/clip${i}Edited.mp4`);
          }

          //send back message of completion
          this.res.send(`server/uploads/${vidName}.mp4`);
        })
        .on("error", function(err) {
          console.log(err);
          return err;
        });
    }
  }

  createAfterMovie(videos) {
    const dir = __dirname.replace(`/classes`, ``);

    //add videos to merge
    let toMergeVideo = new ffmpeg();

    videos.forEach(video => {
      toMergeVideo = toMergeVideo.mergeAdd(`${dir}/uploads/${video}.mp4`);
    });

    //merge the videos
    toMergeVideo
      .mergeToFile(`${dir}/uploads/finalVideo.mp4`, `${dir}/tmp`)
      .on("progress", function(progress) {
        console.log("In Progress !!" + Date());
      })
      .on("end", function() {
        console.log(`done`);
      })
      .on("error", function(err) {
        console.log(err);
        return err;
      });
  }

  cutMoreVideos() {
    this.cutVideo(
      `clip${this.counter}`,
      this.durationToTimeStamp(this.metaData.starts[this.counter]),
      this.durationToTimeStamp(this.metaData.durations[this.counter]),
      this.metaData.durations.length - 1 === this.counter,
      this.metaData.durations.length
    );
  }

  createVideo() {
    console.log(typeof this.metaData.durations);
    //is there more than one video?
    if (typeof this.metaData.durations === `string`) {
      //is one video
      console.log(`one`);

      //is one clip
      this.isOneClip = true;

      //calculate the start duration
      const startDur = this.durationToTimeStamp(this.metaData.starts);

      //calculate the duration
      const dur = this.durationToTimeStamp(this.metaData.durations);

      console.log(startDur);
      console.log(dur);

      //cut the video
      this.cutVideo(`clip0`, startDur, dur, false, 0);
    } else {
      //are more videos
      console.log(`more`);

      //are more clips
      this.isOneClip = false;

      //cut first video
      this.cutMoreVideos();
    }
  }
}

module.exports = CreateVideo;
