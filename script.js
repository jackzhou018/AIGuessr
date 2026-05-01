const DATASET_BASE = "datasets/real-vs-ai-15";

const realSources = [
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3ARed_Dragon_scuplture_during_River_Lee_flooding%2C_October_2023.jpg",
    author: "Podstawko",
    license: "CC BY-SA 4.0",
    title: "Red Dragon sculpture during River Lee flooding"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3AEdi_Rama%2C_press_conference%2C_ITB_2025%2C_Berlin_(ITB56439).jpg",
    author: "Matti Blume",
    license: "CC BY-SA",
    title: "Edi Rama press conference, ITB 2025"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3ADelhi%2C_India%2C_Rain_at_night.jpg",
    author: "Vyacheslav Argenberg",
    license: "CC BY 4.0",
    title: "Delhi, India, rain at night"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3ACrowded_Train_Platform_During_9-Euro_Ticket_Period_in_Germany.jpg",
    author: "Spinarak",
    license: "CC0",
    title: "Crowded train platform during 9-Euro Ticket period"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3ASmoke_in_Minneapolis.jpg",
    author: "Wikimedia Commons contributor",
    license: "CC BY-SA 4.0",
    title: "Smoke in Minneapolis"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3ACleanup_efforts_after_storm_Xavier._Spielvogel_3.jpg",
    author: "Spielvogel",
    license: "CC BY-SA 4.0",
    title: "Cleanup efforts after storm Xavier"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3AN24-Reporter_mit_Kameramann_-_K%C3%B6ln_(7344).JPG",
    author: "Raimond Spekking",
    license: "CC BY-SA 4.0",
    title: "N24 reporter with camera operator in Cologne"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3AFerryhill_Market_Square_1945_-_geograph.org.uk_-_88616.jpg",
    author: "Colin Coates",
    license: "CC BY-SA 2.0",
    title: "Ferryhill Market Square"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3AConstruction_Workers.jpg",
    author: "Paul Keheler",
    license: "CC BY 2.0",
    title: "Construction Workers"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3AStreet_Food.jpg",
    author: "J. Miers",
    license: "CC BY-SA 4.0",
    title: "Street Food"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3ABeijing_Street_Food_Market_(9870620283).jpg",
    author: "Gary Todd",
    license: "CC0",
    title: "Beijing Street Food Market"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3ARainy_street.jpg",
    author: "Eman abdelkader",
    license: "CC BY-SA 4.0",
    title: "Rainy street"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3ARestaurant_Kitchen.jpg",
    author: "Visitor7",
    license: "CC BY-SA 3.0",
    title: "Restaurant Kitchen"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3AStudents_in_classroom.jpg",
    author: "Esthee2010",
    license: "CC BY-SA 4.0",
    title: "Students in classroom"
  },
  {
    commonsPage: "https://commons.wikimedia.org/wiki/File%3AFirefighters.jpg",
    author: "Junior Libby",
    license: "CC0",
    title: "Firefighters"
  }
];

const aiSource = {
  provider: "ChatGPT",
  detail: "Generated with ChatGPT for this quiz."
};

