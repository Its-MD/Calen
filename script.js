const urlIcon = "http://openweathermap.org/img/wn/10d@2x.png";
let degText = document.querySelector(".degText");
let degNum = document.querySelector(".degNum");
let dateName = document.querySelector(".dateName");
let calenGrid = document.querySelector(".calenGrid");
let snowflakeBg = document.querySelector(".snowflakeBg");
let dayCounts = new Date(2022, new Date().getMonth()+1, 0).getDate();
let nameofCity = document.querySelector(".pickCity");
let pickCityBtn = document.querySelector(".pickCityBtn");
let iconChange = " ";
const url = `https://api.openweathermap.org/data/2.5/weather?q=ashdod&appid=5833d027ee30df0b8a3dd4ecc4ac4e25&units=metric`;

pickCityBtn.addEventListener("click", function(){
    let valueofCity = nameofCity.value;
    
})
fetch (url) 
.then(function(data){
    return data.json();
})
.then(function(convertedData){
    let integerDeg = Math.round(convertedData.main.temp);
    degNum.innerHTML = `${integerDeg}<span>&#176;</span>`;
    degText.innerHTML = convertedData.weather[0].description;
    const icon = convertedData.weather[0].icon;
    snowflakeBg.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
});
function getDateName(){
    let date = new Date().toLocaleDateString("en-US", { month: 'long'});
    dateName.innerHTML = `<i class="fas fa-calendar-alt"></i> ${date}`;
    return date;
}

getDateName();
setInterval(getDateName, 86400);

let nameOfMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
let dayOfWeek = new Date(`${nameOfMonth}${1}, 2022 23:15:00`).getDay();
for (i=0; i<dayOfWeek; i++){
    calenGrid.appendChild(document.createElement("div"));
}

//summer
if (nameOfMonth == "June" || nameOfMonth == "July" || nameOfMonth == "August"){
    iconChange ="fa-solid fa-sun";
}
//Autumn
if (nameOfMonth == "September" || nameOfMonth == "October" || nameOfMonth == "November"){
    iconChange ="fa-brands fa-canadian-maple-leaf";
}
//Winter
if (nameOfMonth == "December" || nameOfMonth == "January" || nameOfMonth == "February"){
    iconChange ="fa-solid fa-snowflake";
}
//Spring
if (nameOfMonth == "March" || nameOfMonth == "April" || nameOfMonth == "May"){
    iconChange ="fa-solid fa-seedling";
}

for(let i=1; i<= dayCounts; i++){
    let returnedValue = fillDayName(i);
    let div = document.createElement("div");
    div.classList.add("dayContainer");
    let innerCode = ` <div class="hoverContainer">
    <div class="front">
    <h2 class="dayNum">${i}</h2>
    <div class="frontMonth">
        <p class="frontMonthname">${getDateName()}</p>
        <i class="${iconChange}"></i>
    </div>
    </div>
    <div class="back">
        <h2 class="dayOfWeek">${returnedValue}</h2>
    </div>
    </div>`
    div.innerHTML = innerCode;
    calenGrid.appendChild(div);
}

function fillDayName(i){
    let monthData = new Date();
    let nameOfMonth = monthData.toLocaleDateString('en-US', { month: 'long' });
    let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayOfWeek = new Date(`${nameOfMonth}${i}, 2022 23:15:00`).getDay();
    let WeekDay = week[dayOfWeek];
    return WeekDay;
}

let calenItems = document.querySelectorAll(".dayContainer");
let currentDayNum = new Date().getDate();
let currentDay = calenItems[currentDayNum-1];
let currentFront = currentDay.querySelector(".front");

currentFront.classList.add("currentFrontClass");