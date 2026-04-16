document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("nameForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name1").value;

    let nOutput = "";

    nOutput +=
      "Welcome, " + name + "! How much have you seen?";
    document.getElementById("greet2").innerHTML = nOutput;
    console.log(nOutput);
  })

  //REPORT FORM
  document.getElementById("sightForm").addEventListener("submit", function(e) {
  e.preventDefault();

    const fileInput = document.getElementById("sImg");
    const file = fileInput.files[0];

    //for reading of images
    const reader = new FileReader();

    reader.onload = function(event) {

      const formData = {
        species: document.getElementById("sSpecies").value,
        location: document.getElementById("sLocation").value,
        date: document.getElementById("sDate").value,
        desc: document.getElementById("dArea").value,
        image: event.target.result, // image load (base 64)
      };

      //makes array on declaration of variable sighsts
      let sights = JSON.parse(localStorage.getItem("sightData")) || [];

      //if not array, turns into array
      if(!Array.isArray(sights)){
        sights = [sights];
      }

      sights.push(formData);

      localStorage.setItem("sightData", JSON.stringify(sights));

      displaySights();
      document.getElementById("sightForm").reset();
    };

    // if user selected image
    if(file){
      reader.readAsDataURL(file);
    } else {
      // if no image, still save
      reader.onload({ target: { result: "" } });
    }

    //alerts if file is greater than 2MB.
    if(file && file.size > 2 * 1024 * 1024){
      alert("Image too large! Please upload under 2MB.");
      return;
}
  });

});

//delete report function
      function deleteSight(index){
        if(confirm("Are you sure you want to delete this report?")){
          let sights = JSON.parse(localStorage.getItem("sightData")) || [];
          
          sights.splice(index, 1); //remove selected report

          //no need for removeItem as setItem overrides it anyway
          localStorage.setItem("sightData", JSON.stringify(sights));

          displaySights();
        }
      }

    //display list function
      function displaySights(){
        let sights = JSON.parse(localStorage.getItem("sightData")) || [];
        let output = "";

        for(let i = 0; i < sights.length; i++){

          let dateObj = new Date(sights[i].date);
          let formattedDate = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });

          let imageHTML = sights[i].image 
            ? `<img src="${sights[i].image}" class="report-img"><br><br><br>`
            : "<br><br><br>";

          output += `
            <div class="report-card">
              <h2 class="report-title">${sights[i].species}</h2>

              <p class="report-meta">
                ${sights[i].location}, ${formattedDate}
              </p>

              ${imageHTML}

              <p class="report-desc">${sights[i].desc}</p>

              <br><br>

              <button onclick="deleteSight(${i})">Delete</button>
            </div>
          `;
        }

        document.getElementById("rList").innerHTML = output;
      }

      displaySights();