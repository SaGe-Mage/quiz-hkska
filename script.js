import { team } from "./data.js";

const page = document.querySelector(".page");
const buttonImg = document.querySelector(".img_btn");
const button = document.querySelector(".relod");
const img = document.querySelector(".img");
const vopros = document.querySelector(".vopros");
const otvet1 = document.querySelector(".otvet_1");
const otvet2 = document.querySelector(".otvet_2");
const otvet3 = document.querySelector(".otvet_3");
const otvet4 = document.querySelector(".otvet_4");
const count = document.querySelector(".count");
const life = document.querySelector(".life");
const popup = document.querySelector(".popup");

const result = document.querySelector(".result");
const newGame = document.querySelector(".newGame");

let prav;
let cou = 0;
let lif = 3;

//====================LOGIC====================

function random1() {
  let num;
  let nams = [];
  let otv = '';
  let img;

  for (let x = 0; x <= 3; x++) {
    let index = Math.floor(Math.random() * team.length);
    if (nams.includes(team[index].name, 0)) {
      return random1();
    } else {
      if (x === 3) {
        otv = team[index].name;
        num = team[index].num;
        img = team[index].img;
      }
      nams[x] = team[index].name;
    }
  };
  return [num, nams, otv, img];
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

//====================INTERFACE====================

function otvetCheck(params) {
  if (params.target.textContent == prav && !img.hasAttribute("style")) {
    cou++;
    count.textContent = cou;
  } else if (params.target.textContent == prav && img.hasAttribute("style")) {
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

  switch (prav) {
    case otvet1.textContent:
      otvet1.setAttribute('style', 'background-color: lime;');
      break;

    case otvet2.textContent:
      otvet2.setAttribute('style', 'background-color: lime;');
      break;

    case otvet3.textContent:
      otvet3.setAttribute('style', 'background-color: lime;');
      break;

    case otvet4.textContent:
      otvet4.setAttribute('style', 'background-color: lime;');
      break;

    default:
      break;
  }

  buttonImg.setAttribute('style', 'display: none;');
  img.removeAttribute('style');

  otvet1.removeEventListener("click", otvetCheck);
  otvet2.removeEventListener("click", otvetCheck);
  otvet3.removeEventListener("click", otvetCheck);
  otvet4.removeEventListener("click", otvetCheck);
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
  otvet1.setAttribute('style', 'background-color: white;');
  otvet2.setAttribute('style', 'background-color: white;');
  otvet3.setAttribute('style', 'background-color: white;');
  otvet4.setAttribute('style', 'background-color: white;');

  let index = random1();
  let newi = shuffle(index[1]);

  img.src = index[3];
  img.setAttribute('style', 'display: none;');
  buttonImg.removeAttribute('style');

  otvet1.textContent = newi[0];
  otvet2.textContent = newi[1];
  otvet3.textContent = newi[2];
  otvet4.textContent = newi[3];

  vopros.textContent = index[0];
  prav = index[2];

  button.textContent = "Дальше";
  button.setAttribute("disabled", "disabled");

  otvet1.addEventListener("click", otvetCheck);
  otvet2.addEventListener("click", otvetCheck);
  otvet3.addEventListener("click", otvetCheck);
  otvet4.addEventListener("click", otvetCheck);
}

button.addEventListener("click", (event) => {
  event.preventDefault();

  runGame();
})

window.onload = runGame;
