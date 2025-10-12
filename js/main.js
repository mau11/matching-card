// create a list of items with duplicates - should be even
const list = ["a", "a", "b", "b", "c", "c", "d", "d", "e", "e", "f", "f"];
const TOTAL_CARD_COUNT = list.length;

// shuffle list - used Fisher-Yates algorithm: https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const gameBoard = shuffle(list);
console.log(gameBoard);

// create board of cards
let index = 0;

for (let i = 0; i < TOTAL_CARD_COUNT; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.onclick = () => handleCardClick(card, i);
  document.querySelector("main").appendChild(card);
  index++;
}

let lastFlipped = {};
let totalMatches = 0;

function handleCardClick(card, index) {
  // flip card
  card.classList.add("active");

  if (!Object.keys(lastFlipped).length) {
    lastFlipped = { index, card };
  } else {
    const firstCard = lastFlipped.card;

    // check if match
    console.log("checking if match");

    setTimeout(() => {
      if (gameBoard[lastFlipped.index] === gameBoard[index]) {
        // disable click + leave flipped
        console.log("MATCH");
        totalMatches++;
        firstCard.onclick = null;
        lastFlipped = [];

        // check if game is complete
        if (totalMatches === TOTAL_CARD_COUNT / 2) {
          console.log("YOU WIN");
        }
      } else {
        console.log("NOT A MATCH");
        firstCard.classList.remove("active");
        card.classList.remove("active");
        lastFlipped = [];
      }
    }, 1000);
  }
}
