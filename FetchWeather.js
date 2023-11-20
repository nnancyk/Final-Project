window.addEventListener("DOMContentLoaded", (event) => {
    const zipForm = document.getElementById('submitButton');
    if(zipForm){
        zipForm.addEventListener("submit", zipSubmit);

    }
});

const zipcode = document.getElementById("zipcode");

console.log("hello");

function zipSubmit() {

    console.log("hello2");
    

    if (zipcode.value == "") {
        alert("Input zipcode");
    }

    else {
        
        console.log("hello3");

        geocodeZip();
    }

       console.log("hello4");
}

function geocodeZip() {
    console.log("geocode test");

    var geocoder = new google.maps.Geocoder();
    var lat = '';
    var lang = '';

    geocoder.geocode( {
        componentRestrictions: {
            country: 'IN',
            postalCode: zipcode
        }
    }, function(results, status) {
        if (status == google.maps.GeocoderStatusOK) {
            lat = results[0].geometry.location.lat();
            lang = results[0].geometry.location.lang();
            console.log(lat, lang);
        }
        else {
            alert("Geocode was not successful because " + alert);
        }
    });
}
