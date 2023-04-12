const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

/**
 * Start the game by hiding the start button and shuffling the questions
 */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

/**
 * Start the game by hiding the start button and shuffling the questions
 */
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

/**
 * Set the next question
 */
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Show the question and its answers
 * @param {Object} question 
 */
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

/**
 * Reset the state of the game
 */
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/**
 * Select an answer and set the status class
 * @param {Event} e 
 */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

/**
 * Set the status class
 * @param {HTMLElement} element 
 * @param {Boolean} correct 
 */
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

/**
 * Clear the status class
 * @param {HTMLElement} element 
 */
 
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Đặc trưng cơ bản về khí hậu của miền Bắc và Đông Bắc Bắc Bộ là:',
    answers: [ 
      { text: 'A. gió phơn Tây Nam', correct: false },
      { text: 'B. tính chất nhiệt đới tăng dần theo hướng nam.', correct: false },
      { text: 'C. gió mùa Đông Bắc hoạt động mạnh tạo nên mùa đông lạnh.', correct: true },
      { text: 'D. có một mùa khô và mùa mưa rõ rệt.', correct: false }
    ]
  },
  {
    question: 'Các dãy núi trong miền Tây Bắc và Bắc Trung Bộ chạy theo hướng chính là',
    answers: [
      { text: 'A. tây bắc - đông nam.', correct: true},
      { text: 'B. tây nam - đông bắc', correct: false },
      { text: 'C. đông - tây.', correct: false },
      { text: 'D. bắc - nam.', correct: false }
    ]
  },
  {
    question: 'Khoáng sản nổi bật của miền Nam Trung Bộ và Nam Bộ là',
    answers: [
      { text: 'A. than đá, apatit.', correct: false },
      { text: 'B. đá vôi, quặng sắt.', correct: false },
      { text: 'C. dầu khí, bôxit. ', correct: true },
      { text: 'D. thiếc, đá vôi.', correct: false }
    ]
  },
  {
    question: 'Đặc điểm không đúng với thiên nhiên miền Bắc và Đông Bắc Bắc Bộ?',
    answers: [
      { text: 'A. Đai cao nhiệt đới hạ thấp', correct: false },
      { text: 'B. Có nhiều loại thực vật phương Bắc', correct: false },
      { text: 'c. Khoáng sản chủ yếu là than đá, đá vôi, thiếc', correct: false },
      { text: 'D. Địa hình bờ biển', correct: true }
    ]
  },
];