const quizPairs = [
  {
    id: "flooded",
    scene: "Flooded downtown avenue after heavy rain",
    realSrc: `${DATASET_BASE}/real/real_01_flooded-downtown.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_one_flooded.png`,
    aiCue:
      "The park scene is too clean for a flood match: the path, grass, bench, and pond edges look orderly instead of disrupted by high water."
  },
  {
    id: "press",
    scene: "Press briefing with microphones and speakers",
    realSrc: `${DATASET_BASE}/real/real_02_press-briefing.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_two_press.png`,
    aiCue:
      "The White House text and logos are almost right but soften at the edges, and the crowd's hands and heads repeat in staged-looking poses."
  },
  {
    id: "night-traffic",
    scene: "Night traffic in the rain",
    realSrc: `${DATASET_BASE}/real/real_03_night-rain-traffic.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_three_night.png`,
    aiCue:
      "The wet-road reflections are brighter and more mirror-like than the lights causing them, while distant cars smear together."
  },
  {
    id: "metro-platform",
    scene: "Crowded transit platform",
    realSrc: `${DATASET_BASE}/real/real_04_crowded-platform.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_four_metro.png`,
    aiCue:
      "The crowd compresses around dense areas, with people slightly merging and faces losing definition near the train doors."
  },
  {
    id: "smoke-neighborhood",
    scene: "Smoke over a residential neighborhood",
    realSrc: `${DATASET_BASE}/real/real_05_smoke-neighborhood.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_five_smoke.png`,
    aiCue:
      "The smoke has a painterly, even texture and blends into the background without the chaotic lighting behavior of real smoke."
  },
  {
    id: "storm-cleanup",
    scene: "Storm damage cleanup crew at work",
    realSrc: `${DATASET_BASE}/real/real_06_storm-cleanup.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_six_storm.png`,
    aiCue:
      "The debris feels randomly scattered instead of pushed by one clear force, so the damage lacks consistent direction."
  },
  {
    id: "reporter",
    scene: "Reporter filming outdoors in bad weather",
    realSrc: `${DATASET_BASE}/real/real_07_reporter-weather.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_seven_reporter.png`,
    aiCue:
      "The skin looks over-smoothed, and small clothing details such as logos or text become warped rather than readable."
  },
  {
    id: "market-square",
    scene: "Public market square with a large crowd",
    realSrc: `${DATASET_BASE}/real/real_08_market-square.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_eight_market.png`,
    aiCue:
      "The historical market looks plausible at a glance, but building text and crowd detail turn muddy and repetitive when inspected closely."
  },
  {
    id: "construction",
    scene: "Construction workers on a steel frame",
    realSrc: `${DATASET_BASE}/real/real_09_construction-workers.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_nine_construction.png`,
    aiCue:
      "Tools and machinery show small structural inconsistencies, and worker poses do not fully line up with realistic equipment use."
  },
  {
    id: "street-food",
    scene: "Street food being prepared in Old Delhi",
    realSrc: `${DATASET_BASE}/real/real_10_street-food.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_ten_street_food.png`,
    aiCue:
      "The steam looks stylized and uniform, and the food is arranged a little too perfectly and evenly."
  },
  {
    id: "beijing-food-street",
    scene: "Busy Beijing street food market",
    realSrc: `${DATASET_BASE}/real/real_11_beijing-food-market.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_eleven_Beijing.png`,
    aiCue:
      "Signs look almost readable but collapse into incorrect characters, with small cultural details that do not quite fit."
  },
  {
    id: "rainy-street",
    scene: "Rainy street viewed through wet glass",
    realSrc: `${DATASET_BASE}/real/real_12_rainy-street.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_twelve_rainy.png`,
    aiCue:
      "The reflections are too vivid and evenly distributed, and umbrellas or pedestrians show slight shape distortions."
  },
  {
    id: "kitchen",
    scene: "Commercial restaurant kitchen",
    realSrc: `${DATASET_BASE}/real/real_13_restaurant-kitchen.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_thirteen_kitchen.png`,
    aiCue:
      "The cooking action feels frozen, with warped utensils and heat or flame behavior that does not follow the scene."
  },
  {
    id: "classroom",
    scene: "Students studying in a classroom",
    realSrc: `${DATASET_BASE}/real/real_14_students-classroom.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_fourteen_classroom.png`,
    aiCue:
      "Students' faces look similar or under-detailed, and the board writing appears structured but becomes inconsistent up close."
  },
  {
    id: "firefighters",
    scene: "Firefighters working outdoors",
    realSrc: `${DATASET_BASE}/real/real_15_firefighters.jpg`,
    aiSrc: `${DATASET_BASE}/AI/AI_fifteen_firefighters.png`,
    aiCue:
      "The fire is overly dramatic and uniform, while hoses, gear, smoke, and people interact with subtle physical inconsistencies."
  }
].map((pair, index) => ({
  ...pair,
  realSource: realSources[index],
  aiSource
}));

