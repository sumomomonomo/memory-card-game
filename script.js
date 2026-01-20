const cards = document.querySelectorAll(".memory-card");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let turnCount = 0;
const turnCountDisplay = document.getElementById("turn-count");

const clearMessage = document.getElementById("clear-message");
const clearCount = document.getElementById("clear-count");

cards.forEach(card => {
  card.addEventListener("click", flipCard);
});

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  // ★ カウント増加
  turnCount++;
  turnCountDisplay.textContent = turnCount;

  checkForMatch();
}

function checkForMatch() {
  const isMatch =
    firstCard.dataset.value === secondCard.dataset.value;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();

  // ★ クリア判定
  checkClear();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

shuffleCards();

function shuffleCards() {
  cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * 100);
    card.style.order = randomPos;
  });
}

const restartButton = document.getElementById("restart");

restartButton.addEventListener("click", restartGame);

function restartGame() {
  cards.forEach(card => {
    card.classList.remove("flip", "matched");

    card.removeEventListener("click", flipCard);
    card.addEventListener("click", flipCard);
  });

  resetBoard();
  shuffleCards();

  turnCount = 0;
  turnCountDisplay.textContent = 0;

  // ★ クリア表示を消す
  clearMessage.classList.add("d-none");
}

function checkClear() {
  const matchedCards = document.querySelectorAll(".memory-card.matched");

  if (matchedCards.length === cards.length) {
    clearCount.textContent = turnCount;
    clearMessage.classList.remove("d-none");
  }
}
