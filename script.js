
let cards = ["😀","😀","😂","😂","😈","😈","😍","😍"];
let firstCard = null;
let secondCard = null;
let blockClick = false;

/* Shuffle cards */
cards.sort(() => 0.5 - Math.random());

let board = document.getElementById("board");

/* Create cards */
for (let i = 0; i < cards.length; i++) {
  let div = document.createElement("div");
  div.className = "card";
  div.dataset.value = cards[i];
  div.innerText = "?";

  div.onclick = function () {
    flipCard(this);
  };

  board.appendChild(div);
}

/* Flip card */
function flipCard(card) {
  if (blockClick) return;
  if (card === firstCard) return;

  card.innerText = card.dataset.value;
  card.classList.add("open");

  if (firstCard == null) {
    firstCard = card;
  } else {
    secondCard = card;
    blockClick = true;
    checkMatch();
  }
}

/* Check match */
function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard = null;
    secondCard = null;
    blockClick = false;
  } else {
    setTimeout(function () {
      firstCard.innerText = "?";
      secondCard.innerText = "?";
      firstCard.classList.remove("open");
      secondCard.classList.remove("open");

      firstCard = null;
      secondCard = null;
      blockClick = false;
    }, 800);
  }
}

/* Restart */
function restartGame() {
  location.reload();
}
