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

  document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (!confirm("Are you sure you want to submit your answers?")) {
      return;
    }

    let score = 0;
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

    // Auto-slide to first answered question
    if (firstAnsweredIndex !== null) {
      currentIndex = firstAnsweredIndex;
      updateQuestions();
    }
  });

});