const question = document.getElementById('question');
const result = document.getElementById('result');
const lowerButton = document.getElementById('lower');
const correctButton = document.getElementById('correct');
const higherButton = document.getElementById('higher');
const restartButton = document.getElementById('restart');
const startButton = document.getElementById('start');
const character = document.getElementById('character');
const answerButtons = [lowerButton, correctButton, higherButton];

let minAge;
let maxAge;
let guess;
let isPlaying;
let attempts;

function updateCharacter() {
  // attemptsは、現在表示している質問のターン数。
  if (!isPlaying) {
    character.dataset.state = 'idle';
  } else if (attempts <= 3) {
    character.dataset.state = 'thinking';
  } else if (attempts <= 6) {
    character.dataset.state = 'inspired';
  } else {
    character.dataset.state = 'confident';
  }
}

function showQuestion() {
  guess = Math.floor((minAge + maxAge) / 2);
  attempts += 1;
  question.textContent = `あなたは${guess}歳？`;
  updateCharacter();
}

function finishGame(message) {
  isPlaying = false;
  updateCharacter();
  result.textContent = message;
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
}

function narrowRange(direction) {
  if (!isPlaying) return;

  if (direction === 'lower') {
    maxAge = guess - 1;
  } else {
    minAge = guess + 1;
  }

  if (minAge > maxAge) {
    finishGame('選択肢を間違えたかな？もう一度やり直そう');
    return;
  }

  showQuestion();
}

function restartGame() {
  minAge = 0;
  maxAge = 120;
  isPlaying = true;
  attempts = 0;
  startButton.hidden = true;
  restartButton.hidden = false;
  result.textContent = '';
  answerButtons.forEach((button) => {
    button.disabled = false;
  });
  showQuestion();
}

function prepareGame() {
  // 開始ボタンを押すまでは、キャラクターを通常の姿で待機させる。
  isPlaying = false;
  attempts = 0;
  question.textContent = '自分の年齢を思い浮かべよう';
  result.textContent = '';
  startButton.hidden = false;
  restartButton.hidden = true;
  answerButtons.forEach((button) => {
    button.disabled = true;
  });
  updateCharacter();
}

startButton.addEventListener('click', restartGame);
lowerButton.addEventListener('click', () => narrowRange('lower'));
higherButton.addEventListener('click', () => narrowRange('higher'));
correctButton.addEventListener('click', () => {
  if (!isPlaying) return;
  finishGame(`あなたは${guess}歳だね。 たった${attempts}回で当てたよ。`);
});
restartButton.addEventListener('click', restartGame);

prepareGame();
