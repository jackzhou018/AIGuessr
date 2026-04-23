const GAME_SETTINGS = {
  totalRounds: 12,
  imageRoundTarget: 8,
  videoRoundTarget: 4
};

function localArtlistImage(filename, fallbackSrc) {
  return {
    src: `assets/artlist-ai/${filename}`,
    fallbackSrc
  };
}

// Add exported Artlist images to assets/artlist-ai using these filenames.
const artlistImagePairs = [
  {
    scene: "Flooded downtown avenue after heavy rain",
    ai: localArtlistImage("flooded-downtown.jpg", "assets/ai-city.svg"),
    real: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Red_Dragon_scuplture_during_River_Lee_flooding%2C_October_2023.jpg/1280px-Red_Dragon_scuplture_during_River_Lee_flooding%2C_October_2023.jpg"
    }
  },
  {
    scene: "Press briefing with microphones and speakers",
    ai: localArtlistImage("press-briefing.jpg", "assets/ai-city.svg"),
    real: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Edi_Rama%2C_press_conference%2C_ITB_2025%2C_Berlin_%28ITB56439%29.jpg/1280px-Edi_Rama%2C_press_conference%2C_ITB_2025%2C_Berlin_%28ITB56439%29.jpg"
    }
  },
  {
    scene: "Night traffic in the rain",
    ai: localArtlistImage("night-rain-traffic.jpg", "assets/ai-city.svg"),
    real: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Delhi%2C_India%2C_Rain_at_night.jpg/1280px-Delhi%2C_India%2C_Rain_at_night.jpg"
    }
  },
  {
    scene: "Crowded transit platform",
    ai: localArtlistImage("crowded-platform.jpg", "assets/ai-city.svg"),
    real: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Crowded_Train_Platform_During_9-Euro_Ticket_Period_in_Germany.jpg/1280px-Crowded_Train_Platform_During_9-Euro_Ticket_Period_in_Germany.jpg"
    }
  },
  {
    scene: "Smoke over a residential neighborhood",
    ai: localArtlistImage("smoke-neighborhood.jpg", "assets/ai-forest.svg"),
    real: {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/02/Smoke_in_Minneapolis.jpg"
    }
  },
  {
    scene: "Storm damage cleanup crew at work",
    ai: localArtlistImage("storm-cleanup.jpg", "assets/ai-city.svg"),
    real: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Cleanup_efforts_after_storm_Xavier._Spielvogel_3.jpg/1280px-Cleanup_efforts_after_storm_Xavier._Spielvogel_3.jpg"
    }
  },
  {
    scene: "Reporter filming outdoors in bad weather",
    ai: localArtlistImage("reporter-weather.jpg", "assets/ai-forest.svg"),
    real: {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/N24-Reporter_mit_Kameramann_-_K%C3%B6ln_%287344%29.JPG/1280px-N24-Reporter_mit_Kameramann_-_K%C3%B6ln_%287344%29.JPG"
    }
  },
  {
    scene: "Public market square with a large crowd",
    ai: localArtlistImage("market-square.jpg", "assets/ai-city.svg"),
    real: {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Ferryhill_Market_Square_1945_-_geograph.org.uk_-_88616.jpg"
    }
  }
];

