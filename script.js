const questions = [
  {
    q: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Tool Multi Language"],
    answer: 1,
  },
  {
    q: "What is the correct syntax for referring to an external script called 'script.js'?",
    options: ["<script href='script.js'>", "<script src='script.js'>", "<script ref='script.js'>", "<script name='script.js'>"],
    answer: 1,
  },
  {
    q: "Which CSS property is used to change the text color?",
    options: ["font-style", "text-decoration", "color", "text-color"],
    answer: 2,
  }
];

let currentQuestion = 0;
let score = 0;

const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreSpan = document.getElementById("score");
const progress = document.getElementById("progress");

function showQuestion() {
  const q = questions[currentQuestion];
  questionElem.textContent = q.q;
  optionsElem.innerHTML = "";
  q.options.forEach((opt, index) => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = opt;
    btn.onclick = () => selectOption(btn, index);
    optionsElem.appendChild(btn);
  });

  progress.style.width = `${((currentQuestion) / questions.length) * 100}%`;
}

function selectOption(btn, index) {
  const isCorrect = index === questions[currentQuestion].answer;
  if (isCorrect) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    optionsElem.children[questions[currentQuestion].answer].classList.add("correct");
  }

  Array.from(optionsElem.children).forEach(opt => opt.onclick = null);
  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  nextBtn.disabled = true;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
};

function finishQuiz() {
  document.getElementById("question-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreSpan.textContent = `${score} / ${questions.length}`;
  progress.style.width = `100%`;
}

showQuestion();
nextBtn.disabled = true;