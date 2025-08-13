//http://api.weatherapi.com/v1/current.json?key=7a04307c5eeb4468bc0183933251603&q=bhopal&aqi=no

const temperaturefield = document.querySelector('.temp p');
const locationfield = document.querySelector('.location p:first-child');
const dateandtimefield = document.querySelector('.location p:last-child');
const conditionfield = document.querySelector('.img p');
const searchfield = document.querySelector('.search-area'); // Fixed class name
const form = document.querySelector('form');

form.addEventListener('submit', searchforlocation);
let target = 'Bhopal';

const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=7a04307c5eeb4468bc0183933251603&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updatedetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("City not found! Please enter a valid city name.");
    }
};

function updatedetails(temp, locationName, time, condition) {
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    temperaturefield.innerText = `${temp}°C`;
    locationfield.innerText = locationName;
    dateandtimefield.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionfield.innerText = condition;
}

function searchforlocation(e) {
    e.preventDefault();

    target = searchfield.value.trim();
    if (target) {
        fetchResults(target);
    } else {
        alert("Please enter a city name.");
    }
}

fetchResults(target);

function getDayName(number) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[number];
}
