const SVG_NS = "http://www.w3.org/2000/svg";
const SUITS = [
  { symbol: "♠", color: "#223d36" },
  { symbol: "♥", color: "#c64f59" },
  { symbol: "♦", color: "#c64f59" },
  { symbol: "♣", color: "#223d36" },
];
const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const introPanel = document.querySelector("#intro-panel");
const gamePanel = document.querySelector("#game-panel");
const countPanel = document.querySelector("#count-panel");
const revealPanel = document.querySelector("#reveal-panel");
const gameTitle = document.querySelector("#game-title");
const gameInstruction = document.querySelector("#game-instruction");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const playAgainButton = document.querySelector("#play-again-button");
const pileBoard = document.querySelector("#pile-board");
const roundKicker = document.querySelector("#round-kicker");
const roundNumber = document.querySelector("#round-number");
const progressFill = document.querySelector("#progress-fill");
const liveMessage = document.querySelector("#live-message");
const countGrid = document.querySelector("#count-grid");
const countCurrent = document.querySelector("#count-current");
const countProgressFill = document.querySelector("#count-progress-fill");
const countStatus = document.querySelector("#count-status");
const revealCard = document.querySelector("#reveal-card");

let deck = [];
let round = 1;
let isGathering = false;
let shuffleTimer = null;
let dealTimer = null;
let countTimers = [];

function createDeck() {
  const cards = SUITS.flatMap((suit) =>
    RANKS.map((rank) => ({ rank, suit: suit.symbol, color: suit.color })),
  );

  for (let index = cards.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]];
  }

  return cards.slice(0, 21);
}

