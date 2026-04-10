const apiKey = "2406551df80c4747ff13a968c5f06b27";

function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {

        // ❗ error check
        if (data.cod !== 200) {
            alert("City not found ❌");
            return;
        }

        displayWeather(data);
        getForecast(city);
        setBackground(data.weather[0].main);
    })
    .catch(() => {
        alert("Something went wrong ⚠️");
    });
}

function displayWeather(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function toggleMode() {
    document.body.classList.toggle("dark");
}
