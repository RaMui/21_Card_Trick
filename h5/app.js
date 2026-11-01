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
const languageSelect = document.querySelector("#language-select");

window.I18n.init();

let deck = [];
let round = 1;
let isGathering = false;
let shuffleTimer = null;
let dealTimer = null;
let countTimers = [];
let currentPiles = [];
let gameMessageKey = "liveLook";
let gameMessageValues = {};
let countedCards = 0;
let countPhase = "initial";
let revealedCard = null;

const SUIT_LABEL_KEYS = {
  "♠": "suitSpades",
  "♥": "suitHearts",
  "♦": "suitDiamonds",
  "♣": "suitClubs",
};

function translate(key, values = {}) {
  return window.I18n.t(key, values);
}

function getCardLabel(card) {
  return translate("cardLabel", {
    rank: card.rank,
    suit: translate(SUIT_LABEL_KEYS[card.suit]),
  });
}

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
    "aria-label": getCardLabel(card),
    "data-card-rank": card.rank,
    "data-card-suit": card.suit,
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
    makeSvgElement("text", { class: "card-rank", x: "19", y: "25", "font-size": "19" }, card.rank),
    makeSvgElement("text", { class: "card-suit", x: "19", y: "44", "font-size": "16" }, card.suit),
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
    makeSvgElement("text", { class: "card-rank", x: "19", y: "25", "font-size": "19" }, card.rank),
    makeSvgElement("text", { class: "card-suit", x: "19", y: "44", "font-size": "16" }, card.suit),
  );
  svg.append(bottomCorner);

  const faceRank = ["J", "Q", "K"].includes(card.rank);
  if (faceRank) {
    svg.append(
      makeSvgElement(
        "text",
        {
          class: "card-rank",
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
          class: "card-suit",
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
          class: "card-suit",
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

function collectPileInMiddle(pileIndex) {
  const piles = dealCards(deck);
  const selectedPile = piles[pileIndex];
  const otherPiles = piles.filter((_, index) => index !== pileIndex);
  deck = [...otherPiles[0], ...selectedPile, ...otherPiles[1]];
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
  item.dataset.cardNumber = String(index + 1);
  item.setAttribute("aria-label", translate("cardNumberLabel", { number: index + 1 }));

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

function renderRound({ animateDeal = false } = {}) {
  const piles = dealCards(deck);
  currentPiles = piles;
  if (dealTimer !== null) {
    window.clearTimeout(dealTimer);
    dealTimer = null;
  }
  pileBoard.classList.remove("is-gathering", "is-shuffling", "is-dealing");
  roundKicker.textContent = translate("roundKicker", { round });
  gameTitle.textContent = translate("gameTitle");
  gameInstruction.textContent = translate("gameInstruction");
  roundNumber.textContent = String(round).padStart(2, "0");
  progressFill.style.width = `${(round / 3) * 100}%`;
  setGameMessage("liveLook");
  pileBoard.replaceChildren();

  piles.forEach((pile, pileIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pile-choice";
    button.innerHTML = `
      <span class="pile-heading">
        <span class="pile-name"></span>
        <span class="pile-count"></span>
      </span>
      <span class="pile-cards"></span>
    `;
    button.querySelector(".pile-name").textContent = translate("pileName", { number: pileIndex + 1 });
    button.querySelector(".pile-count").textContent = translate("pileCount");
    button.setAttribute("aria-label", translate("pileAria", {
      number: pileIndex + 1,
      cards: pile.map(getCardLabel).join(", "),
    }));

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

function setGameMessage(key, values = {}) {
  gameMessageKey = key;
  gameMessageValues = values;
  liveMessage.textContent = translate(key, values);
}

function updateCountStatus() {
  if (countPhase === "initial") {
    countStatus.textContent = translate("countInitial");
  } else if (countPhase === "counting") {
    countStatus.textContent = translate("countingCard", { number: countedCards });
  } else if (countPhase === "finding") {
    countStatus.textContent = translate("countFinding");
  } else if (countPhase === "found") {
    countStatus.textContent = translate("targetFound");
  }
}

function refreshCardLabels() {
  document.querySelectorAll(".playing-card-svg[data-card-rank]").forEach((svg) => {
    svg.setAttribute("aria-label", getCardLabel({
      rank: svg.dataset.cardRank,
      suit: svg.dataset.cardSuit,
    }));
  });
  countGrid.querySelectorAll(".count-item[data-card-number]").forEach((item) => {
    item.setAttribute(
      "aria-label",
      translate("cardNumberLabel", { number: item.dataset.cardNumber }),
    );
  });
}

function refreshPileLabels() {
  currentPiles.forEach((pile, pileIndex) => {
    const button = pileBoard.children[pileIndex];
    if (!button) return;

    button.querySelector(".pile-name").textContent = translate("pileName", { number: pileIndex + 1 });
    button.querySelector(".pile-count").textContent = translate("pileCount");
    button.setAttribute("aria-label", translate("pileAria", {
      number: pileIndex + 1,
      cards: pile.map(getCardLabel).join(", "),
    }));
  });
}

function refreshLanguageDependentState() {
  refreshCardLabels();
  refreshPileLabels();

  if (!gamePanel.hidden) {
    roundKicker.textContent = translate("roundKicker", { round });
    gameTitle.textContent = translate("gameTitle");
    gameInstruction.textContent = translate("gameInstruction");
    liveMessage.textContent = translate(gameMessageKey, gameMessageValues);
  }

  if (!countPanel.hidden) updateCountStatus();

  if (!revealPanel.hidden && revealedCard) {
    revealCard.replaceChildren(renderCard(revealedCard, "card-slot"));
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

  setGameMessage("pileSelected", { number: pileIndex + 1 });

  shuffleTimer = window.setTimeout(() => {
    shuffleTimer = null;
    pileBoard.classList.remove("is-gathering");
    pileBoard.classList.add("is-shuffling");
    setGameMessage("shuffling");

    shuffleTimer = window.setTimeout(() => {
      shuffleTimer = null;
      collectPileInMiddle(pileIndex);

      if (round === 3) {
        isGathering = false;
        startCounting();
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

  const allCards = deck.slice(0, 21);
  countGrid.replaceChildren(...allCards.map(renderCountCard));
  countCurrent.textContent = "00";
  countProgressFill.style.width = "0%";
  countedCards = 0;
  countPhase = "initial";
  updateCountStatus();
  countPanel.scrollIntoView({ behavior: "smooth", block: "start" });

  allCards.forEach((_, index) => {
    const timer = window.setTimeout(() => {
      const item = countGrid.children[index];
      item.classList.add("is-counted");
      countedCards = index + 1;
      countCurrent.textContent = String(countedCards).padStart(2, "0");
      countProgressFill.style.width = `${(countedCards / 21) * 100}%`;
      countPhase = index === 20 ? "finding" : "counting";
      updateCountStatus();

      if (index === 20) {
        const highlightTimer = window.setTimeout(() => {
          countGrid.children[10].classList.add("is-target");
          countPhase = "found";
          updateCountStatus();
          const revealTimer = window.setTimeout(() => showReveal(deck[10]), 1000);
          countTimers.push(revealTimer);
        }, 500);
        countTimers.push(highlightTimer);
      }
    }, 260 + index * 160);
    countTimers.push(timer);
  });
}

function startGame() {
  clearMotionTimers();
  deck = createDeck();
  round = 1;
  isGathering = false;
  revealedCard = null;
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
  revealedCard = card;
  revealCard.replaceChildren(renderCard(card, "card-slot"));
  revealPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

renderHeroCards();
languageSelect.addEventListener("change", () => {
  window.I18n.setLocale(languageSelect.value);
});
document.addEventListener("app-language-change", refreshLanguageDependentState);
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
