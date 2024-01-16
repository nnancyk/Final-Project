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
    const temp = data.main.temp;
    const descr = data.weather[0].description;
    console.log(`Current Temperature: ${temp}F`);
    console.log(`Current Weather: ${descr}`);

    document.getElementById("weatherData").innerHTML = temp + "F" +"\n" + descr;

    //getRecommendation(temp, descr);
  })
  .catch(error => {
    console.error('Error fetching weather data:', error);
    alert('Error fetching weather data.');
  });
}

async function getRecommendation(tempP, descrP) {
  //const question = "Give me " + tempP + " degrees F in C";
  const question = "Today's weather is " + tempP + " degrees F and " + descrP + ". Give me 1 outerwear, 1 top, 1 bottom, and 1 shoe recommendation in less than 6 words each.";

  if (!question) {
      alert('Please enter a question.');
      return;
  }

  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
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
    const answer = data.choices[0].message.content;
    console.log(answer);
    document.getElementById("openAI").innerHTML = answer;
  })
  .catch(error => {
    console.error('Error fetching data from OpenAI API:', error);
  });

}