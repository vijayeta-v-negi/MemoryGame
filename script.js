const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

const icons = ["🍎", "🍌", "🍇", "🍒", "🍍", "🥝", "🍉", "🍓"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

/* Shuffle Function (Fisher-Yates) */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* Create Cards */
function createBoard() {
  gameBoard.innerHTML = "";
  cards = [...icons, ...icons];
  shuffle(cards);

  cards.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;

    card.innerHTML = `
      <div class="card-face card-front">?</div>
      <div class="card-face card-back">${icon}</div>
    `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

/* Flip Card Logic */
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

/* Match Check */
function checkMatch() {
  const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

  isMatch ? disableCards() : unflipCards();
}

/* Keep matched cards open */
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

/* Flip back if not matched */
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 800);
}

/* Reset selection */
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

/* Restart Game */
restartBtn.addEventListener("click", createBoard);

/* Start Game */
createBoard();
