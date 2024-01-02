window.addEventListener("DOMContentLoaded", (event) => {
    console.log("hello");

    const submitButton = document.getElementById("submitButton");
    if(submitButton){
        submitButton.addEventListener("submit", zipSubmit);
    }
});

function zipSubmit() {
    var zipcode = document.getElementById("zipcode").value;
    console.log(zipcode);
    
    if (!zipcode) {
        alert("Input zipcode");
    }
    else {
        getWeatherData(zipcode);
    }
}

function getWeatherData(zipcodeP) {
  const apiKey = 'e4ef714a46fb2b1bd0d07a7483838984';
  const zipcode = zipcodeP;
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=imperial`;

  fetch(apiEndpoint)
  .then(response => response.json())
  .then(data => {
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    console.log(`Current Temperature: ${temperature}F`);
    console.log(`Current Weather: ${description}`);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    alert('Error fetching weather data.');
  });
}

