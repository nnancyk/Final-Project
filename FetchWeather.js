let zipForm = document.getElementById('zipForm');

// zipForm.addEventListener("submit", zipSubmit);

function zipSubmit() {
    let zipcode = document.getElementById("zipcode");

    if (zipcode.value == "") {
        alert("Input zipcode");
    }

    else {
        fetch('http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid=e4ef714a46fb2b1bd0d07a7483838984')
        .then(response => response.json())
        .then(displayData)
    }
}

//const displayData=(weather)=>{
////    zipForm.innerText=
//}
