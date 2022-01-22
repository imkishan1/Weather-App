
const api = {
    key: "f905521362bac21ed147b7e149062990",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchbox  = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query){

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}
getResults('new delhi');
function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city .cityName');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main; 

    // let weather_des = document.querySelector('.description');
    // weather_des.innerText = weather.weather[0].description; 

    let hilow = document.querySelector('.low-temp');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c `;

    let hilow1 = document.querySelector('.temp-high');
    hilow1.innerText = `${Math.round(weather.main.temp_max)}°c`;

    let wind = document.querySelector('.windGroup .windSpeedValue');
    wind.innerText = `${weather.wind.speed} Km/h`

    let Winddirection = document.querySelector('.windGroup .direction');
    Winddirection.innerText = `${(weather.wind.deg)}° N`;

//   let iconset=document.getElementById("icon");
//   iconset.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.main.icon}@2x.png"/>`;

    if ((weather.weather[0].main)=="Haze") {
        document.getElementById("icon").className = "fas fa-smog windy"; 
     
    }
    else if ((weather.weather[0].main)=="Clouds"){
        document.getElementById("app-wrap").classList.remove("sunny");
        document.getElementById("app-wrap").classList.remove("clear");
        document.getElementById("app-wrap").classList.remove("rain");
        document.getElementById("app-wrap").classList.remove("snow");
        document.getElementById("app-wrap").classList.remove("mist");
        document.getElementById("icon").className = "fas fa-cloud windy";
        document.getElementById("app-wrap").classList.add("clouds");
        // document.querySelector(".app-wrap").classList.add("clouds"); 
      
    }
    else if ((weather.weather[0].main)=="Clear"){
        document.getElementById("icon").className = "fas fa-cloud-sun windy"; 
        // document.querySelector(".app-wrap").style.background = ""
        document.getElementById("app-wrap").classList.remove("rain");
        document.getElementById("app-wrap").classList.remove("sunny");
        document.getElementById("app-wrap").classList.remove("mist"); 
        document.getElementById("app-wrap").classList.remove("clouds");
        document.getElementById("app-wrap").classList.remove("snow");
        document.getElementById("app-wrap").classList.add("clear");

    }
    else if ((weather.weather[0].main)=="Rain"){
        document.getElementById("app-wrap").classList.remove("sunny");
        document.getElementById("icon").className = "fas fa-cloud-showers-heavy windy"; 

        // document.getElementById("app-wrap").classList.remove("sunny");
        document.getElementById("app-wrap").classList.remove("clear");
        document.getElementById("app-wrap").classList.remove("mist");
        // document.getElementById("icon").className = "fas fa-cloud windy";
        document.getElementById("app-wrap").classList.remove("clouds");
        document.getElementById("app-wrap").classList.remove("snow");
        document.getElementById("app-wrap").classList.add("rain");
      
    }
    else if ((weather.weather[0].main)=="Drizzle"){
        document.getElementById("icon").className = "fas fa-cloud-rain windy"; 
      
    }
    else if ((weather.weather[0].main)=="Snow"){
        document.getElementById("icon").className = "fas fa-snowflake windy"; 
        
        document.getElementById("app-wrap").classList.remove("sunny");
        document.getElementById("app-wrap").classList.remove("clear");
        document.getElementById("app-wrap").classList.remove("mist");
        // document.getElementById("icon").className = "fas fa-cloud windy";
        document.getElementById("app-wrap").classList.remove("clouds");
        document.getElementById("app-wrap").classList.remove("rain");
        document.getElementById("app-wrap").classList.add("snow");
      
    }
    else if ((weather.weather[0].main)=="Thunderstorm"){
        document.getElementById("icon").className = "fas fa-poo-storm windy"; 
      
    }
    else if ((weather.weather[0].main)=="Smoke"){
        document.getElementById("icon").className = "fas fa-smog windy"; 
      
    }
    else if ((weather.weather[0].main)=="Mist"){
        document.getElementById("icon").className = "fas fa-water windy";
        document.getElementById("app-wrap").classList.remove("clouds"); 
        document.getElementById("app-wrap").classList.remove("sunny"); 
        document.getElementById("app-wrap").classList.remove("clear"); 
        document.getElementById("app-wrap").classList.remove("rain");
        document.getElementById("app-wrap").classList.remove("snow");
        document.getElementById("app-wrap").classList.add("mist"); 
      
    }
    else if ((weather.weather[0].main)=="Fog"){
        document.getElementById("icon").className = "fas fa-water windy"; 
      
    }
    else {
        document.getElementById("icon").className = "fas fa-sun windy";
        document.querySelector(".app-wrap").append.className = "sunny"; 
      
    }

}
function dateBuilder(d){
    let  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}



