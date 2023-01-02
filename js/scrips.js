const p1El = document.querySelector('.player--0');
const p1ScoreEl = document.getElementById('score--0');
const p1CurrentScoreEl = document.getElementById('current--0');

const p2El = document.querySelector('.player--1');
const p2ScoreEl = document.getElementById('score--1');
const p2CurrentScoreEl = document.getElementById('current--1');

const diceImage = document.querySelector('.dice');
diceImage.classList.add('hidden');

const btnDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  p1El.classList.toggle('player--active');
  p2El.classList.toggle('player--active');
}

let currentScore, activePlayer, isPlaying, scores;
function init() {
  diceImage.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  scores = [0, 0];

  p1ScoreEl.innerText = 0;
  p2ScoreEl.innerText = 0;
  currentScore = 0;
  p1ScoreEl.innerText = 0;
  p2ScoreEl.innerText = 0;
  p1CurrentScoreEl.textContent = 0;
  p2CurrentScoreEl.textContent = 0;
  p1El.classList.remove('player--winner');
  p2El.classList.remove('player--winner');
  p1El.classList.add('player--active');
  p2El.classList.remove('player--active');
}

init();

btnDice.addEventListener('click', () => {
  if (isPlaying) {
    diceImage.classList.remove('hidden');
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  } else {
    isPlaying = false;
  }
});

btnHold.addEventListener('click', () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceImage.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
