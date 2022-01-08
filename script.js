let music = new Audio('./music.mp3');
let audioTurn = new Audio('./ting.mp3');
// let winningSound = new Audio('./winningSound.mp3');
let winningSound1 = new Audio('./winningSound1.mp3');
let gameOver = new Audio('./gameover.mp3');
let turn = 'X';
let isGameOver = false;
let reset = document.getElementById('reset');
let isAllowed = true;
let totalClick = 0;
let winner = 0;

// Function to change the turn

const changeTurn = () => {
  return turn === 'X' ? '0' : 'X';
};

// Function to check win
const checkWin = () => {
  let boxTexts = document.getElementsByClassName('boxText');
  //   Actual winning logic!
  let wins = [
    [0, 1, 2, 3, 6, 0],
    [3, 4, 5, 3, 18, 0],
    [6, 7, 8, 3, 30, 0],
    [0, 3, 6, -9, 18, 90],
    [1, 4, 7, 3, 18, 90],
    [2, 5, 8, 15, 18, 90],
    [0, 4, 8, 4, 18, 45],
    [2, 4, 6, 3, 18, 135],
  ];
  wins.forEach((e) => {
    if (
      boxTexts[e[0]].innerText === boxTexts[e[1]].innerText &&
      boxTexts[e[1]].innerText === boxTexts[e[2]].innerText &&
      boxTexts[e[0]].innerText !== ''
    ) {
      winner = 1;
      document.querySelector('.info').innerText = `${
        boxTexts[e[0]].innerText
      } Won`;
      isGameOver = true;
      document
        .querySelector('.imgBox')
        .getElementsByTagName('img')[0].style.width = '200px';
      document.querySelector('.line').style.width = '30vw';
      document.querySelector(
        '.line'
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      isAllowed = false;
      winningSound1.play();
    } else {
    }
  });
};

// Game logic

let boxes = document.getElementsByClassName('box');

Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector('.boxText');
  element.addEventListener('click', () => {
    // music.play();
    if (boxText.innerText === '' && !isGameOver) {
      boxText.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      totalClick += 1;
      checkWin();
      if (totalClick === 9 && winner === 0) {
        gameOver.play();
        isGameOver = true;
      }
      if (!isGameOver) {
        document.getElementsByClassName(
          'info'
        )[0].innerText = `Turn for ${turn}`;
      }
    }
  });
});

// Add onClick listener to reset button
reset.addEventListener('click', () => {
  let boxText = document.querySelectorAll('.boxText');
  Array.from(boxText).forEach((element) => {
    element.innerText = '';
  });
  turn = 'X';
  isGameOver = false;
  document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width =
    '0px';
  document.getElementsByClassName('info')[0].innerText = `Turn for ${turn}`;
  document.querySelector('.line').style.width = '0vw';
  totalClick = 0;
  winner = 0;
});

if (totalClick === 9 && winner === 0) {
  gameOver.play();
  isGameOver = true;
}
