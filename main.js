const questions = [
  {
    question: "Смотря какой fabriс...",
    answers: ["производит шоколад", "смотря сколько details", "ААА!?", "очень afforible"],
    correct: 2,
  },

  {
    question: "Хорошо что сундуки...",
    answers: ["остались наверху", "открыты", "хранят тайны", "не взорвались"],
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
  
  {
    question: "Я монтирую, монтирую, а он...",
    answers: [
      "козёл ебаный",
      "блять",
      "взорвался нахуй",
      "не монтируется",
    ],
    correct: 3,
  },

  {
    question: "Так, а почему едет он? А?...",
    answers: [
      "а может быть ты",
      "А?",
      "а не ты",
      "а не я",
    ],
    correct: 4,
  },

  {
    question: "похо торо моронго и...",
    answers: [
      "пеперонни",
      "АННИГИЛЯТОРНАЯ ПУШКА!",
      "санчо панса",
      "огнором орот охоп",
    ],
    correct: 2,
  },
  
  {
    question: "у нас тут два мальчика катаются, не один...",
    answers: [
      "в поле",
      "да киселёчек?",
      "и не два",
      "не умеет",
    ],
    correct: 2,
  },
    
  {
    question: "Да ты хоть знаешь кто я? Я вор...",
    answers: [
      "в законе",
      "и вором останусь",
      "кхъа",
      "...онин",
    ],
    correct: 3,
  },   

  {
    question: "Начальник! Стоим...",
    answers: [
      "уже долго",
      "или не стоим?",
      "до конца",
      "...ость минимальна",
    ],
    correct: 2,
  },
  {
    question: "Доллар, доллар, доллар - это ...",
    answers: [
      "всё-таки деньги",
      "доллар",
      "а как иначе",
      "грррязная зелёная бумажка",
    ],
    correct: 4,
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
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  answersListContainer.innerHTML = "";
}

function showQuestion() {

  // показать вопрос
    const headerTemplate = `<h2 class="title">%questionText%</h2>`;

    const questionHTML = headerTemplate.replace("%questionText%", questions[questionIndex]["question"]);

    headerContainer.innerHTML = questionHTML;


  // показать ответы
    for ([answerNumber,answerText] of questions[questionIndex]['answers'].entries()) {

        const answersTemplate = `
            <li>
                <label>
                    <input value="%number%" type="radio" class="answer" name="answer" />
                    <span>%answer%</span>
                </label>
            </li>
        `;

        const answerHTML = answersTemplate
                        .replace("%answer%", answerText)
                        .replace('%number%', answerNumber+1);

        answersListContainer.innerHTML += answerHTML;
        answerNumber++;
        console.log(answerNumber, answerText)
    };
}

function checkAnswer() {
    console.log('checkAnswer started!');

  // Находим выбранную радиокнопку
    const checkedRadio = answersListContainer.querySelector('input[type="radio"]:checked');

  // Если ответ не выбран - выходим из функции
    if (!checkedRadio){
        submitBtn.blur();
        return
    };

  // Узнаём номер ответа пользователя
    const userAnswer = parseInt(checkedRadio.value);

    // Если ответ верен - увеличиваем счёт
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }

    console.log('score = ', score);

    if (questionIndex !== questions.length -1) {

        questionIndex++;
        clearPage();
        showQuestion();
        return;

    } else {

        clearPage();
        showResults();

    }
}

function showResults() {
    console.log('showResults started!', score);

    const resultTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="results">%results%</p>
    `;

    let resultsTitle, message;

    // Варианты заголовков и текста
    if (score === questions.length) {
        resultsTitle = 'Это успех! Да Вы эксперт по широко известным в узких кругах мемам!🎉';
        message = 'И дали максимальное количество правильных ответов!';
    } else if ((score * 100)/questions.length>=50) {
        resultsTitle = 'Довольно таки неплохо... 🤔';
        message = 'Вы дали более половины правильных ответов';
    } else if (score === 0) {
        resultsTitle = 'Ого! Поздравляем! 😎';
        message = 'Вы набрали отрицательный максимум правильных ответов!'
    } else {
        resultsTitle = 'Стоит постараться... 🥴';
        message = 'Пока у Вас меньше половины правильных ответов'
    }
    // Результат
    let results = `${score} из ${questions.length}`;

    // Финальный ответ, подставляем данные в шаблон
    const finalMessage = resultTemplate
                        .replace('%title%',resultsTitle)
                        .replace('%message%',message)
                        .replace('%results%',results);
        
    headerContainer.innerHTML = finalMessage;

    // Меняем кнопку на Играть снова
    submitBtn.blur();
    submitBtn.innerText = 'Начать заново'
    submitBtn.onclick = () => history.go();
}