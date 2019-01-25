const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

class CreateVideo {
  constructor(
    param = {
      meta: false
    }
  ) {
    this.metaData = param.meta;
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

    return new Promise((resolve, reject) => {
      new ffmpeg(`${dir}/uploads/${clipName}.mp4`)
        .setStartTime(startDur)
        .setDuration(dur)
        .noAudio()
        .size("1280x720")
        .save(`${dir}/uploads/${clipName}Edited.mp4`)
        .on("start", function(commandLine) {
          console.log("start : " + commandLine);
        })
        .on("progress", function(progress) {
          console.log("In Progress !!" + Date());
        })
        .on("end", () => {
          console.log("download resolved");

          //delete old clip
          fs.unlinkSync(`${dir}/uploads/${clipName}.mp4`);

          //merge videos
          console.log(isLastCLip && totalVideoCount > 0);
          this.mergeClips(isLastCLip, totalVideoCount);

          return `done`;
        })
        .on("error", function(err) {
          console.log(err);
          return err;
        });
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

      //merge the videos
      toMergeVideo
        .mergeToFile(`${dir}/uploads/video.mp4`, `${dir}/tmp`)
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
  }

  createVideo() {
    console.log(typeof this.metaData.durations);
    //is there more than one video?
    if (typeof this.metaData.durations === `string`) {
      //is one video
      console.log(`one`);

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

      //go through all videos and cup them all
      this.metaData.durations.forEach((dur, index) => {
        //check if last clip
        const isLastClip = 0 === index;

        console.log(index);

        this.cutVideo(
          `clip${index}`,
          this.durationToTimeStamp(this.metaData.starts[index]),
          this.durationToTimeStamp(dur),
          isLastClip,
          this.metaData.durations.length
        );
      });
    }
  }
}

module.exports = CreateVideo;
