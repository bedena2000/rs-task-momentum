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
  // Weather Items
  let weatherInput = document.querySelector(".weather-city");
  let weatherIcon = document.querySelector(".weather-icon");
  let weatherClouds = document.querySelector(".weather-clouds");
  let windSpeed = document.querySelector(".weather-wind-speed");
  let weatherHumidity = document.querySelector(".weather-humidity");
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
  weather: {
    weatherIconClass: null,
    weatherTemp: null,
    weatherClouds: null,
    weatherWindSpeed: null,
    weatherHumidity: null
  },
  apiKey: "442c6485c22aa2b7df54f85fba75e8b7",
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
async function getPosition(cityName) {
  try {
    let geolocation = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=${data.apiKey}&units=metric`);
    let result = await geolocation.json();
    data.weather.weatherIconClass = result.weather[0].id;
    data.weather.weatherTemp = result.main.temp;
    data.weather.weatherClouds = result.weather[0].description;
    data.weather.weatherWindSpeed = result.wind.speed;
    data.weather.weatherHumidity = result.main.humidity;
    weatherIcon.textContent = "";
    weatherIcon.classList = `weather-icon owf`;
    weatherIcon.classList.add(`owf-${data.weather.weatherIconClass}`);
    weatherClouds.textContent = `${Math.floor(data.weather.weatherTemp)}°C`;
    weatherClouds.textContent = weatherClouds.textContent + ` ${data.weather.weatherClouds}`;
    windSpeed.textContent = `Wind Speed: ${data.weather.weatherWindSpeed}`;
    weatherHumidity.textContent = `Humidity: ${data.weather.weatherHumidity}`;
    console.log(data);
  } catch (error) {
    weatherIcon.classList = "";
    weatherIcon.textContent = `Sorry we do not found anything`;
    weatherClouds.textContent = "";
    windSpeed.textContent = "";
    weatherHumidity.textContent = "";
    console.log(data);
  }
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
weatherInput.addEventListener("change", (event) => {
  let cityName = event.currentTarget.value.toLowerCase();
  if(cityName) {
    getPosition(cityName);
  }
});
weatherInput.addEventListener("submit", (event) => {
  let cityName = event.currentTarget.value.toLowerCase();
  if(cityName) {
    getPosition(cityName);
  }
});
// All Other Functions Execute
getPosition("tbilisi");
 

