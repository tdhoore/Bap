/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { decorate, observable, action, computed, configure } from "mobx";
import { resultKeyNameFromField } from "apollo-utilities";
import * as firebase from "firebase";

class Store {
  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyCL-E4wSU4FrQ_CHzciHl3H5pLEYnD7LPg",
      authDomain: "bap-firebase.firebaseapp.com",
      databaseURL: "https://bap-firebase.firebaseio.com",
      projectId: "bap-firebase",
      storageBucket: "bap-firebase.appspot.com",
      messagingSenderId: "573194971360"
    };

    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();

    this.user = ((localStorage.getItem('authUser') !== null) ? localStorage.getItem('authUser') : false);
    console.log(`authUser:`, localStorage.getItem('authUser'));
    this.history = null;

    //database
    this.database = firebase.firestore();

    //project
    this.currentProject = `firstproject`;
    this.commentsCurrentProject = [];

    //project branches
    this.prototypeLevels = {};
    this.selectedPrototypeIds = [];

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

  login(e) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      this.actualLogin(e);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorCode:', errorCode);
      console.log('errorMessage:', errorMessage);
    });
  }

  actualLogin(e) {
    const {email, password, feedback} = e;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        this.user = result.user;
        localStorage.setItem('authUser', JSON.stringify(this.user));
        console.log('user:', this.user);
      })
      .catch(error => {
        error.message = feedback;
      });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('Sign-out successful');
      this.user = false;
      localStorage.removeItem('authUser');
    }).catch(function(error) {
      console.log('Sign-out failed:', error);
    });
  }

  register(e) {
    const {email, password, feedback} = e;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
        error.message = feedback;
      });
  }

  handleChangeLogin(e) {
    const input = e.currentTarget;
    if (input.name === 'email') {
      this.email = input.value;
    } else {
      this.password = input.value;
    } 
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

  uploadComment(comment, timeStamp) {
    //get user name and profile picture
    /*
    
    
    TODO!!!!!!!!!!!!!!
    
    
    */

    //send data
    this.database
      .collection(`projects`)
      .doc(this.currentProject)
      .collection(`comments`)
      .add({ comment: comment, timeStamp: timeStamp })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  getComments() {
    //empty old comments
    this.commentsCurrentProject = [];

    this.database
      .collection(`projects`)
      .doc(this.currentProject)
      .collection(`comments`)
      .get()
      .then(querySnapshot => {
        console.log("Document got!");
        querySnapshot.forEach(doc => {
          this.commentsCurrentProject.push(doc.data());
        });
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  }

  uploadClips() {
    //check if there are clips
    if (this.clips.length > 0) {
      //create form data
      let data = new FormData();

      const metaData = new FormData();

      //go throug clips and add the data
      this.clips.forEach((clip, index) => {
        //append data to form
        //use the users UID!!!!!
        /*  


        !!!!!!!!!!TODO!!!!!!!

        */
        data.append(`clip`, clip.file, `clip${index}.mp4`);
        data.append(`index`, index);

        //add start and duration to the pile
        metaData.append(`starts`, clip.clipStart.toString());
        metaData.append(`durations`, clip.duration.toString());

        //post data to server
        fetch("http://localhost:5000/postclips", {
          method: "POST",
          body: data
        }).then(r => {
          console.log(r);
          if (index === this.clips.length - 1) {
            console.log(JSON.stringify(metaData));
            //all videos have been send
            //send the metha data from all the clips
            fetch("http://localhost:5000/postclipsmetadata", {
              method: "POST",
              body: metaData
            }).then(r => console.log(r));
          }
        });

        data = new FormData();
      });
    }
  }

  /*getFirstLevelOfProjectBranches() {
    this.database
      .collection(`projects`)
      .doc(this.currentProject)
      .collection(`prototype1`)
      .get()
      .then(querySnapshot => {
        let isFirst = true;

        querySnapshot.forEach(doc => {
          console.log(doc);
          //push data to correct level
          this.prototypeLevels[1] = [];

          this.prototypeLevels[1].push(doc.data());

          //check if ther is a selected id at the current level AND check if first id
          if (this.selectedPrototypeIds[0] === undefined && isFirst) {
            //.doc.id
            this.selectedPrototypeIds[0] = doc.id;

            //trigger once
            isFirst = false;
          }
        });

        //get the docs from the next level
      })
      .catch(e => console.log(e));
  }*/

  getProjectBranches(level = 1, lastId = ``) {

    let queryString = ``;

    //create query
    for (let i = 1; i <= level; i++) {
      if (i === 1) {
        queryString += `prototype${i}`;
      } else {
        queryString += `/${lastId}/prototype${i}`;
      }
    }

    //send request
    this.database
      .collection(`projects`)
      .doc(this.currentProject)
      .collection(queryString)
      .get()
      .then(querySnapshot => {
        let isFirst = true;
        //check if there is anything here
        if (querySnapshot.docs.length > 0) {
          //setup docs for this level
          querySnapshot.forEach(doc => {
            //push data to correct level
            this.prototypeLevels[level] = [];

            this.prototypeLevels[level].push(doc.data());

            //check if ther is a selected id at the current level AND check if first id
            if (this.selectedPrototypeIds[level - 1] === undefined && isFirst) {
              //.doc.id
              this.selectedPrototypeIds[level - 1] = doc.id;

              //trigger once
              isFirst = false;
            }
          });

          //get the docs from the next level
          this.getProjectBranches(
            level + 1,
            this.selectedPrototypeIds[level - 1]
          );
        }
      })
      .catch(e => console.log(e));
    }
  }

decorate(Store, {
  handleShowInstruction: action,
  clips: observable,
  progressBarValue: observable,
  moveClip: action,
  playNextClip: action,
  isTrimmerOpen: observable,
  commentsCurrentProject: observable,
  prototypeLevels: observable,
  selectedPrototypeIds: observable,
  user: observable,
  login: action,
  register: action,
  authListener: action,
  handleChangeLogin: action,
  email: observable,
  password: observable,
  authenticated: observable,
  currentUser: observable,
});


const store = new Store();
export default store;
