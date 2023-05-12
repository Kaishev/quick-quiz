const questions = [
  {
    question: "Видишь там на горе...",
    answers: ["кресвышается вост", "возвышается крест", "показал мужик топор"],
    correct: 2,
  },

  {
    question: "Where is 'u'?",
    answers: ["u", "e", "y"],
    correct: 1,
  },

  {
    question: "Ёбаный рот...",
    answers: [
      "козёл ебаный",
      "блять",
      "этого казино",
      "ты кто такой чтоб это сделать",
    ],
    correct: 3,
  },
];

// находим элементы
const headerContainer = document.querySelector("#quiz-header");
const answersListContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

// переменные игры
let questionIndex = 0; // текущий вопрос
let score = 0; // кол-во правильных ответов

clearPage();
showQuestion();

function clearPage() {
  headerContainer.innerHTML = "";
  answersListContainer.innerHTML = "";
}

function showQuestion() {
  // показать вопрос
  const headerTemplate = `
    <h2 class="title">%title%</h2>
    `;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );

  headerContainer.innerHTML = title;

  // показать ответы
  questions[questionIndex]["answers"].forEach((answerText) => {
    const answersTemplate = `
      <li>
          <label>
            <input type="radio" class="answer" name="answer" />
            <span>%answer%</span>
          </label>
      </li>
    `;
    const answerHTML = answersTemplate.replace("%answer%", answerText);
    answersListContainer.innerHTML += answerHTML;
  });
}
