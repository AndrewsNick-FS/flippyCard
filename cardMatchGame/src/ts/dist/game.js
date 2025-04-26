var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var cardValues = ["🍕", "🚀", "🎮", "🍕", "🚀", "🎮"];
    var cards = [];
    var flippedCards = [];
    var attemptsLeft = 3;
    var gameBoard = document.getElementById("game-board");
    var attemptsText = document.getElementById("attempts");
    var message = document.getElementById("message");
    var resetButton = document.getElementById("reset");
    function shuffle(array) {
        return array.sort(function () { return Math.random() - 0.5; });
    }
    function initializeGame() {
        gameBoard.innerHTML = "";
        cards = [];
        flippedCards = [];
        attemptsLeft = 3;
        attemptsText.textContent = attemptsLeft.toString();
        message.textContent = "";
        var shuffledValues = shuffle(__spreadArray([], cardValues, true));
        shuffledValues.forEach(function (value) {
            var cardElem = document.createElement("div");
            cardElem.className = "card";
            cardElem.setAttribute("data-value", value);
            var card = {
                element: cardElem,
                value: value,
                matched: false,
            };
            cardElem.addEventListener("click", function () { return flipCard(card); });
            gameBoard.appendChild(cardElem);
            cards.push(card);
        });
    }
    function flipCard(card) {
        if (card.matched ||
            flippedCards.includes(card) ||
            flippedCards.length === 2)
            return;
        card.element.classList.add("flipped");
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
    function checkMatch() {
        var card1 = flippedCards[0], card2 = flippedCards[1];
        if (card1.value === card2.value) {
            card1.matched = true;
            card2.matched = true;
            flippedCards = [];
            if (cards.every(function (card) { return card.matched; })) {
                message.textContent = "🎉 You win!";
            }
        }
        else {
            attemptsLeft--;
            attemptsText.textContent = attemptsLeft.toString();
            setTimeout(function () {
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
    function disableAllCards() {
        cards.forEach(function (card) {
            card.element.removeEventListener("click", function () { return flipCard(card); });
        });
    }
    resetButton.addEventListener("click", initializeGame);
    initializeGame();
})();
