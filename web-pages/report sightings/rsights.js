document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("nameForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name1").value;

    let nOutput = "";

    nOutput +=
      "Welcome " + name + "! How much have you seen?";
    document.getElementById("greet2").innerHTML = nOutput;
    console.log(nOutput);
  })

  //REPORT FORM
  document.getElementById("sightForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = {
        species: document.getElementById("sSpecies").value,
        location: document.getElementById("sLocation").value,
        date: document.geElementById("sDate").value,
        desc: document.getElementById("dArea").value,
        image: document.getElementById("sImg").value
      };
      
      //get sight input array
      let sights = JSON.parse(localStorage.getItem("sightData"));

      //if empty, make array
      if(!sights){
        sights = [];
      }

      //if object is not array, put object in array
      if(!Array.isArray(sights)){
        sights = [sights];
      }

        sights.push(formData);

      localStorage.setItem("sightData", JSON.stringify(sights));

      //display after
      displaySights();
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
        
        //get array from localStorage
        let sights = JSON.parse(localStorage.getItem("sightData")) || [];
        let output = "";

        //for each index in array (used array as objects have each index in the array which can be used to splice):
        for(let i = 0; i < sights.length; i++){
          
          //i = array index, report

          //species, locations, date, desc, image
          output +=
            "<b>" + sights[i].species + "</b><br><br>" +
            sights[i].locations + "<br>" +
            sights[i].date + "<br><br>" +
            sights[i].desc + "<br>" +
            sights[i].image +
            ' <button onclick="deleteSight(' + i + ')">Delete</button><br>';
            
        }

        document.getElementById("rList").innerHTML = output;
      }

      displaySights();