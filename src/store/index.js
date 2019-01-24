import { decorate, observable, action, computed, configure } from "mobx";
import { resultKeyNameFromField } from "apollo-utilities";
//import Api from "../api/playList";

class Store {
  constructor() {
    //this.api = new Api();
    //normaal van de steam api maar die werkt enkel online
    //this.getFromApi(`../data/allUserGames.json`);

    //per project andere stappen opvragen
    this.activeProject = 0;
    this.currentStep = 0;

    //video player
    this.progressBarValue = 0;
    this.isMouseDownOverProgressBar = false;

    //video editor
    this.activeClipIndex = 0;
    this.clipId = 0;
    this.clips = [];
    this.totalClipsLength = 0;

    //trimmer
    this.isTrimmerOpen = false;
    this.minClipduration = 5;
    this.maxClipduration = 30;
    this.maxTotalDuration = 60;
    this.isMouseDownOverTrimmer = false;
  }

  updateProgress(val) {
    this.progressBarValue = val;
  }

  getActiveClipIndex(newValue) {
    let clipStartPercent = 0;

    let videoIndex = 0;

    store.clips.forEach((clip, index) => {
      const clipEndPercent = clipStartPercent + clip.clipLength;

      //check if in range
      if (clipStartPercent <= newValue && clipEndPercent >= newValue) {
        videoIndex = index;
      }

      //add to start percetage
      clipStartPercent = clipEndPercent;
    });

    //set global var
    this.activeClipIndex = videoIndex;

    return videoIndex;
  }

  calcToRemoveTime(videoIndex) {
    let toRemoveTime = 0;

    this.clips.forEach((clip, index) => {
      if (videoIndex !== 0 && index < videoIndex) {
        toRemoveTime += clip.clipLength;
      }
    });

    return toRemoveTime;
  }

  addClipToTimeLine(newClip) {
    //remove active class from clips
    this.clips.forEach((clip, index) => {
      if (clip.isActiveClip) {
        this.clips[index].isActiveClip = false;
      }
    });

    //add to clips
    this.clips.push(newClip);

    //set active clip
    this.clips[this.clips.length - 1].isActiveClip = true;

    //set index
    this.activeClipIndex = this.clips.length - 1;

    //add to clip id
    this.clipId++;
  }

  setDurrationIfVideo(data, duration) {
    //is video?
    //if yes change duration
    if (data.isVideo) {
      const maxDuration = duration;

      //clip duration to the max duration of a clip
      if (duration > this.maxClipduration) {
        duration = this.maxClipduration;
      }

      //get the clip
      this.clips.forEach((clip, index) => {
        if (clip.fileUrl === data.fileUrl) {
          //set the new duration
          this.clips[index].duration = duration;

          //set clip max duration
          clip.maxDuration = maxDuration;
        }
      });

      //add to total clips length
      this.totalClipsLength += duration;

      //set clips length in persentages
      this.clips.forEach(clip => {
        clip.clipLength = Math.round(
          this.mapVal(clip.duration, 0, this.totalClipsLength, 0, 100)
        );
      });
    }
  }

  updateTotalClipsLength() {
    //reset totalClipsLength
    let newTotalClipsLength = 0;

    //calc totalClipsLength
    this.clips.forEach(clip => {
      newTotalClipsLength += clip.duration;
    });

    //update totalClipsLength
    this.totalClipsLength = newTotalClipsLength;

    //update clip length
    this.clips.forEach(clip => {
      clip.clipLength = Math.round(
        this.mapVal(clip.duration, 0, this.totalClipsLength, 0, 100)
      );
    });
  }

  durationToSeconds(durationText) {
    const minutes = parseInt(durationText.substr(0, 2), 10);
    const seconds = parseInt(
      durationText.substr(durationText.length - 2, 2),
      10
    );

    return minutes * 60 + seconds;
  }

  mapVal(num, inMin, inMax, outMin, outMax) {
    return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  calcDurationStamp(duration) {
    let result = duration;
    let minutes = 0;
    let seconds = "0";

    //calculate the minutes
    minutes = Math.floor(duration / 60);

    //calcultate seconds
    seconds = Math.floor(duration - minutes * 60).toString();

    //add leading zero's if needed
    if (parseInt(seconds, 10) < 10) {
      seconds = `0${seconds}`;
    }

    //add together for result
    result = `${minutes}:${seconds}`;

    return result;
  }

  moveClip(currentIndex, direction) {
    //save old val
    const toSwapVal = this.clips[currentIndex + direction];

    //set the old val
    this.clips[currentIndex + direction] = this.clips[currentIndex];

    //swap in the new val
    this.clips[currentIndex] = toSwapVal;

    //set new active clip
    this.clips.forEach((clip, index) => {
      if (currentIndex + direction === index) {
        //is new active clip
        clip.isActiveClip = true;

        //set global active
        this.activeClipIndex = index;
      } else {
        //remove active clip
        clip.isActiveClip = false;
      }
    });

    //set new progressbar
    //check if first or not
    if (currentIndex + direction > 0) {
      this.progressBarValue =
        100 - this.calcToRemoveTime(currentIndex + direction);
    } else {
      this.progressBarValue = 0;
    }
  }

  playNextClip(index) {
    //set new video as active
    this.clips[index + 1].isActiveClip = true;

    //set old video as inactive
    this.clips[index].isActiveClip = false;

    //set global
    this.activeClipIndex = index + 1;
  }

  updateActiveClip(clipIndex) {
    this.clips.forEach((clip, index) => {
      if (index === clipIndex) {
        this.clips[index].isActiveClip = true;

        //set activeClipIndex
        this.activeClipIndex = index;
      } else {
        this.clips[index].isActiveClip = false;
      }
    });
  }

  uploadClips() {
    //check if there are clips
    if (this.clips.length > 0) {
      let sendDis = {};

      //create form data
      const data = new FormData();

      //go throug clips and add the data
      this.clips.forEach((clip, index) => {
        //append data to form
        //use the users UID!!!!!
        /*  


        !!!!!!!!!!TODO!!!!!!!

        */
        data.append(`clip`, clip.file, `clip${index}.mp4`);
        //console.log(typeof clip.file);
        data.append(`start`, clip.clipStart.toString());
        data.append(`duration`, clip.duration.toString());
      });

      for (const pair of data.entries()) {
        sendDis[pair[0]] = pair[1];

        console.log(`${pair[0]}, ${pair[1]}`);
      }

      console.log(`string: ` + JSON.stringify(sendDis));
      //post data to server
      fetch("http://localhost:5000/postclips", {
        method: "POST",
        body: data
      })
        .then(r => r)
        .then(r => console.log(r));
    }
  }
}

decorate(Store, {
  handleShowInstruction: action,
  clips: observable,
  progressBarValue: observable,
  moveClip: action,
  playNextClip: action,
  isTrimmerOpen: observable
});

const store = new Store();
export default store;
