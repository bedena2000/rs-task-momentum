// Dom elements

  // Background Arrows
  let leftArrow = document.querySelector(".left-arrow");
  let rightArrow = document.querySelector(".right-arrow");
  // Music Player Arrows
  let musicPlayerLeftArrow = document.querySelector(".video-icon-prev");
  let musicPlayerPlayIcon = document.querySelector(".video-icon-start");
  let musicPlayerRightArrow = document.querySelector(".video-icon-next");
  // Music Player Items
  let musicPlayerItems = Array.from(document.querySelectorAll(".music-list-item"));
// State 
let randomNumber = Math.floor(Math.random() * 15 + 1);
let audio = new Audio();
const data = {
  currentNumber: randomNumber,
  musicIsPlay: false,
  currentSelectedMusic: 0,
  musicUrl: {
    0: "img/assets/sounds/Aqua Caelestis.mp3",
    1: "img/assets/sounds/River Flows In You.mp3",
    2: "img/assets/sounds/Summer Wind.mp3",
    3: "img/assets/sounds/Ennio Morricone.mp3"
  },
};
changeBackgroundImage(data.currentNumber);
// Video Player Logic

// Functions
function changeBackgroundImage(pictureNumber) {
  if(pictureNumber < 10) {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/afternoon/0${pictureNumber}.jpg')`;
  } else {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/afternoon/${pictureNumber}.jpg')`;
  }
};
function changeMusicPlay(state) {
  if(state) {
    musicPlayerPlayIcon.style.backgroundImage = `url("img/assets/svg/pause.svg")`;
  } else {
    musicPlayerPlayIcon.style.backgroundImage = `url("img/assets/svg/play.svg")`;
  }
};
function musicList() {
  musicPlayerItems.map(item => {
    item.classList.remove("music-list-item-active");
    musicPlayerItems[data.currentSelectedMusic].classList.add("music-list-item-active");
  });
};
function changeMusic() {
  audio.src = data.musicUrl[data.currentSelectedMusic];
  audio.play();
};
// Click Event
leftArrow.addEventListener("click", (event) => {
  if(data.currentNumber !== 1) {
    data.currentNumber = data.currentNumber - 1;
    changeBackgroundImage(data.currentNumber);
  } else {
    data.currentNumber = 15;
    changeBackgroundImage(data.currentNumber);
  };
});
rightArrow.addEventListener("click", (event) => {
  if(data.currentNumber !== 15) {
    data.currentNumber = data.currentNumber + 1;
    changeBackgroundImage(data.currentNumber);
  } else {
    data.currentNumber = 1;
    changeBackgroundImage(data.currentNumber);
  };
});
musicPlayerPlayIcon.addEventListener("click", (event) => {
  if(data.musicIsPlay) {
    data.musicIsPlay = false;
    changeMusicPlay(data.musicIsPlay);
    audio.pause();
  } else {
    data.musicIsPlay = true;
    changeMusicPlay(data.musicIsPlay);
    musicList();
    changeMusic();
  }
});
musicPlayerLeftArrow.addEventListener("click", (event) => {
  data.musicIsPlay = true;
  changeMusicPlay(data.musicIsPlay);
  if(data.currentSelectedMusic !== 0) {
    data.currentSelectedMusic = data.currentSelectedMusic - 1;
    musicList();
    changeMusic();
  } else {
    data.currentSelectedMusic = 3;
    musicList();
    changeMusic();
  }
});
musicPlayerRightArrow.addEventListener("click", (event) => {
  data.musicIsPlay = true;
  changeMusicPlay(data.musicIsPlay);
  if(data.currentSelectedMusic !== 3) {
    data.currentSelectedMusic = data.currentSelectedMusic + 1;
    musicList();
    changeMusic();
  } else {
    data.currentSelectedMusic = 0;
    musicList();
    changeMusic();
  }
});

// All Other Functions Execute


 

