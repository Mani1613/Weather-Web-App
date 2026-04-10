const apiKey = "YOUR_API_KEY";

function getWeather() {
    const city = document.getElementById("city").value;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        displayWeather(data);
        getForecast(city);
        setBackground(data.weather[0].main);
    });
}

function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            displayWeather(data);
            getForecast(data.name);
            setBackground(data.weather[0].main);
        });
    });
}

function displayWeather(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("icon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {
        let output = "";
        for (let i = 0; i < data.list.length; i += 8) {
            const item = data.list[i];
            output += `
                <div>
                    <p>${item.dt_txt.split(" ")[0]}</p>
                    <p>${item.main.temp}°C</p>
                </div>
            `;
        }
        document.getElementById("forecast").innerHTML = output;
    });
}

function toggleMode() {
    document.body.classList.toggle("dark");
}

function setBackground(weather) {
    if (weather === "Rain") {
        document.body.style.background = "linear-gradient(#4e54c8, #8f94fb)";
    } else if (weather === "Clear") {
        document.body.style.background = "linear-gradient(#f7971e, #ffd200)";
    } else {
        document.body.style.background = "linear-gradient(#4facfe, #00f2fe)";
    }
}
