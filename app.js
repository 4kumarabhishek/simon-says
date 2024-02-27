let gameSeq = [];
let userSeq = [];

let btns = ["red", "blue", "yellow", "purple"];

let started = false;
let level = 0;

let highestScore = 0;

let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game has started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("gameflash");
  setTimeout(function () {
    btn.classList.remove("gameflash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp(), 500);
    }
  } else {
    if (highestScore < level) {
      h4.innerHTML = `Game Over! Your score was <b>${level}</b>. <br/> Highest Score = ${level}. Press any key to start`;
      highestScore = level;
    } else {
      h4.innerHTML = `Game Over! Your score was <b>${level}</b>. Highest Score = ${highestScore}. Press any key to start`;
    }
    redFlash();
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function levelUp() {
  userSeq = [];
  level++;
  h4.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}

function redFlash() {
  document.querySelector("body").style.backgroundColor = "red";
}
