let citiesData = [];
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        initFirstMapView();
    }
}

function loadCountries() {
    const Http = new XMLHttpRequest();
    const host = window.location.host;
    const url = 'http://' + host + '/cities';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            const cities = JSON.parse(Http.responseText);
            for (let i = 0; i < cities.length; i++) {
                citiesData.push({
                    name: cities[i].name,
                    country: cities[i].country,
                    latitude: cities[i].latitude,
                    longitude: cities[i].longitude
                })
                addCityByName(cities[i].name);
            }
        }
    }
}

function initFirstMapView() {
    let map = L.map('map').setView([41.637, 41.679], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
}

function setMapLatitudeAndLongitude(latitude, longitude) {
    resetMap();
    let map = L.map('map').setView([latitude, longitude], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);
}

function findCityDataByCityName(cityName) {
    let cityDataResult = null;
    for (let cityData of citiesData) {
        if (cityData.name === cityName) {
            cityDataResult = cityData;
            break;
        }
    }
    return cityDataResult;
}

function resetMap() {
    if (L.DomUtil.get('map')) {
        L.DomUtil.get('map')._leaflet_id = null;
    }
}

function showSelectedCity() {
    let cityName = document.getElementById("currentCityNameId").value;
    if (cityName) {
        const cityData = findCityDataByCityName(cityName)
        if (cityData) {
            setMapLatitudeAndLongitude(cityData.latitude, cityData.longitude)
        }
    }
}

function addCityByName(countryName) {
    let my_list = document.getElementById("Country");
    my_list.innerHTML = my_list.innerHTML + '<option value="' + countryName + '">';
}