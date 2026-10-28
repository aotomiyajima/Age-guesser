const question = document.getElementById('question');
const result = document.getElementById('result');
const lowerButton = document.getElementById('lower');
const correctButton = document.getElementById('correct');
const higherButton = document.getElementById('higher');
const restartButton = document.getElementById('restart');
const answerButtons = [lowerButton, correctButton, higherButton];

let minAge;
let maxAge;
let guess;
let isPlaying;
let attempts;

function showQuestion() {
  guess = Math.floor((minAge + maxAge) / 2);
  attempts += 1;
  question.textContent = `あなたは${guess}歳ですか？`;
}

function finishGame(message) {
  isPlaying = false;
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
    finishGame('回答に合う年齢がありません。0〜120歳の年齢で、もう一度遊んでください。');
    return;
  }

  showQuestion();
}

function restartGame() {
  minAge = 0;
  maxAge = 120;
  isPlaying = true;
  attempts = 0;
  result.textContent = '';
  answerButtons.forEach((button) => {
    button.disabled = false;
  });
  showQuestion();
}

lowerButton.addEventListener('click', () => narrowRange('lower'));
higherButton.addEventListener('click', () => narrowRange('higher'));
correctButton.addEventListener('click', () => {
  if (!isPlaying) return;
  finishGame(`あなたの年齢は${guess}歳ですね！ たった${attempts}回で当てました！`);
});
restartButton.addEventListener('click', restartGame);

restartGame();
