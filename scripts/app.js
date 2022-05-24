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
  // Time
  let timeTitle = document.querySelector(".time-title");
  let timeDayMonth = document.querySelector(".time-day-month");
  let dayTimeMessage = document.querySelector(".daytime-message");
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
// Data Time 
let monthAndDay = `${getCurrentDay()}, ${getCurrentMonth()} ${currentDay()}`;
timeDayMonth.textContent = monthAndDay;
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
  } catch (error) {
    weatherIcon.classList = "";
    weatherIcon.textContent = `Sorry we do not found anything`;
    weatherClouds.textContent = "";
    windSpeed.textContent = "";
    weatherHumidity.textContent = "";
    console.log(data);
  }
};
function getCurrentTime() {
  let currentDate = new Date();
  let currentHours = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();
  let currentSeconds = currentDate.getSeconds();
  let result = `${currentHours}:${currentMinutes}:${currentSeconds}`;
  return result;
};
function getCurrentDay() {
  let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let currentDate = new Date();
  let currentDay = weekDays[currentDate.getDay() - 1];
  return currentDay;
};
function getCurrentMonth() {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let currentMonth = new Date().getMonth();
  return month[currentMonth];
};
function currentDay() {
  let currentDayNumber = new Date().getDate();
  return currentDayNumber;
};

function displayTime() {
  let currentTime = getCurrentTime();
  timeTitle.textContent = currentTime;
};
displayTime();
setInterval(() => {
  displayTime();
}, 1000);
function changeWelcomeMessage() {
  let welcomeArray = ["Good morning", "Good day", "Good evening", "Good night"];
  let currentHour = new Date().getHours();
  if(currentHour > 6 && currentHour <= 12) {
    return welcomeArray[0];
  } else if (currentHour > 12 && currentHour <= 18) {
    return welcomeArray[1];
  } else if (currentHour > 18 && currentHour <= 24) {
    return welcomeArray[2];
  } else if (currentHour > 0 && currentHour <= 6) {
    return welcomeArray[3];
  };
};
let currentDayName = changeWelcomeMessage();
dayTimeMessage.textContent = currentDayName;
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
 