const promptBank = [
  "One image was generated by AI. Which one is it?",
  "Compare both images closely. Which image is synthetic?",
  "Look at texture, lighting, faces, hands, and background detail. Which one is AI-generated?",
  "Which image looks model-generated rather than camera-captured?"
];

const roundIndicator = document.getElementById("roundIndicator");
const scoreIndicator = document.getElementById("scoreIndicator");
const promptText = document.getElementById("promptText");
const mediaStats = document.getElementById("mediaStats");
const optionsGrid = document.getElementById("optionsGrid");
const feedbackBox = document.getElementById("feedbackBox");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const restartBtn = document.getElementById("restartBtn");

let rounds = [];
let currentRoundIndex = 0;
let score = 0;
let answered = false;
let currentOptions = [];
let answerHistory = [];

const imagePreloadCache = new Map();

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function preloadSrc(src) {
  if (imagePreloadCache.has(src)) return;

  const image = new Image();
  image.decoding = "async";
  image.src = src;
  imagePreloadCache.set(src, image);
}

function preloadRoundImages(round) {
  if (!round) return;
  preloadSrc(round.realSrc);
  preloadSrc(round.aiSrc);
}

function buildRounds() {
  return shuffle(quizPairs).map((pair, index) => ({
    ...pair,
    prompt: promptBank[index % promptBank.length],
    roundNumber: index + 1
  }));
}

function createOptions(round) {
  return shuffle([
    {
      label: "Image A",
      src: round.realSrc,
      scene: round.scene,
      kind: "Real photograph",
      isAI: false,
      source: {
        provider: "Wikimedia Commons",
        url: round.realSource.commonsPage,
        detail: `${round.realSource.author}, ${round.realSource.license}. ${round.realSource.title}.`
      }
    },
    {
      label: "Image B",
      src: round.aiSrc,
      scene: round.scene,
      kind: "AI-generated image",
      isAI: true,
      source: round.aiSource
    }
  ]).map((option, index) => ({
    ...option,
    label: `Image ${String.fromCharCode(65 + index)}`
  }));
}

function sourceMarkup(option) {
  const sourceName = escapeHtml(option.source.provider);
  const sourceDetail = escapeHtml(option.source.detail);
  const sourceValue = option.source.url
    ? `<a href="${escapeHtml(option.source.url)}" target="_blank" rel="noreferrer">${sourceName}</a>`
    : `<strong>${sourceName}</strong>`;

  return `
    <p class="source-line"><span>Source</span>${sourceValue}</p>
    <p class="source-detail">${sourceDetail}</p>
  `;
}

function renderRound() {
  const round = rounds[currentRoundIndex];
  answered = false;
  currentOptions = createOptions(round);
  preloadRoundImages(round);
  preloadRoundImages(rounds[currentRoundIndex + 1]);

  roundIndicator.textContent = `Round ${currentRoundIndex + 1} of ${rounds.length}`;
  scoreIndicator.textContent = `Score: ${score}`;
  promptText.textContent = round.prompt;
  feedbackBox.className = "feedback";
  feedbackBox.textContent = "Pick the image you think was generated by AI.";
  nextRoundBtn.disabled = true;
  nextRoundBtn.textContent = currentRoundIndex === rounds.length - 1 ? "See Score" : "Next Round";

  optionsGrid.innerHTML = currentOptions
    .map((option, index) => `
      <article class="option-card" data-index="${index}">
        <button class="image-choice" data-index="${index}" aria-label="Choose ${option.label} as AI-generated">
          <span class="media-wrap">
            <img
              src="${escapeHtml(option.src)}"
              alt="${escapeHtml(option.scene)}"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            >
          </span>
          <span class="option-meta">
            <span class="option-label">${option.label}</span>
            <span class="option-reveal" aria-hidden="true"></span>
          </span>
        </button>
        <div class="source-panel" data-source-panel hidden></div>
      </article>
    `)
    .join("");

  document.querySelectorAll(".image-choice").forEach((btn) => {
    btn.addEventListener("click", () => evaluateGuess(Number(btn.dataset.index)));
  });

  document.querySelectorAll(".media-wrap img").forEach((image) => {
    image.addEventListener("error", () => {
      image.closest(".media-wrap")?.classList.add("is-missing");
    });
  });
}

