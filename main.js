let htmlContainer = document.querySelector('.container');
let html = '';
const outerContainer = document.querySelector('.outer-container');

function myTime(){
  const currentDate = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov","Dec"];
  const currentDay = currentDate.getDay();
  const currentMonth = currentDate.getMonth();
  const date =currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();
  const hour = document.querySelector('.hours');
  const minute = document.querySelector('.minutes');
  const second = document.querySelector('.seconds');
  
  //Turn single digits into double digits
  const twoDigitHours = currentHour < 10 ? "0" + currentHour : currentHour;
  const twoDigitMinutes = currentMinute < 10 ? "0" + currentMinute : currentMinute;
  const twoDigitSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
  
  hour.innerHTML = twoDigitHours;
  minute.innerHTML = twoDigitMinutes;
  second.innerHTML = twoDigitSeconds;
  
  //Change background picture with respect to time
  if(currentHour < 4){
    outerContainer.style.backgroundImage = 'url("/night.jpeg")';
  }
  else if (currentHour < 4){
    outerContainer.style.backgroundImage = "url('/sunrise.jpeg')";
  } else if(currentHour > 10){
    outerContainer.style.backgroundImage = "url('/fairWeatheAtSunset.jpg')";
  }
    else if (currentHour < 18) {
    outerContainer.style.backgroundImage = 'url("/fairWeatheAtSunset.jpg")';
  } else if (currentHour > 18){
    outerContainer.style.backgroundImage = 'url("/night.jpeg")';
  }
}

setInterval(myTime, 1000);

    
function getWeather(city) {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=J9DYF6NJRYFNEE5XBM79XG3X6&contentType=json`, {
  "method": "GET",
  "headers": {}
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    const fahreinheit = (data.currentConditions.temp * 1.8) + 32;
    const fahreinheitMax = (data.days[1].feelslikemax * 1.8) + 32;
    const fahreinheitMin = (data.days[1].feelslikemin * 1.8) + 32;

    html = `
     <div class='box'>
        <div class='wave -one'></div>
        <div class='wave -two'></div>
        <div class='wave -three'></div>
        <div class="weathercon"><i class='fas fa-sun' style='color: #d36326;'></i></div>
        <div class="info">
            <h1 class="temp">${data.currentConditions.temp} &deg;C | ${(fahreinheit).toFixed()} &deg;F</h1>
            <h2 class="location">${data.resolvedAddress}</h2>
            <h3 class="description">${data.currentConditions.conditions}</h3>
        </div>
      </div>`;
    htmlContainer.innerHTML = html;
  }).catch(err => {
  console.error(err);
  });
}


const loading = document.querySelector('.loading');

const citySearch = document.querySelector('input');
citySearch.addEventListener('keyup', (event) => {
  if(event.key === 'Enter'){
    const newValue = event.target.value;
    getWeather(newValue);
    loading.innerHTML = "loading ....";
    citySearch.value = "";
  }
});