function makeSvgElement(name, attributes = {}, text = "") {
  const element = document.createElementNS(SVG_NS, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (text) element.textContent = text;
  return element;
}

function createCardSvg(card) {
  const svg = makeSvgElement("svg", {
    class: "playing-card-svg",
    viewBox: "0 0 120 164",
    role: "img",
    "aria-label": `${card.rank} of ${card.suit}`,
  });

  svg.append(
    makeSvgElement("rect", {
      x: "1",
      y: "1",
      width: "118",
      height: "162",
      rx: "12",
      fill: "#fffefa",
      stroke: "#e3e6df",
      "stroke-width": "2",
    }),
  );

  const corner = makeSvgElement("g", {
    fill: card.color,
    "font-family": "Georgia, serif",
    "font-weight": "700",
    "text-anchor": "middle",
  });
  corner.append(
    makeSvgElement("text", { x: "19", y: "25", "font-size": "19" }, card.rank),
    makeSvgElement("text", { x: "19", y: "44", "font-size": "16" }, card.suit),
  );
  svg.append(corner);

  const bottomCorner = makeSvgElement("g", {
    fill: card.color,
    "font-family": "Georgia, serif",
    "font-weight": "700",
    "text-anchor": "middle",
    transform: "rotate(180 60 82)",
  });
  bottomCorner.append(
    makeSvgElement("text", { x: "19", y: "25", "font-size": "19" }, card.rank),
    makeSvgElement("text", { x: "19", y: "44", "font-size": "16" }, card.suit),
  );
  svg.append(bottomCorner);

  const faceRank = ["J", "Q", "K"].includes(card.rank);
  if (faceRank) {
    svg.append(
      makeSvgElement(
        "text",
        {
          x: "60",
          y: "86",
          fill: card.color,
          "font-family": "Georgia, serif",
          "font-size": "45",
          "font-weight": "700",
          "text-anchor": "middle",
          "dominant-baseline": "middle",
        },
        card.rank,
      ),
      makeSvgElement(
        "text",
        {
          x: "60",
          y: "121",
          fill: card.color,
          "font-family": "Georgia, serif",
          "font-size": "27",
          "text-anchor": "middle",
          "dominant-baseline": "middle",
        },
        card.suit,
      ),
    );
  } else {
    svg.append(
      makeSvgElement(
        "text",
        {
          x: "60",
          y: "91",
          fill: card.color,
          "font-family": "Georgia, serif",
          "font-size": card.rank === "A" ? "62" : "50",
          "text-anchor": "middle",
          "dominant-baseline": "middle",
        },
        card.suit,
      ),
    );
  }

  return svg;
}

function dealCards(cards) {
  const piles = [[], [], []];
  cards.forEach((card, index) => piles[index % 3].push(card));
  return piles;
}

function renderCard(card, className = "card-slot") {
  const slot = document.createElement("span");
  slot.className = className;
  slot.append(createCardSvg(card));
  return slot;
}

function renderCountCard(card, index) {
  const item = document.createElement("div");
  item.className = "count-item";
  item.setAttribute("role", "listitem");
  item.setAttribute("aria-label", `Card ${index + 1}`);

  const cardShell = document.createElement("span");
  cardShell.className = "count-card";
  const flip = document.createElement("span");
  flip.className = "count-card-flip";

  const back = document.createElement("span");
  back.className = "count-card-face count-card-back";
  const backMark = document.createElement("span");
  backMark.className = "count-back-mark";
  backMark.textContent = "21";
  back.append(backMark);

  const face = document.createElement("span");
  face.className = "count-card-face count-card-front";
  face.append(renderCard(card, "count-front-slot"));

  const number = document.createElement("span");
  number.className = "count-index";
  number.textContent = String(index + 1).padStart(2, "0");

  flip.append(back, face);
  cardShell.append(flip);
  item.append(cardShell, number);
  return item;
}

function renderHeroCards() {
  const heroCards = document.querySelector("#hero-cards");
  const samples = [
    { rank: "A", suit: "♠", color: "#223d36" },
    { rank: "7", suit: "♥", color: "#c64f59" },
    { rank: "Q", suit: "♦", color: "#c64f59" },
  ];

  samples.forEach((card) => heroCards.append(renderCard(card, "hero-card")));
}

function renderRound({ animateDeal = false, countAfterDeal = false } = {}) {
  const piles = dealCards(deck);
  if (dealTimer !== null) {
    window.clearTimeout(dealTimer);
    dealTimer = null;
  }
  pileBoard.classList.remove("is-gathering", "is-shuffling", "is-dealing");
  roundKicker.textContent = `ROUND ${round} OF 3`;
  gameTitle.textContent = countAfterDeal
    ? "The deck is back in three piles."
    : "Which pile holds your card?";
  gameInstruction.textContent = countAfterDeal
    ? "Now we’ll count to the card in the middle."
    : "Find your card, then choose its pile.";
  roundNumber.textContent = String(round).padStart(2, "0");
  progressFill.style.width = `${(round / 3) * 100}%`;
  liveMessage.textContent = countAfterDeal
    ? "The three piles are dealt. Counting starts in a moment…"
    : "Your card is in one of these piles. Take a good look.";
  pileBoard.replaceChildren();

  piles.forEach((pile, pileIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pile-choice";
    button.disabled = countAfterDeal;
    button.setAttribute(
      "aria-label",
      `Pile ${pileIndex + 1}: ${pile.map((card) => `${card.rank}${card.suit}`).join(", ")}`,
    );
    button.innerHTML = `
      <span class="pile-heading">
        <span class="pile-name">Pile ${pileIndex + 1}</span>
        <span class="pile-count">7 CARDS</span>
      </span>
      <span class="pile-cards"></span>
    `;

    const cardContainer = button.querySelector(".pile-cards");
    pile.forEach((card) => cardContainer.append(renderCard(card)));
    button.addEventListener("click", () => choosePile(pileIndex));
    pileBoard.append(button);
  });

  if (animateDeal) {
    pileBoard.classList.add("is-dealing");
    dealTimer = window.setTimeout(() => {
      pileBoard.classList.remove("is-dealing");
      dealTimer = null;
    }, 650);
  }
}

function choosePile(pileIndex) {
  if (isGathering) return;

  if (dealTimer !== null) {
    window.clearTimeout(dealTimer);
    dealTimer = null;
  }
  isGathering = true;
  pileBoard.classList.remove("is-dealing");
  pileBoard.classList.add("is-gathering");
  const choices = [...pileBoard.querySelectorAll(".pile-choice")];
  choices.forEach((button) => {
    button.disabled = true;
    button.classList.remove("is-selected", "is-dimmed", "is-shuffling");
  });

  liveMessage.textContent = `Pile ${pileIndex + 1} selected. Gathering all three piles…`;

  shuffleTimer = window.setTimeout(() => {
    shuffleTimer = null;
    pileBoard.classList.remove("is-gathering");
    pileBoard.classList.add("is-shuffling");
    liveMessage.textContent = "All three piles are together. Shuffling the deck…";

    shuffleTimer = window.setTimeout(() => {
      shuffleTimer = null;
      const piles = dealCards(deck);
      const selectedPile = piles[pileIndex];
      const otherPiles = piles.filter((_, index) => index !== pileIndex);
      deck = [...otherPiles[0], ...selectedPile, ...otherPiles[1]];

      if (round === 3) {
        isGathering = false;
        renderRound({ animateDeal: true, countAfterDeal: true });
        countTimers.push(window.setTimeout(startCounting, 1050));
        return;
      }

      round += 1;
      isGathering = false;
      renderRound({ animateDeal: true });
    }, 540);
  }, 640);
}

function clearMotionTimers() {
  if (shuffleTimer !== null) {
    window.clearTimeout(shuffleTimer);
    shuffleTimer = null;
  }
  if (dealTimer !== null) {
    window.clearTimeout(dealTimer);
    dealTimer = null;
  }
  countTimers.forEach((timer) => window.clearTimeout(timer));
  countTimers = [];
}

function startCounting() {
  clearMotionTimers();
  isGathering = false;
  gamePanel.hidden = true;
  revealPanel.hidden = true;
  countPanel.hidden = false;
  restartButton.hidden = false;

  const firstEleven = deck.slice(0, 11);
  countGrid.replaceChildren(...firstEleven.map(renderCountCard));
  countCurrent.textContent = "00";
  countProgressFill.style.width = "0%";
  countStatus.textContent = "Counting the cards to find the one in the middle…";
  countPanel.scrollIntoView({ behavior: "smooth", block: "start" });

  firstEleven.forEach((_, index) => {
    const timer = window.setTimeout(() => {
      const item = countGrid.children[index];
      item.classList.add("is-counted");
      countCurrent.textContent = String(index + 1).padStart(2, "0");
      countProgressFill.style.width = `${((index + 1) / 11) * 100}%`;
      countStatus.textContent = `Counting card ${index + 1} of 11…`;

      if (index === 10) {
        countStatus.textContent = "Card 11 — the one in the middle. Found it!";
        const revealTimer = window.setTimeout(() => showReveal(deck[10]), 850);
        countTimers.push(revealTimer);
      }
    }, 260 + index * 330);
    countTimers.push(timer);
  });
}

function startGame() {
  clearMotionTimers();
  deck = createDeck();
  round = 1;
  isGathering = false;
  introPanel.hidden = true;
  countPanel.hidden = true;
  revealPanel.hidden = true;
  gamePanel.hidden = false;
  restartButton.hidden = false;
  renderRound();
  gamePanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showReveal(card) {
  clearMotionTimers();
  isGathering = false;
  gamePanel.hidden = true;
  countPanel.hidden = true;
  revealPanel.hidden = false;
  restartButton.hidden = false;
  revealCard.replaceChildren(renderCard(card, "card-slot"));
  revealPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

renderHeroCards();
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);

