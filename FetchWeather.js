window.addEventListener("DOMContentLoaded", (event) => {
    const zipForm = document.getElementById('submitButton');
    if(zipForm){
        zipForm.addEventListener("submit", zipSubmit);

    }
});

console.log("hello");

function zipSubmit() {

    console.log("hello2");
    const zipcode = document.getElementById("zipcode");
    

    if (zipcode.value == "") {
        alert("Input zipcode");
    }

    else {
        
        console.log("hello3");

        geocode();
    }

       console.log("hello4");
}

function geocode() {
    var zip = zipcode;
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
            zipC:zip,
            key:'AIzaSyATztl6ig1jRMMYpEjHk5l_T75JBr73EKU'
        }
    })
    .then(function(response){
        console.long(response);
    })
    .catch(function(error){
        console.log("not valid zipcode");
    });
}
