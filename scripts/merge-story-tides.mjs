import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const STORY_FILE = path.join(ROOT, "public", "story.generated.json");
const TIDE_DIR = path.join(ROOT, "public", "story.tides");

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

const data = await readJson(STORY_FILE, {});
const epochs = Array.isArray(data.epochs) ? data.epochs : [];

let tideNames = [];
try {
  tideNames = (await fs.readdir(TIDE_DIR)).filter((name) => name.endsWith(".json")).sort();
} catch {
  tideNames = [];
}

for (const name of tideNames) {
  const tide = await readJson(path.join(TIDE_DIR, name), null);
  if (!tide?.id || epochs.some((epoch) => epoch.id === tide.id)) continue;
  epochs.push(tide);
}

epochs.sort((a, b) => String(a.releaseAt || "").localeCompare(String(b.releaseAt || "")));
epochs.forEach((epoch, index) => {
  epoch.sequence = index + 1;
  epoch.expansion ||= {};
  epoch.expansion.mode = "per-parent-three-children";
  epoch.expansion.childCount = 3;
  epoch.expansion.uniquenessScope ||= "parent-path";
  epoch.expansion.continuity ||= ["location", "companions", "artifacts", "injuries", "oaths", "enemies", "unresolvedThreads"];
});

const merged = {
  ...data,
  schema: 4,
  generatedAt: data.generatedAt || null,
  finalized: Boolean(data.finalized),
  entryEpochId: data.entryEpochId || epochs[0]?.id || null,
  worldState: {
    title: "星蝕王冠",
    genre: "劍與魔法",
    latestDepth: epochs.length,
    continuity: ["location", "companions", "artifacts", "injuries", "oaths", "enemies", "unresolvedThreads"],
    ...(data.worldState || {}),
    latestDepth: epochs.length,
  },
  epochs,
};

await fs.writeFile(STORY_FILE, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
console.log(`Merged ${tideNames.length} authored tide file(s); story depth is ${epochs.length}.`);
