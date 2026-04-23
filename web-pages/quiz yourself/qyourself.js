function toggleMenu() {
            document.querySelector(".s-nav-wrap").classList.toggle("active");
        }

document.addEventListener("DOMContentLoaded", function () {

  let currentIndex = 0;
  let submitted = false;

  const questions = document.querySelectorAll(".question");
  const progressText = document.getElementById("progressText");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const answers = {
    q1: "~800",
    q2: "Illegal wildlife trade",
    q3: "Mabuwaya Foundation",
    q4: "13-20 years",
    q5: "3-5 years",
    q6: "Live insects",
    q7: "3-5 years",
    q8: "Katala Foundation",
    q9: "Palawan",
    q10: "Bowtie mark",
    q11: "Critically Endangered (CR)"
  };

  function updateQuestions() {
    questions.forEach((q, index) => {
      q.classList.remove("active", "prev");

      if (index === currentIndex) {
        q.classList.add("active");
      } else if (index < currentIndex) {
        q.classList.add("prev");
      }
    });

    progressText.textContent = `${currentIndex + 1} / ${questions.length}`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === questions.length - 1;

    prevBtn.style.opacity = prevBtn.disabled ? "0.4" : "1";
    nextBtn.style.opacity = nextBtn.disabled ? "0.4" : "1";
  }

  window.changeQuestion = function(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= questions.length) currentIndex = questions.length - 1;

    updateQuestions();
  };

  updateQuestions();

  document.getElementById("nameForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name1").value;

    let nOutput = "";

    nOutput +=
      "Welcome, " + name + "! Good luck and have fun!";
    document.getElementById("greet").innerHTML = nOutput;
    console.log(nOutput);
  })

  document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!confirm("Are you sure you want to submit your answers?")) {
      return;
    }

    var score = 0;
    let firstAnsweredIndex = null;

    for (let key in answers) {
      const selected = document.querySelector(`input[name="${key}"]:checked`);
      const questionDiv = document.querySelector(`input[name="${key}"]`).closest(".question");
      const feedbackDiv = questionDiv.querySelector(".feedback");

      const questionIndex = Array.from(questions).indexOf(questionDiv);

      if (selected) {
        if (firstAnsweredIndex === null) {
          firstAnsweredIndex = questionIndex;
        }

        if (selected.value === answers[key]) {
          feedbackDiv.innerHTML = "✅ Correct!";
          feedbackDiv.style.color = "green";
          score++;
        } else {
          feedbackDiv.innerHTML = `❌ Wrong. Correct answer: ${answers[key]}`;
          feedbackDiv.style.color = "red";
        }
      } else {
        feedbackDiv.innerHTML = "No answer selected.";
        feedbackDiv.style.color = "orange";
      }
    }

    alert(`You scored ${score} out of ${questions.length}`);

    //SCORES FUNCTION

    const formData = {
       objQScore: score
      };
      
      //get quiz scores input array
      let qScores = JSON.parse(localStorage.getItem("formData"));

      //if empty, make array
      if(!qScores){
        qScores = [];
      }

      //if object is not array, put object in array
      if(!Array.isArray(qScores)){
        qScores = [qScores];
      }

        // add scores
        qScores.push(formData);


      localStorage.setItem("formData", JSON.stringify(qScores));

      //display after
      displayScores();

    // Auto-slide to first answered question
    if (firstAnsweredIndex !== null) {
      currentIndex = firstAnsweredIndex;
      updateQuestions();
    }
  });

});

//other scores funcs

    //delete movie function
      function deleteScores(index){
        if(confirm("Are you sure you want to delete this score?")){
          let qScores = JSON.parse(localStorage.getItem("formData")) || [];
          
          qScores.splice(index, 1); //remove selected movie

          //no need for removeItem as setItem overrides it anyway
          localStorage.setItem("formData", JSON.stringify(qScores));

          displayScores();
        }
      }

    //display list function
      function displayScores(){
        
        //get array from localStorage
        let qScores = JSON.parse(localStorage.getItem("formData")) || [];
        let output = "";

        //for each index in array (used array as objects have each index in the array which can be used to splice):
        for(let i = 0; i < qScores.length; i++){
          
          //i = array index, movie
          output +=
            "Attempt " + (i+1) + ": " +
            qScores[i].objQScore + "/11" + "<br>" +
            ' <button onclick="deleteScores(' + i + ')">Delete</button><br>';
            
        }

        document.getElementById("sList").innerHTML = output;
      }

      displayScores();