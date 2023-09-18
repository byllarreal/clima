const apiKey = "29e0262f4f8f634a640dcaa1f87938a8"; // Obtén una API Key de OpenWeatherMap
const getWeatherButton = document.getElementById("get-weather-button");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");
const tempoInfo = document.getElementById("tempo-info");





getWeatherButton.addEventListener("click", () => {
  const city = cityInput.value;

  if (city) {
    getWeather(city);
  } else {
    alert("Por favor, ingrese una ciudad.");
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    const data = await response.json();

    if (response.ok) {
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const cityName = data.name;
      const country = data.sys.country;
      const icon=data.weather[0].icon;
      const lon=data.coord.lon;
      const lat=data.coord.lat;
      const tempmin=Math.round(data.main.temp_min - 273.15);
      const tempmax=Math.round(data.main.temp_max - 273.15);

      var myMap = L.map('map').setView([lat, lon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(myMap);
      L.marker([lat, lon]).addTo(myMap).bindPopup(cityName).openPopup();   
      
      
      weatherInfo.innerHTML = `
            <div style='display:flex'>  
              <div>
                <h1>Clima en ${cityName}, ${country}:</h1>
                <h2>Temperatura: ${temperature}°C</h2>
                <h2>Descripción: ${description}</h2>                
             </div>
             <div>
                <img src='https://openweathermap.org/img/wn/${icon}@2x.png'></img>      
             </div>
            </div> 
            `;
        
      tempoInfo.innerHTML = `
            <div style='display:flex'>  
              <div>
                <h1>Temperatura: ${temperature}°C</h1>
                <h2>Temperatura Máxima: ${tempmax}°C</h2>     
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.5 2c.827 0 1.5.673 1.5 1.5v7.525c0 1.569.514 2.287 1.411 3.05 1.01.858 1.589 2.106 1.589 3.425 0 2.481-2.019 4.5-4.5 4.5s-4.5-2.019-4.5-4.5c0-1.319.579-2.567 1.59-3.425.896-.761 1.41-1.48 1.41-3.05v-7.525c0-.827.673-1.5 1.5-1.5zm0-2c-1.933 0-3.5 1.567-3.5 3.5v7.525c0 .587-.258 1.145-.705 1.525-1.403 1.192-2.295 2.965-2.295 4.95 0 3.59 2.909 6.5 6.5 6.5s6.5-2.91 6.5-6.5c0-1.985-.892-3.758-2.295-4.95-.447-.38-.705-.938-.705-1.525v-7.525c0-1.933-1.567-3.5-3.5-3.5zm2.107 14.718c-1.012-.89-1.607-1.734-1.607-3.22v-6.498h-1v6.498c0 1.484-.597 2.332-1.607 3.22-.794.698-1.393 1.642-1.393 2.782 0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5c0-1.14-.599-2.083-1.393-2.782zm11.393-8.718h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>           
                <h2>Temperatura Mínima: ${tempmin}°C</h2> 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.5 2c.827 0 1.5.673 1.5 1.5v7.525c0 1.569.514 2.287 1.411 3.05 1.01.858 1.589 2.106 1.589 3.425 0 2.481-2.019 4.5-4.5 4.5s-4.5-2.019-4.5-4.5c0-1.319.579-2.567 1.59-3.425.896-.761 1.41-1.48 1.41-3.05v-7.525c0-.827.673-1.5 1.5-1.5zm0-2c-1.933 0-3.5 1.567-3.5 3.5v7.525c0 .587-.258 1.145-.705 1.525-1.403 1.192-2.295 2.965-2.295 4.95 0 3.59 2.909 6.5 6.5 6.5s6.5-2.91 6.5-6.5c0-1.985-.892-3.758-2.295-4.95-.447-.38-.705-.938-.705-1.525v-7.525c0-1.933-1.567-3.5-3.5-3.5zm2.107 14.718c-1.012-.89-1.607-1.734-1.607-3.22v-1.498h-1v1.498c0 1.484-.597 2.332-1.607 3.22-.794.698-1.393 1.642-1.393 2.782 0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5c0-1.14-.599-2.083-1.393-2.782zm3.393-8.718v2h8v-2h-8z"/></svg>               
             </div>
             <div>
             
             </div>
            </div> 
            `;            

    } else {
      weatherInfo.textContent = "Ciudad no encontrada.";
    }
  } catch (error) {
    console.error("Error:", error);
    weatherInfo.textContent = "Ocurrió un error al obtener el clima.";

  }
}

