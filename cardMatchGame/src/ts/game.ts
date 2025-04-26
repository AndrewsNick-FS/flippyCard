import "../../src/styles/styles.scss";

(() => {
  interface Card {
    element: HTMLElement;
    value: string;
    matched: boolean;
  }

  const cardValues = ["🍕", "🚀", "🎮", "🍕", "🚀", "🎮"];
  let cards: Card[] = [];
  let flippedCards: Card[] = [];
  let attemptsLeft = 3;

  const gameBoard = document.getElementById("game-board")!;
  const attemptsText = document.getElementById("attempts")!;
  const message = document.getElementById("message")!;
  const resetButton = document.getElementById("reset")!;

  function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
  }

  function initializeGame(): void {
    gameBoard.innerHTML = "";
    cards = [];
    flippedCards = [];
    attemptsLeft = 3;
    attemptsText.textContent = attemptsLeft.toString();
    message.textContent = "";

    const shuffledValues = shuffle([...cardValues]);

    shuffledValues.forEach((value) => {
      const cardElem = document.createElement("div");
      cardElem.className = "card";
      cardElem.setAttribute("data-value", value);

      const card: Card = {
        element: cardElem,
        value: value,
        matched: false,
      };

      cardElem.addEventListener("click", () => flipCard(card));
      gameBoard.appendChild(cardElem);
      cards.push(card);
    });
  }

  function flipCard(card: Card): void {
    if (
      card.matched ||
      flippedCards.includes(card) ||
      flippedCards.length === 2
    )
      return;

    card.element.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

  function checkMatch(): void {
    const [card1, card2] = flippedCards;

    if (card1.value === card2.value) {
      card1.matched = true;
      card2.matched = true;
      flippedCards = [];

      if (cards.every((card) => card.matched)) {
        message.textContent = "🎉 You win!";
      }
    } else {
      attemptsLeft--;
      attemptsText.textContent = attemptsLeft.toString();

      setTimeout(() => {
        card1.element.classList.remove("flipped");
        card2.element.classList.remove("flipped");
        flippedCards = [];

        if (attemptsLeft === 0) {
          message.textContent = "😢 Out of attempts!";
          disableAllCards();
        }
      }, 1000);
    }
  }

  function disableAllCards(): void {
    cards.forEach((card) => {
      card.element.removeEventListener("click", () => flipCard(card));
    });
  }

  resetButton.addEventListener("click", initializeGame);
  initializeGame();
})();
