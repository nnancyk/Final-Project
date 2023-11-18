
window.addEventListener("DOMContentLoaded", (event) => {
    const zipForm = document.getElementById('submitButton');
    if(zipForm){
        zipForm.addEventListener("submit", zipSubmit);

    }
});

console.log("hello");

function zipSubmit() {

    console.log("hello2);
    let zipcode = document.getElementById("zipcode");
    

    if (zipcode.value == "") {
        alert("Input zipcode");
    }

    else {
        
        console.log("hello3");

       // fetch('')
       // .then(response => response.json())
        //.then(displayData)
    }

       console.log("hello4");
}


//const displayData=(weather)=>{
////    zipForm.innerText=
//}