function evaluateGuess(guessIndex) {
  if (answered) return;

  answered = true;
  const aiIndex = currentOptions.findIndex((option) => option.isAI);
  const isCorrect = guessIndex === aiIndex;
  const round = rounds[currentRoundIndex];

  if (isCorrect) {
    score += 1;
  }

  answerHistory.push({
    round: currentRoundIndex + 1,
    scene: round.scene,
    picked: currentOptions[guessIndex].label,
    correct: currentOptions[aiIndex].label,
    isCorrect
  });

  scoreIndicator.textContent = `Score: ${score}`;
  feedbackBox.className = `feedback ${isCorrect ? "success" : "fail"}`;
  feedbackBox.innerHTML = `
    <p class="feedback-result">
      ${
        isCorrect
          ? "Correct."
          : `Not quite. The AI-generated image was ${escapeHtml(currentOptions[aiIndex].label)}.`
      }
    </p>
    <p><strong>AI clue:</strong> ${escapeHtml(round.aiCue)}</p>
  `;

  document.querySelectorAll(".option-card").forEach((card, index) => {
    const option = currentOptions[index];
    const reveal = card.querySelector(".option-reveal");
    const button = card.querySelector(".image-choice");
    const sourcePanel = card.querySelector("[data-source-panel]");

    card.classList.add("locked");
    button.disabled = true;
    reveal.textContent = option.kind;
    reveal.setAttribute("aria-hidden", "false");
    sourcePanel.innerHTML = sourceMarkup(option);
    sourcePanel.hidden = false;

    if (index === aiIndex) {
      card.classList.add("correct");
    } else if (index === guessIndex) {
      card.classList.add("wrong");
    }
  });

  preloadRoundImages(rounds[currentRoundIndex + 1]);
  nextRoundBtn.disabled = false;
}

function scoreMessage(percent) {
  if (percent >= 90) return "Excellent detection instincts.";
  if (percent >= 70) return "Strong eye for synthetic details.";
  if (percent >= 50) return "Solid start. The close calls are where practice helps.";
  return "Keep practicing. AI images are built to pass a quick glance.";
}

function renderResults() {
  const percent = Math.round((score / rounds.length) * 100);
  roundIndicator.textContent = "Quiz complete";
  scoreIndicator.textContent = `Final score: ${score}/${rounds.length}`;
  promptText.textContent = scoreMessage(percent);
  feedbackBox.className = "feedback success";
  feedbackBox.textContent = `You scored ${score} out of ${rounds.length} (${percent}%).`;

  optionsGrid.innerHTML = `
    <section class="results-panel" aria-label="Quiz results">
      <div>
        <p class="results-score">${score}/${rounds.length}</p>
        <p class="results-caption">AI images identified</p>
      </div>
      <ol class="results-list">
        ${answerHistory
          .map((answer) => `
            <li class="${answer.isCorrect ? "is-correct" : "is-wrong"}">
              <span>${answer.round}. ${escapeHtml(answer.scene)}</span>
              <strong>${answer.isCorrect ? "Correct" : `Missed, AI was ${escapeHtml(answer.correct)}`}</strong>
            </li>
          `)
          .join("")}
      </ol>
    </section>
  `;

  nextRoundBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
}

function goNextRound() {
  if (currentRoundIndex < rounds.length - 1) {
    currentRoundIndex += 1;
    renderRound();
    return;
  }

  renderResults();
}

function updateMediaStats() {
  mediaStats.textContent = `${quizPairs.length} real/AI image pairs loaded from datasets/real-vs-ai-15.`;
}

function restartGame() {
  rounds = buildRounds();
  currentRoundIndex = 0;
  score = 0;
  answerHistory = [];
  nextRoundBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  updateMediaStats();
  preloadRoundImages(rounds[0]);
  renderRound();
}

nextRoundBtn.addEventListener("click", goNextRound);
restartBtn.addEventListener("click", restartGame);

restartGame();
