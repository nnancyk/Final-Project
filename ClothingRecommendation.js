/*
  Nancy Kim
  1/19/2024

  This program 
*/

function zipSubmit() {
    var zipcode = document.getElementById("zipcode").value;
    console.log(zipcode);
    
    if (!zipcode) {
        alert("Input zipcode");
    }
    else {
        fetchWeather(zipcode);
    }
}

function fetchWeather(zipcodeP) {
  const apiKey = 'e4ef714a46fb2b1bd0d07a7483838984';
  const zipcode = zipcodeP;
  const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=imperial`;

  fetch(apiEndpoint)
  .then(response => response.json())
  .then(data => {
    const city = data.name;
    const temp = data.main.temp;
    const descr = data.weather[0].description;
    const iconID = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
    
    console.log(`City: ${city}`);
    console.log(`Current Temperature: ${temp}F`);
    console.log(`Current Weather: ${descr}`);
    console.log(`Weather icon: ${iconID}`);
    
    document.getElementById("city").innerHTML = city;
    document.getElementById("weatherData").innerHTML = temp + "F, " + descr;
    document.getElementById('weatherIcon').src = iconUrl;
    
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.style.display = 'block';

    getRecommendation(temp, descr);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    alert('Error fetching weather data.');
  });
}

async function getRecommendation(tempP, descrP) {
  const question = "The weather is " + tempP + " degrees F and " + descrP + 
  ". Give me 1 outerwear, 1 top, 1 bottom, and 1 shoe recommendation." +
   "Format like this: outerwear: heavy down jacket. Don't use 'or'";

  if (!question) {
      alert('Prompt error.');
      return;
  }

  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  var response;
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: question
      }
    ]
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    response = data.choices[0].message.content;
    formatQuery(response);
  })
  .catch(error => {
    console.error('Error fetching data from OpenAI API:', error);
  });
}

function formatQuery(response) {
  const linesArray = response.split('\n');
  const modifiedArray = linesArray.map(line => line.replace(/^[^:]+: /, ' '));
  document.getElementById("openAI").innerHTML = modifiedArray;
  
  searchImages(modifiedArray);
  //const tempQueries =  ['buy green parka', 'buy white sneakers'];
  //searchImages(tempQueries);
}

var itemIndex = [0, 0, 0, 0];
var dataArray = [];

function searchImages(queries) {
  console.log(queries);
  const apiKey = 'AIzaSyCto-qUtmpIrQkpIH96ILduWLBb5_TvUbY';
  const cx = 'c37d426998d0747bf';

  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
      var query = queries[queryIndex];

      const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}&searchType=image`;
      console.log(apiUrl);

      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              dataArray[queryIndex] = data;
              displayImage(data.items[0], queryIndex);
          })
          .catch(error => console.error('Error fetching data:', error));

      console.log("api called");
      
      const refreshAllButton = document.getElementById('refreshAll');
      refreshAllButton.style.display = 'block';

      const refreshButton = document.getElementById('refreshButton' + queryIndex);
      refreshButton.style.display = 'block';
  }
  console.log(dataArray);
}

function displayImage(info, queryIndex) {
  const imageResultDiv = document.getElementById('imageResult' + queryIndex);
  imageResultDiv.innerHTML = '';

  if (info) {
      const imgElement = document.createElement('img');
      imgElement.src = info.link;
      imgElement.alt = info.title;
      imgElement.style.maxWidth = '200px';
      imgElement.style.margin = '5px';

      imgElement.addEventListener('click', function () {
          window.open(info.image.contextLink, '_blank');
      });

      imageResultDiv.appendChild(imgElement);
  } else {
      imageResultDiv.innerText = 'No image found.';
  }
}

function refresh(queryIndex) {
  console.log("refresh executed");
  if (itemIndex[queryIndex] === 9) {
    itemIndex[queryIndex] = 0;
    displayImage(dataArray[queryIndex].items[itemIndex[queryIndex]], queryIndex);
  } else {
    itemIndex[queryIndex] += 1;
    displayImage(dataArray[queryIndex].items[itemIndex[queryIndex]], queryIndex);
  }
}

function refreshAll() {
  console.log("refresh all executed");
  for (let queryIndex = 0; queryIndex < dataArray.length; queryIndex++) {
    refresh(queryIndex);
  }
}
