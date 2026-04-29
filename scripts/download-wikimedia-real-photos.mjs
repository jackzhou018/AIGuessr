import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const DATASET_DIR = path.resolve("datasets/real-vs-ai-15");
const REAL_DIR = path.join(DATASET_DIR, "real");
const AI_DIR = path.join(DATASET_DIR, "ai");

const sources = [
  {
    id: "real_01_flooded-downtown",
    scene: "Flooded downtown avenue after heavy rain",
    title: "File:Red Dragon scuplture during River Lee flooding, October 2023.jpg"
  },
  {
    id: "real_02_press-briefing",
    scene: "Press briefing with microphones and speakers",
    title: "File:Edi Rama, press conference, ITB 2025, Berlin (ITB56439).jpg"
  },
  {
    id: "real_03_night-rain-traffic",
    scene: "Night traffic in the rain",
    title: "File:Delhi, India, Rain at night.jpg"
  },
  {
    id: "real_04_crowded-platform",
    scene: "Crowded transit platform",
    title: "File:Crowded Train Platform During 9-Euro Ticket Period in Germany.jpg"
  },
  {
    id: "real_05_smoke-neighborhood",
    scene: "Smoke over a residential neighborhood",
    title: "File:Smoke in Minneapolis.jpg"
  },
  {
    id: "real_06_storm-cleanup",
    scene: "Storm damage cleanup crew at work",
    title: "File:Cleanup efforts after storm Xavier. Spielvogel 3.jpg"
  },
  {
    id: "real_07_reporter-weather",
    scene: "Reporter filming outdoors in bad weather",
    title: "File:N24-Reporter mit Kameramann - Köln (7344).JPG"
  },
  {
    id: "real_08_market-square",
    scene: "Public market square with a large crowd",
    title: "File:Ferryhill Market Square 1945 - geograph.org.uk - 88616.jpg"
  },
  {
    id: "real_09_construction-workers",
    scene: "Construction workers on a steel frame",
    title: "File:Construction Workers.jpg"
  },
  {
    id: "real_10_street-food",
    scene: "Street food being prepared in Old Delhi",
    title: "File:Street Food.jpg"
  },
  {
    id: "real_11_beijing-food-market",
    scene: "Busy Beijing street food market",
    title: "File:Beijing Street Food Market (9870620283).jpg"
  },
  {
    id: "real_12_rainy-street",
    scene: "Rainy street viewed through wet glass",
    title: "File:Rainy street.jpg"
  },
  {
    id: "real_13_restaurant-kitchen",
    scene: "Commercial restaurant kitchen",
    title: "File:Restaurant Kitchen.jpg"
  },
  {
    id: "real_14_students-classroom",
    scene: "Students studying in a classroom",
    title: "File:Students in classroom.jpg"
  },
  {
    id: "real_15_firefighters",
    scene: "Firefighters working outdoors",
    title: "File:Firefighters.jpg"
  }
];

function commonsFilePage(title) {
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(title).replace(/%20/g, "_")}`;
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function cleanMetadataValue(value) {
  if (!value) return "";
  return decodeEntities(String(value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getImageInfo(source) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    prop: "imageinfo",
    redirects: "1",
    iiprop: "url|mime|size|extmetadata",
    iiurlwidth: "1280",
    titles: source.title,
    origin: "*"
  });
  const url = `https://commons.wikimedia.org/w/api.php?${params}`;
  const response = await fetchWithRetries(url);

  if (!response.ok) {
    throw new Error(`Commons API failed for ${source.title}: ${response.status}`);
  }

  const data = await response.json();
  const page = data.query?.pages?.[0];
  const imageInfo = page?.imageinfo?.[0];

  if (!imageInfo?.url) {
    throw new Error(`No image URL found for ${source.title}`);
  }

  return imageInfo;
}

async function fetchWithRetries(url) {
  let lastStatus = "";

  for (let attempt = 1; attempt <= 10; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "AIGuessr dataset builder (local educational use)"
      }
    });

    if (response.ok) return response;

    lastStatus = String(response.status);
    if (response.status !== 429 && response.status < 500) break;

    const retryAfter = Number(response.headers.get("retry-after"));
    const waitMs = Number.isFinite(retryAfter) ? retryAfter * 1000 : Math.min(30000, attempt * 5000);
    await sleep(waitMs);
  }

  throw new Error(`Request failed for ${url}: ${lastStatus}`);
}

async function downloadFile(url, destination) {
  const existing = await stat(destination).catch(() => null);
  if (existing?.size > 0) return existing.size;

  const response = await fetchWithRetries(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, buffer);
  return buffer.byteLength;
}

async function main() {
  await mkdir(REAL_DIR, { recursive: true });
  await mkdir(AI_DIR, { recursive: true });
  await writeFile(path.join(AI_DIR, ".gitkeep"), "");

  const entries = [];

  for (const [index, source] of sources.entries()) {
    const imageInfo = await getImageInfo(source);
    const metadata = imageInfo.extmetadata ?? {};
    const downloadUrl = imageInfo.thumburl ?? imageInfo.url;
    const realFilename = `${source.id}.jpg`;
    const aiFilename = source.id.replace(/^real_/, "ai_") + ".jpg";
    const realPath = path.join(REAL_DIR, realFilename);
    const bytes = await downloadFile(downloadUrl, realPath);

    const entry = {
      index: index + 1,
      id: source.id,
      scene: source.scene,
      realPath: `real/${realFilename}`,
      aiExpectedPath: `ai/${aiFilename}`,
      aiStatus: "pending",
      commonsTitle: source.title,
      commonsPage: commonsFilePage(source.title),
      downloadedFrom: downloadUrl,
      sourceOriginal: imageInfo.url,
      width: imageInfo.thumbwidth ?? imageInfo.width,
      height: imageInfo.thumbheight ?? imageInfo.height,
      bytes,
      mime: imageInfo.mime,
      author: cleanMetadataValue(metadata.Artist?.value),
      license: cleanMetadataValue(metadata.LicenseShortName?.value),
      licenseUrl: cleanMetadataValue(metadata.LicenseUrl?.value),
      credit: cleanMetadataValue(metadata.Credit?.value),
      description: cleanMetadataValue(metadata.ImageDescription?.value)
    };

    entries.push(entry);
    console.log(`${String(index + 1).padStart(2, "0")}/15 ${realFilename}`);
    await sleep(750);
  }

  const manifest = {
    name: "real-vs-ai-15",
    purpose: "Fifteen real photographs with matching empty AI slots for manual AI-generated counterparts.",
    realPhotoSource: "Wikimedia Commons",
    createdAt: new Date().toISOString(),
    entries
  };

  const csvRows = [
    [
      "index",
      "id",
      "scene",
      "realPath",
      "aiExpectedPath",
      "commonsPage",
      "author",
      "license",
      "licenseUrl"
    ],
    ...entries.map((entry) => [
      entry.index,
      entry.id,
      entry.scene,
      entry.realPath,
      entry.aiExpectedPath,
      entry.commonsPage,
      entry.author,
      entry.license,
      entry.licenseUrl
    ])
  ];

  await writeFile(path.join(DATASET_DIR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  await writeFile(path.join(DATASET_DIR, "credits.csv"), csvRows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