const mediaDatabase = {
  image: {
    pairs: artlistImagePairs
  },
  video: {
    real: [
      { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm", scene: "Macro-style flower footage" },
      { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", scene: "Natural outdoor motion" },
      { src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", scene: "Short camera movement clip" },
      { src: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4", scene: "Scene with natural motion blur" },
      { src: "https://filesamples.com/samples/video/mp4/sample_640x360.mp4", scene: "Standard live-action framing" },
      { src: "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4", scene: "Longer documentary-style framing" }
    ],
    ai: [
      { src: "https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4", scene: "Synthetic-style motion test clip" },
      { src: "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4", scene: "Simulated deepfake benchmark clip" },
      { src: "https://filesamples.com/samples/video/mp4/sample_960x540.mp4", scene: "Rendered sequence benchmark clip" },
      { src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4", scene: "Synthetic motion consistency sample" },
      { src: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4", scene: "Facial consistency stress-test sample" },
      { src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", scene: "Compression and cadence check sample" }
    ]
  }
};

const promptBank = {
  image: [
    "One image in this pair is AI-generated. Which one is it?",
    "Which still frame looks synthetic rather than camera-captured?",
    "Compare texture, lighting, and depth. Which image is AI-generated?",
    "Which image is likely model-generated instead of photographed?"
  ],
  video: [
    "One clip is labeled as synthetic in this benchmark pair. Which one is it?",
    "Which video likely comes from a generated or simulated source?",
    "Which clip shows the stronger deepfake-style cues in motion?"
  ]
};

const explanationBank = {
  image: [
    "Look for inconsistent shadows, unnatural edges, or repeated textures in the details.",
    "AI renders often struggle with tiny structures like fingers, text, wires, and reflections.",
    "Photorealistic generation can look convincing, so check geometry and context consistency."
  ],
  video: [
    "For moving content, check object continuity and whether motion and lighting stay coherent across frames.",
    "Video clues usually show up in cadence, edge shimmer, and inconsistent scene physics.",
    "This demo uses simulated benchmark clips for video rounds, so use it as a cue-training exercise."
  ]
};

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

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomItems(items, count) {
  return shuffle(items).slice(0, Math.min(count, items.length));
}

function createRound(type, realMedia, aiMedia, roundIndex) {
  return {
    prompt: promptBank[type][roundIndex % promptBank[type].length],
    options: [
      { ...realMedia, type },
      { ...aiMedia, type, isAI: true }
    ],
    explanation: explanationBank[type][roundIndex % explanationBank[type].length]
  };
}

function buildRounds() {
  const imageRounds = Math.min(
    GAME_SETTINGS.imageRoundTarget,
    mediaDatabase.image.pairs.length
  );
  const videoRounds = Math.min(
    GAME_SETTINGS.videoRoundTarget,
    mediaDatabase.video.real.length,
    mediaDatabase.video.ai.length
  );

  const selectedImagePairs = pickRandomItems(mediaDatabase.image.pairs, imageRounds);
  const selectedRealVideos = pickRandomItems(mediaDatabase.video.real, videoRounds);
  const selectedAiVideos = pickRandomItems(mediaDatabase.video.ai, videoRounds);

  const generatedRounds = [];

  for (let i = 0; i < imageRounds; i += 1) {
    const pair = selectedImagePairs[i];
    generatedRounds.push(
      createRound(
        "image",
        { ...pair.real, scene: pair.scene },
        { ...pair.ai, scene: pair.scene },
        i
      )
    );
  }

  for (let i = 0; i < videoRounds; i += 1) {
    generatedRounds.push(createRound("video", selectedRealVideos[i], selectedAiVideos[i], i));
  }

  return shuffle(generatedRounds).slice(0, GAME_SETTINGS.totalRounds);
}

function mediaElement(option) {
  if (option.type === "video") {
    return `
      <video controls muted playsinline preload="metadata">
        <source src="${option.src}">
        Your browser does not support this video tag.
      </video>
    `;
  }

  const fallbackAttr = option.fallbackSrc ? ` data-fallback-src="${option.fallbackSrc}"` : "";
  return `<img src="${option.src}" alt="${option.scene}" loading="lazy"${fallbackAttr}>`;
}

function attachMediaFallbacks() {
  document.querySelectorAll("img[data-fallback-src]").forEach((img) => {
    img.addEventListener("error", () => {
      const fallbackSrc = img.dataset.fallbackSrc;
      if (!fallbackSrc || img.dataset.fallbackApplied === "true") return;
      img.dataset.fallbackApplied = "true";
      img.src = fallbackSrc;
    });
  });
}

function renderRound() {
  const round = rounds[currentRoundIndex];
  answered = false;
  currentOptions = shuffle(round.options).map((option, index) => ({
    ...option,
    label: `Option ${String.fromCharCode(65 + index)}`
  }));
  roundIndicator.textContent = `Round ${currentRoundIndex + 1} of ${rounds.length}`;
  scoreIndicator.textContent = `Score: ${score}`;
  promptText.textContent = round.prompt;
  feedbackBox.className = "feedback";
  feedbackBox.textContent = "Choose one option to lock your guess.";
  nextRoundBtn.disabled = true;

  optionsGrid.innerHTML = currentOptions
    .map((option, index) => `
      <article class="option-card" data-index="${index}">
        <div class="media-wrap">
          ${mediaElement(option)}
        </div>
        <div class="option-meta">
          <p>${option.label}</p>
          <p class="option-scene">${option.scene}</p>
          <button class="btn guess-btn" data-index="${index}">Guess this one</button>
        </div>
      </article>
    `)
    .join("");

  document.querySelectorAll(".guess-btn").forEach((btn) => {
    btn.addEventListener("click", () => evaluateGuess(Number(btn.dataset.index)));
  });

  attachMediaFallbacks();
}

function evaluateGuess(guessIndex) {
  if (answered) return;

  answered = true;
  const aiIndex = currentOptions.findIndex((option) => option.isAI);
  const isCorrect = guessIndex === aiIndex;
  if (isCorrect) {
    score += 1;
  }

  scoreIndicator.textContent = `Score: ${score}`;
  const round = rounds[currentRoundIndex];
  feedbackBox.className = `feedback ${isCorrect ? "success" : "fail"}`;
  feedbackBox.textContent = isCorrect
    ? `Correct. ${round.explanation}`
    : `Not quite. The AI-generated pick was ${currentOptions[aiIndex].label}. ${round.explanation}`;

  document.querySelectorAll(".option-card").forEach((card, index) => {
    card.classList.add("locked");
    if (index === aiIndex) {
      card.classList.add("correct");
    } else if (index === guessIndex && !isCorrect) {
      card.classList.add("wrong");
    }
  });

  nextRoundBtn.disabled = false;
}

function goNextRound() {
  if (currentRoundIndex < rounds.length - 1) {
    currentRoundIndex += 1;
    renderRound();
    return;
  }

  promptText.textContent = "Game complete.";
  optionsGrid.innerHTML = "";
  nextRoundBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
  feedbackBox.className = "feedback success";
  feedbackBox.textContent = `You scored ${score} out of ${rounds.length}. Keep practicing before sharing viral posts.`;
}

function updateMediaStats() {
  if (!mediaStats) return;
  const totalImagePairs = mediaDatabase.image.pairs.length;
  const totalVideos = mediaDatabase.video.real.length + mediaDatabase.video.ai.length;
  mediaStats.textContent = `Current media database: ${totalImagePairs} Artlist AI/real image pairs and ${totalVideos} video samples.`;
}

function restartGame() {
  rounds = buildRounds();
  currentRoundIndex = 0;
  score = 0;
  nextRoundBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  renderRound();
}

nextRoundBtn.addEventListener("click", goNextRound);
restartBtn.addEventListener("click", restartGame);

updateMediaStats();
restartGame();
