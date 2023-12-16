window.addEventListener("DOMContentLoaded", (event) => {
    const submitButton = document.getElementById("submitButton");
    if(submitButton){
        submitButton.addEventListener("submit", zipSubmit);
    }
});

function zipSubmit() {
    var zipcode = document.getElementById("zipcode").value;
    console.log(zipcode);

    if (!zipcode) {
        console.log("hello2-1");
        alert("Input zipcode");
    }
    else {
        geocodeZip(zipcode);
    }
}

function geocodeZip(zipcodeP) {
    console.log("geocode test1"+": "+zipcodeP);

    const apiKey = '574c81a043dcbda2fafab25e1fa2085b';
    const zipCode = zipcodeP;
    const geocodingEndpoint = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;

    fetch(geocodingEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
       
      //hard lat long values
      //const latitude = 47.5301;
      //const longitude = -122.0326;

      console.log(`Latitude: ${latitude}`);
      console.log(`Longitude: ${longitude}`);

      getWeather(latitude, longitude);
    })
    .catch(error => {
      console.error('Error fetching geocoding data:', error);
    });
}

function getWeather(latP, longP) {
    const apiKey = 'e4ef714a46fb2b1bd0d07a7483838984';
    const latitude = latP;
    const longitude = longP;
    const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        if (data.main && data.main.temp) {
          const temperature = data.main.temp;
          const description = data.weather[0].description;

          console.log(`Current Temperature: ${temperature}°F`);
          console.log(`Current Weather: ${description}`);
        } else {
            console.error('Unable to fetch temperature data.');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
}
