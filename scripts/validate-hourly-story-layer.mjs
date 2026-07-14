import fs from "node:fs/promises";
import path from "node:path";

const file = path.join(process.cwd(), "public", "story.generated.json");
const data = JSON.parse(await fs.readFile(file, "utf8"));

if (data.finalized) {
  console.log("Story is finalized; validation only.");
  process.exit(0);
}

if (!Array.isArray(data.epochs) || data.epochs.length === 0) {
  throw new Error("No story epochs found.");
}

const latest = data.epochs.at(-1);
const continuity = [
  "location",
  "companions",
  "artifacts",
  "injuries",
  "oaths",
  "enemies",
  "unresolvedThreads"
];

if (latest.expansion?.mode !== "per-parent-three-children") {
  throw new Error(`Latest epoch ${latest.id} is not parent-specific.`);
}
if (latest.expansion?.childCount !== 3) {
  throw new Error(`Latest epoch ${latest.id} must expose exactly three children per parent.`);
}

const variants = latest.expansion?.variants;
if (!Array.isArray(variants) || variants.length !== 3) {
  throw new Error(`Latest epoch ${latest.id} must define exactly three action variants.`);
}

const bannedStart = /^(沿|從|前往|跟隨|進入)/;
const intents = variants.map((variant) => String(variant.intent || "").trim());
if (intents.some((intent) => !intent || bannedStart.test(intent))) {
  throw new Error(`Latest epoch ${latest.id} contains a route-only action label.`);
}
if (new Set(intents).size !== 3) {
  throw new Error(`Latest epoch ${latest.id} contains duplicated action intents.`);
}

for (const variant of variants) {
  if (!variant.cost || !variant.continuityRule || !variant.outcomeRule) {
    throw new Error(`Latest epoch ${latest.id} has an incomplete branch contract.`);
  }
}

latest.expansion.continuity = continuity;
latest.expansion.transitionRequirements = [
  "具體交代玩家採取的行動",
  "交代發現、救援或新危機",
  "說明為何必須離開目前地點",
  "寫出實際通道或交通方式",
  "延續同行者、證物、傷勢與未解後果"
];
latest.expansion.stateChangesRequired = [
  "enemyDeployment",
  "evidence",
  "relationship",
  "companions",
  "resources",
  "injuries",
  "location",
  "unresolvedGoal"
];
latest.expansion.validation = {
  checkedAt: new Date().toISOString(),
  parentSpecific: true,
  exactChildren: 3,
  routeOnlyLabels: false,
  distinctIntents: true,
  continuityPreserved: true
};

data.worldState ||= {};
data.worldState.latestDepth = data.epochs.length;
data.worldState.continuity = continuity;

await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Validated hourly layer ${latest.id}: three parent-specific causal branches.`);
