const key = 'bb84ab8d65cc50ad2aea793168c939c5';
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const cardImage = document.querySelector('.card-top img');
const date = document.querySelector('.date');
const searchForm = document.querySelector('.search-location');
const cityValue = document.querySelector('.search-location input');

//window on load
window.addEventListener('load', function () {
    date.innerHTML = findDate()
});

//country data
const requestCity = (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
    const query = `?q=${city}&appid=${key}`;
    //make fetch call
    const fetchCall = fetch(baseURL + query)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            updateWeatherApp(data);
        })
        .catch((error) => {
            console.log(error);
        });
    return fetchCall;
};

//get and set date
function findDate() {
    let getDate = new Date()
    let getYear = getDate.getFullYear();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let getMonth = getDate.getMonth()
    let getDay = getDate.getDate()
    let setDate = `${months[getMonth]} ${getDay}, ${getYear}`;
    return setDate
}

//kelvin to celsius
const convertToCelsius = (kelvin) => {
    const celsius = Math.round(kelvin - 273.15);
    return celsius;
};

//day time or night time
const isDayTime = (icon) => {
    if (icon.includes('d')) {
        return true;
    } else {
        return false;
    }
};

//get weather update
const updateWeatherApp = (city) => {
    const image = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${image}@2x.png`;
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="date text-center">${findDate()}</div>
    <div class="card-mid row">
                    <div class="col-8 text-center temp">
                        <span>${convertToCelsius(city.main.temp)}&deg;C</span>
                    </div>
                    <div class="col-4 condition-temp">
                        <p class="condition">${city.weather[0].description}</p>
                        <p class="high">${convertToCelsius(city.main.temp_max)}&deg;C</p>
                        <p class="low">${convertToCelsius(city.main.temp_min)}&deg;C</p>
                    </div>
                </div>

                <div class="icon-container card shadow mx-auto">
                    <img src="${iconSrc}" alt="" />
                </div>
                <div class="card-bottom px-5 py-4 row">
                    <div class="col text-center">
                        <p>${convertToCelsius(city.main.feels_like)}&deg;C</p>
                        <span>Feels Like</span>
                    </div>
                    <div class="col text-center">
                        <p>${city.main.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
    `;

    //change image according to day or night
    if (isDayTime(image)) {
        cardImage.src = 'img/day_image.svg';
        if (cityName.classList.contains('text-white')) {
            cityName.classList.remove('text-white');
        } else {
            cityName.classList.add('text-black');
        }
    } else {
        cardImage.src = 'img/night_image.svg';
        if (cityName.classList.contains('text-black')) {
            cityName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white');
        }
    }
};

//Search
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchCity = cityValue.value.trim();
    searchForm.reset();
    requestCity(searchCity);
});