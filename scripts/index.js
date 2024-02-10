"use strict";

const random = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

//* selectors
const aiImg = document.querySelector(".ai-choice-main img");
const userImg = document.querySelector(".user-choice-main img");
const userChoiceItem = document.querySelectorAll(".choice-item");
const winText = document.querySelector(".winner");
const userScore = document.querySelector(".user-score");
const aiScore = document.querySelector(".ai-score");

//* settings
let interval = null;
const options = {
  interval: 20,
  userScore: 0,
  aiScore: 0,
  currentUserChoice: 0,
  currentAiChoice: 0,
  result: "",
  gameDelay: 5000,
};

const strToNum = (str) => {
  const regex = /\d+/;
  const matches = str.match(regex);
  if (matches && matches.length > 0) {
    return Number(matches[0]);
  } else {
    return null;
  }
};

const manipulateButtons = (value) => {
  userChoiceItem.forEach((element) => {
    element.style.display = value;
  });
};

const playGame = (userChoice, aiChoice) => {
  if (userChoice === aiChoice) {
    options.result = "It is a tie";
  } else {
    switch (userChoice) {
      case 1:
        options.result = aiChoice === 3 ? "You Won!" : "You Lost!";
        break;
      case 2:
        options.result = aiChoice === 1 ? "You Won!" : "You Lost!";
        break;
      case 3:
        options.result = aiChoice === 2 ? "You Won!" : "You Lost!";
        break;
    }
    if (options.result == "You Won!") {
      options.userScore++;
    } else {
      options.aiScore++;
    }
    userScore.innerHTML = options.userScore;
    aiScore.innerHTML = options.aiScore;
  }
  winText.innerHTML = options.result;
  manipulateButtons("none");
  setTimeout(() => {
    interval = setInterval(generateAi, options.interval);
    winText.innerHTML = "The winner is...";
    manipulateButtons("block");
  }, options.gameDelay);
};

const generateAi = () => {
  let rand = random(1, 3);
  aiImg.setAttribute("src", `./img/${rand}.png`);
};

interval = setInterval(generateAi, options.interval);

userChoiceItem.forEach((elem) => {
  elem.addEventListener("click", () => {
    clearInterval(interval);
    let userChoice = elem.firstElementChild.getAttribute("src");
    userImg.setAttribute("src", userChoice);
    options.currentUserChoice = strToNum(userChoice);
    options.currentAiChoice = strToNum(aiImg.getAttribute("src"));
    //! remove after the debug is finished
    console.log(options);
    playGame(options.currentUserChoice, options.currentAiChoice);
  });
});
