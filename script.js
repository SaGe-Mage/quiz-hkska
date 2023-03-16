import { team } from "./data.js";

const buttonImg = document.querySelector(".img_btn");
const button = document.querySelector(".reload");
const img = document.querySelector(".img");
const question = document.querySelector(".question");
const answer1 = document.querySelector(".answer_1");
const answer2 = document.querySelector(".answer_2");
const answer3 = document.querySelector(".answer_3");
const answer4 = document.querySelector(".answer_4");
const count = document.querySelector(".count");
const life = document.querySelector(".life");
const popup = document.querySelector(".popup");

const result = document.querySelector(".result");
const newGame = document.querySelector(".newGame");

let correct;
let cou = 0;
let lif = 3;

//====================LOGIC====================

function random1() {
  let num;
  let names = [];
  let otv = '';
  let img;

  for (let x = 0; x <= 3; x++) {
    let index = Math.floor(Math.random() * team.length);
    if (names.includes(team[index].name, 0)) {
      return random1();
    } else {
      if (x === 3) {
        otv = team[index].name;
        num = team[index].num;
        img = team[index].img;
      }
      names[x] = team[index].name;
    }
  };
  return [num, names, otv, img];
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

//====================INTERFACE====================

function answerCheck(params) {
  if (params.target.textContent == correct && !img.hasAttribute("style")) {
    cou++;
    count.textContent = cou;
  } else if (params.target.textContent == correct && img.hasAttribute("style")) {
    cou += 2;
    count.textContent = cou;
  } else {
    params.target.setAttribute('style', 'background-color: #ff1e30;');
    lif--;
    life.setAttribute('src', './img/heart' + lif + '.png');
  }
  if (lif == 0) {
    life.setAttribute('style', 'display: none;');
    button.setAttribute("disabled", "disabled");
    result.textContent = 'Ваш результат: ' + cou;
    popup.removeAttribute('style');
  } else {
    button.removeAttribute("disabled");
  }

  switch (correct) {
    case answer1.textContent:
      answer1.setAttribute('style', 'background-color: lime;');
      break;

    case answer2.textContent:
      answer2.setAttribute('style', 'background-color: lime;');
      break;

    case answer3.textContent:
      answer3.setAttribute('style', 'background-color: lime;');
      break;

    case answer4.textContent:
      answer4.setAttribute('style', 'background-color: lime;');
      break;

    default:
      break;
  }

  buttonImg.setAttribute('style', 'display: none;');
  img.removeAttribute('style');

  answer1.removeEventListener("click", answerCheck);
  answer2.removeEventListener("click", answerCheck);
  answer3.removeEventListener("click", answerCheck);
  answer4.removeEventListener("click", answerCheck);
}

buttonImg.addEventListener("click", (event) => {
  event.preventDefault();

  buttonImg.setAttribute('style', 'display: none;');
  img.removeAttribute('style');
})

newGame.addEventListener("click", (event) => {
  event.preventDefault();

  location.reload();
})

function runGame() {
  answer1.setAttribute('style', 'background-color: white;');
  answer2.setAttribute('style', 'background-color: white;');
  answer3.setAttribute('style', 'background-color: white;');
  answer4.setAttribute('style', 'background-color: white;');

  let index = random1();
  let newIndex = shuffle(index[1]);

  img.src = index[3];
  img.setAttribute('style', 'display: none;');
  buttonImg.removeAttribute('style');

  answer1.textContent = newIndex[0];
  answer2.textContent = newIndex[1];
  answer3.textContent = newIndex[2];
  answer4.textContent = newIndex[3];

  question.textContent = index[0];
  correct = index[2];

  button.textContent = "Дальше";
  button.setAttribute("disabled", "disabled");

  answer1.addEventListener("click", answerCheck);
  answer2.addEventListener("click", answerCheck);
  answer3.addEventListener("click", answerCheck);
  answer4.addEventListener("click", answerCheck);
}

button.addEventListener("click", (event) => {
  event.preventDefault();

  runGame();
})

window.onload = runGame;
