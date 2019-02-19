/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from "react";
import { decorate, observable, action, computed, configure } from "mobx";
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

    this.user =
      localStorage.getItem("authUser") === undefined
        ? false
        : JSON.parse(localStorage.getItem("authUser"));
    this.authenticated = false;
    this.history = null;

    //filter
    this.filter = {};
    this.filterdContent = null;

    //database
    this.database = firebase.firestore();
    this.storage = firebase.storage();

    //project
    this.currentProjectId = ``;
    this.commentsCurrentProject = [];

    //prototype data
    this.commentsCurrentPrototype = [];
    this.currentPrototype = false;

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
    this.totalTrackLengths = {};
    this.notesCurrentProject = [];
    this.formContent = {};

    //gebruiker message
    this.message = ``;
    this.messageDuration = 10;

    //trimmer
    this.isTrimmerOpen = false;
    this.minClipduration = 5;
    this.maxClipduration = 30;
    this.maxTotalDuration = 60;
    this.isMouseDownOverTrimmer = false;

    //projects
    this.allProjects = [];
    this.sliderAmount = 1;
    this.buurtCounter = 0;
    this.projectUpdatesCounter = 0;

    //sorter
    this.currentSortType = ``;

    //register
    this.step = 1;
    this.maxSteps = 3;
    this.formObject = {};

    //loading
    this.loading = false;
    this.loadingReady = false;

    // new project
    this.newProjectId = "";
  }

  resetUploader() {
    this.activeClipIndex = 0;
    this.clipId = 0;
    this.clips = [];
    this.totalClipsLength = 0;
    this.totalTrackLengths = {};
    this.notesCurrentProject = [];
    this.formContent = {};
  }

  updateLoading() {
    this.loadingReady = false;
  }

  setVisibleCards(counterName, counter, content) {
    //if no counterName specified == no slider pressend
    if (counterName !== "") {
      let endIndex = store.sliderAmount;
      const array = [];

      //if bigger than 0
      if (counter > 0) {
        endIndex = store.sliderAmount * counter + store.sliderAmount;
      }

      //for desktop
      for (let i = store.sliderAmount * counter; i < endIndex; i++) {
        //get the correct elements
        //check if exists
        if (i < content.length) {
          array.push(content[i]);
        }
      }

      return array;
    } else {
      return content;
    }
  }

  updateCounter(countername, counter) {
    this[countername] += counter;
  }

  setCurrentProject(id) {
    if (id !== this.currentProjectId || this.currentProjectId === ``) {
      //set current project id
      this.currentProjectId = id;
    }
  }

  deleteClip() {
    //remove this clip from the list
    let setNewActive = true;
    const toDeleteIndex = this.activeClipIndex;

    this.clips.forEach((clip, index) => {
      //get video before this one and set it active
      if (
        this.activeClipIndex - 1 === index &&
        this.activeClipIndex - 1 >= 0 &&
        setNewActive
      ) {
        //set as previous as active
        clip.isActiveClip = true;
        this.activeClipIndex = index;

        //active ahas been set
        setNewActive = false;
      } else if (setNewActive && this.activeClipIndex + 1 < this.clips.length) {
        //set next one as active
        clip.isActiveClip = true;
        this.activeClipIndex = index;
      } else {
        this.activeClipIndex = 0;
      }
    });

    //delete clip
    this.clips.splice(toDeleteIndex, 1);

    //update total length
    this.updateTotalClipsLength();
    console.log(this.totalClipsLength);
  }

  getContentByFilter() {
    //get content by filter
    this.database
      .collection(`projects`)
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

  login(e) {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        this.actualLogin(e);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode:", errorCode);
        console.log("errorMessage:", errorMessage);
      });
  }

  actualLogin(e) {
    const { email, password, feedback } = e;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        const res = result.user;

        //get rest of user data
        this.database
          .collection(`users`)
          .where("email", "==", res.email)
          .get()
          .then(querySnapshot => {
            //set new current prototype
            this.user = {
              id: querySnapshot.docs[0].id,
              doc: querySnapshot.docs[0].data()
            };

            localStorage.setItem("authUser", JSON.stringify(this.user));
          })
          .catch(e => console.log(e));
      })
      .catch(error => {
        error.message = feedback;
      });
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign-out successful");
        this.user = false;
        localStorage.removeItem("authUser");
      })
      .catch(error => {
        console.log("Sign-out failed:", error);
      });
  }

  registerUser(fileurl = "") {
    this.loading = true;
    this.loadingReady = false;

    const toSendData = {
      email: this.formObject.email,
      name: this.formObject.name,
      type: this.formObject.type,
      ownerLocation: this.formObject.stad,
      birthday: this.formObject.birthday,
      skills: this.formObject.skills,
      hobby: this.formObject.hobby,
      profilepic: fileurl,
      specialisation: this.formObject.specialisation,
      ageCategory: this.formObject.ageCategory
    };

    for (let key in toSendData) {
      if (toSendData[key] === undefined) {
        delete toSendData[key];
      }
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.formObject.email,
        this.formObject.password
      )
      .then(() => {
        this.database
          .collection(`users`)
          .add(toSendData)
          .then(user => {
            this.user = {
              id: user.id,
              doc: toSendData
            };

            localStorage.setItem("authUser", JSON.stringify(this.user));
            this.loading = false;
            this.loadingReady = true;
          });
      });
  }

  register() {
    console.log("STORE FORMOBJECT:", this.formObject);
    if (this.formObject.profilepicfile === undefined) {
      this.registerUser();
    } else {
      const extension = this.formObject.profilepicfile.name.split(".").pop();
      const imgLocation = this.storage
        .ref()
        .child(`profilePics/${this.formObject.email}.${extension}`);

      imgLocation
        .put(this.formObject.profilepicfile)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            this.registerUser(url);
          });
        })
        .catch(error => {
          console.log(error.message);
        });
    }
  }

  handleChangeLogin(e) {
    const input = e.currentTarget;
    if (input.name === "email") {
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
    //last trackId
    let lastIndex = 0;

    //remove active class from clips
    this.clips.forEach((clip, index) => {
      if (clip.isActiveClip) {
        this.clips[index].isActiveClip = false;
      }

      //add clip after there track clips
      if (clip.trackId === newClip.trackId) {
        lastIndex = index;
      }
    });

    //add to clips
    this.clips.push(newClip);

    //move new clip to the correct position
    let test = this.clips;
    test = test.sort((a, b) => a.trackId - b.trackId);
    this.clips = test;

    this.clips.forEach((clip, index) => {
      if (clip.id === newClip.id) {
        //set active clip
        this.clips[index].isActiveClip = true;

        //set index
        this.activeClipIndex = index;
      }
    });

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
        if (clip.id === data.id) {
          //set the new duration
          this.clips[index].duration = duration;

          //set clip max duration
          clip.maxDuration = maxDuration;
        }
      });

      //update total length
      this.updateTotalClipsLength();
    }
  }

  updateTotalClipsLength() {
    //reset totalClipsLength
    let newTotalClipsLength = 0;

    //reset totalTrackLengths
    let newTotalTrackLengths = {};

    //calc totalClipsLength
    this.clips.forEach(clip => {
      newTotalClipsLength += clip.duration;

      //check if track exists
      if (newTotalTrackLengths[clip.trackId] === undefined) {
        //if not set to 0
        newTotalTrackLengths[clip.trackId] = 0;
      }

      //set total clip length per track
      newTotalTrackLengths[clip.trackId] += clip.duration;
    });

    //update the total clip length
    this.totalTrackLengths = newTotalTrackLengths;

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

    //check if move track or move index
    if (toSwapVal !== undefined) {
      if (toSwapVal.trackId === this.clips[currentIndex].trackId) {
        //move by index
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
      } else {
        //move by track
        let newTrackId = this.clips[currentIndex].trackId + direction;

        //limit track id
        if (newTrackId < 1) {
          newTrackId = 1;
        }

        this.clips[currentIndex].trackId = newTrackId;
      }
    } else {
      //move by track
      let newTrackId = this.clips[currentIndex].trackId + direction;

      //limit track id
      if (newTrackId < 1) {
        newTrackId = 1;
      }

      this.clips[currentIndex].trackId = newTrackId;
    }

    //update length of clips
    this.updateTotalClipsLength();
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
    this.loading = true;
    this.loadingReady = false;

    //send data
    this.database
      .collection(`projects`)
      .doc(this.currentProjectId)
      .collection(`comments`)
      .add({
        comment: comment,
        timeStamp: timeStamp,
        profilepic: this.user.doc.profilepic
      })
      .then(() => {
        console.log("Document successfully written!");

        //update comments
        this.getComments();
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  uploadPrototypeComment(comment, timeStamp, protoTypeId) {
    this.loading = true;
    this.loadingReady = false;

    //send data
    this.database
      .collection(`prototypes`)
      .doc(protoTypeId)
      .collection(`comments`)
      .add({
        comment: comment,
        timeStamp: timeStamp,
        profilepic: this.user.doc.profilepic
      })
      .then(e => {
        console.log("Document successfully written!");
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
  }

  getComments() {
    this.database
      .collection(`projects`)
      .doc(this.currentProjectId)
      .collection(`comments`)
      .get()
      .then(querySnapshot => {
        console.log("Document got!");
        querySnapshot.forEach((doc, index) => {
          if (index === 0) {
            //empty old comments
            this.commentsCurrentProject = [];
          }

          //data
          const currentComment = doc.data();
          let timeStampExists = false;

          //check if time code already exists
          this.commentsCurrentProject.forEach(comment => {
            //timeStamp;
            if (comment.timeStamp === currentComment.timeStamp) {
              timeStampExists = true;
            }
          });

          if (!timeStampExists) {
            this.commentsCurrentProject.push(doc.data());
          }
        });
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  }

  getPrototypeComments(id) {
    this.database
      .collection(`prototypes`)
      .doc(id)
      .collection(`comments`)
      .get()
      .then(querySnapshot => {
        console.log("Document got!");

        //empty first
        this.commentsCurrentPrototype = [];

        querySnapshot.forEach(doc => {
          this.commentsCurrentPrototype.push(doc.data());
        });
      })
      .catch(error => {
        console.error("Error getting document: ", error);
      });
  }

  uploadClips() {
    this.loading = true;
    this.loadingReady = false;
    //check if there are clips
    if (this.clips.length > 0) {
      //create form data
      let data = new FormData();

      const metaData = new FormData();

      //go throug clips and add the data
      this.clips.forEach((clip, index) => {
        //append data to form
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
          if (index === this.clips.length - 1) {
            //all videos have been send
            //send the metha data from all the clips
            fetch("http://localhost:5000/postclipsmetadata", {
              method: "POST",
              body: metaData
            })
              .then(r => r.text())
              .then(videoUrl => {
                //video done loading
                //save data to server
                if (this.formContent.editorType === 0) {
                  //add project to file

                  const toSendData = {};

                  //add user data to toSendData
                  toSendData.profilepic = this.user.doc.profilepic;
                  toSendData.created = new Date();
                  toSendData.likes = 0;
                  toSendData.owner = this.user.doc.name;
                  toSendData.user_id = this.user.id;
                  toSendData.stad = this.user.doc.stad;

                  //add form data
                  for (const key in store.formContent) {
                    toSendData[key] = store.formContent[key];
                  }

                  //add video
                  toSendData.mainvid = videoUrl;

                  //delete editorType
                  delete toSendData.editorType;

                  // set title
                  toSendData.title = this.message;

                  //send data to server
                  this.database
                    .collection(`projects`)
                    .add(toSendData)
                    .then(project => {
                      console.log("Document successfully written!");
                      this.newProjectId = project.id;
                      this.loading = false;
                      this.loadingReady = true;
                    })
                    .catch(error => {
                      console.error("Error writing document: ", error);
                    });
                } else if (this.formContent.editorType === 1) {
                  //add project to file
                  const toSendData = {};

                  //add user data to toSendData
                  toSendData.owner = this.user.doc.name;
                  toSendData.ownerLocation = this.user.doc.stad;
                  toSendData.ownerProfilePic = this.user.doc.profilepic;

                  //add form data
                  for (const key in store.formContent) {
                    toSendData[key] = store.formContent[key];
                  }

                  //add video
                  toSendData.video = videoUrl;

                  //delete editorType
                  delete toSendData.editorType;

                  //send data to server
                  this.database
                    .collection(`prototypes`)
                    .add(toSendData)
                    .then(r => {
                      console.log("Document successfully written!");
                      //write data to correct part of the project
                      this.loading = false;
                      this.loadingReady = true;
                    })
                    .catch(error => {
                      console.error("Error writing document: ", error);
                    });

                  //add user to contributors if not already present
                  let constributorExists = false;
                  let activeProject = false;

                  this.allProjects.forEach(project => {
                    if (this.currentProjectId === project.id) {
                      //set active project
                      activeProject = project;
                      if (project.doc.contributors !== undefined) {
                        project.doc.contributors.forEach(contributor => {
                          if (
                            contributor.profilePic !== this.user.doc.profilepic
                          ) {
                            constributorExists = true;
                          }
                        });
                      }
                    }
                  });
                  console.log(
                    "contributer exist",
                    this.user.doc.profilepic,
                    this.user.doc.type
                  );
                  if (!constributorExists) {
                    //add contributor
                    activeProject.doc.contributors.push({
                      profilePic: this.user.doc.profilepic,
                      type: this.user.doc.type
                    });

                    //add contributors if he doesn't exist jet
                    this.database
                      .collection(`projects`)
                      .doc(this.currentProjectId)
                      .set(activeProject)
                      .then(r => {
                        console.log("Document successfully written!");
                      })
                      .catch(error => {
                        console.error("Error writing document: ", error);
                      });
                  }
                }
              });
          }
        });

        data = new FormData();
      });
    }
  }

  getProjectBranches(level = 1, parentPrototypeId = "0", whipLevel = false) {
    //whipLevel if needed
    if (whipLevel) {
      delete this.prototypeLevels[level];
    }

    this.database
      .collection(`prototypes`)
      .where("projectId", "==", this.currentProjectId)
      .where("fase", "==", level.toString())
      .where("parentPrototypeId", "==", parentPrototypeId)
      .get()
      .then(querySnapshot => {
        let isFirst = true;

        //check if there is anything here
        if (querySnapshot.docs.length > 0) {
          //setup docs for this level
          querySnapshot.docs.forEach(doc => {
            let isActive = false;

            //push data to correct level
            if (this.prototypeLevels[level] === undefined) {
              this.prototypeLevels[level] = [];
              isActive = true;
            }

            //create data object
            const protoData = {
              id: doc.id,
              doc: doc.data(),
              isActive: isActive
            };

            //check for doubles
            let isDouble = false;

            this.prototypeLevels[level].forEach(protoType => {
              if (protoType.id === protoData.id) {
                //already exists
                isDouble = true;
              }
            });

            //if no double add to array
            if (!isDouble) {
              this.prototypeLevels[level].push(protoData);
            }

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

  createAfterMovie() {
    let data = new FormData();

    //save prototype links to server
    for (var key in this.prototypeLevels) {
      // eslint-disable-next-line no-loop-func
      this.prototypeLevels[key].forEach(level => {
        if (level.id === this.selectedPrototypeIds[key - 1]) {
          data.append(`videoLinks`, level.doc.video);
        }
      });
    }

    //post data to server
    fetch("http://localhost:5000/createaftermovie", {
      method: "POST",
      body: data
    }).then(r => {
      console.log(r);
    });
  }

  getAllProjects() {
    //.orderBy("created")
    this.database.collection("projects").onSnapshot(snapshot => {
      const changes = snapshot.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          let exists = false;

          //check if exists already
          this.allProjects.forEach(project => {
            if (project.id === change.doc.id) {
              exists = true;
            }
          });

          //add to array
          if (!exists) {
            this.allProjects.push({
              id: change.doc.id,
              doc: change.doc.data()
            });
          }
        } else if (change.type === "removed") {
          //remove from array
          this.allProjects = this.allProjects.filter(elem => elem !== change);
        }
      });
    });
  }

  setCurrentPrototype(id) {
    this.database
      .collection(`prototypes`)
      .doc(id)
      .get()
      .then(querySnapshot => {
        //set new current prototype
        const protoData = { id: querySnapshot.id, doc: querySnapshot.data() };
        this.currentPrototype = protoData;
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
  notesCurrentProject: observable,
  message: observable,
  totalTrackLengths: observable,
  allProjects: observable,
  buurtCounter: observable,
  formObject: observable,
  step: observable,
  maxSteps: observable,
  currentPrototype: observable,
  projectUpdatesCounter: observable,
  setVisibleCards: observable,
  sliderAmount: observable,
  loading: observable,
  loadingReady: observable,
  newProjectId: observable
});

const store = new Store();
export default store;
