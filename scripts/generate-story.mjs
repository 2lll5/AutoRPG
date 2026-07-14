import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const FILE = path.join(process.cwd(), "public", "story.generated.json");
const TAIPEI = "Asia/Taipei";
const FINAL_START = new Date("2026-07-31T20:00:00+08:00");
const FINAL_DEADLINE = new Date("2026-07-31T23:59:59+08:00");

const POOLS = {
  openingThreads: [
    "黑曜鐘樓的第十三聲喚醒了沉睡在王都地脈中的古龍誓約",
    "米菈帶回一封由失蹤王女親筆寫成、卻沾著百年前灰燼的密信",
    "月蝕市場的鹿角守門人宣布，今夜有人要拍賣一座仍活著的城堡",
    "北境烽火同時熄滅，顯示霜狼軍團已繞過所有已知山道",
    "星落聖堂的封印裂開，失落聖劍在無人觸碰時自行出鞘",
    "紙醫師辨認出隊伍傷勢中的黑色紋路，正是深淵王冠復甦的徵兆"
  ],
  pressures: [
    "城牆下方的石化巨人正逐步甦醒",
    "霜狼軍團的斥候已逼近唯一可撤退的山口",
    "古龍火焰正在吞噬通往聖堂的木橋",
    "敵方咒術師以人質血液維持一座封鎖法陣",
    "失控的月蝕潮正讓亡者記憶覆蓋活人的意志",
    "王都騎士團內部出現效忠深淵王冠的叛徒",
    "同行者身上的舊傷因禁咒而重新裂開"
  ],
  figures: [
    "替無名者提燈的米菈",
    "以傷口記錄戰役的女騎士瑟琳",
    "背著碎鐘的傭兵卡洛",
    "守護星落聖堂的盲眼祭司艾爾文",
    "與霜狼立下血誓的北境獵人赫恩",
    "收治被詛咒者的紙醫師",
    "被放逐的王女莉奧娜"
  ],
  revelations: [
    "霜狼軍團真正追尋的是王女體內的星血",
    "古龍並非敵人，而是在阻止深淵王冠找到新宿主",
    "王都叛徒受到的不是利誘，而是一條無法違抗的祖先誓約",
    "失落聖劍每次出鞘都會奪走持劍者一段珍貴記憶",
    "月蝕市場的拍賣品其實是被封印成城堡形態的遠古守護獸",
    "米菈隱瞞了她曾經替深淵王冠點亮引路燈的過去",
    "紙醫師已找出解除黑色傷紋的方法，但必須以另一人的壽命交換"
  ],
  artifacts: [
    "能照出誓言真假的星銀提燈",
    "刻著古龍真名的黑曜鱗片",
    "可封存一次致命傷勢的白紙護符",
    "王女家族失落的月桂印戒",
    "只在亡者靠近時發熱的骨柄短劍",
    "能開啟鐘樓密門的第十三枚銅齒",
    "封著霜狼王一滴血的冰晶瓶"
  ],
  sensory: [
    "上一處戰場的灰燼仍黏在斗篷內側",
    "同行者的傷口在靠近禁咒時傳出微弱灼熱",
    "遠方鐘聲與腳下地脈震動保持同一節奏",
    "空氣中混著古龍硫火與冷杉樹脂的氣味",
    "雪地上的狼爪印一路延伸到剛走過的山徑",
    "聖劍劍鞘內傳出像低語般的金屬摩擦聲",
    "米菈提燈的火焰正朝隊伍來路傾斜"
  ],
  stakes: [
    "一名同行者可能永遠失去自己的名字",
    "王都將失去抵禦北境軍團的最後屏障",
    "失落聖劍可能改認新的主人",
    "古龍誓約將把整支隊伍視為敵人",
    "王女的真實身分會被所有勢力得知",
    "隊伍必須在救治傷者與追擊敵人之間做出不可逆選擇",
    "深淵王冠將取得一件能跨越封印的聖物"
  ],
  approaches: [
    "循古龍火脈穿過崩裂地宮，以真名交換一條不受追兵察覺的道路",
    "護送傷者沿霜狼舊獵徑撤向北境石門，並尋求狼王血誓的庇護",
    "潛入月蝕市場追查王冠代理人，在拍賣鐘響前奪回被封印的聖物",
    "返回星落聖堂重整盟誓，讓盲眼祭司以星光辨認隊伍中的叛誓者",
    "登上黑曜鐘樓敲響逆序鐘聲，迫使亡者記憶離開活人的軀體",
    "追隨王女密信前往灰燼花園，查明百年前誓約仍在運作的原因"
  ],
  costs: [
    "持劍者失去一段與同行者相識的記憶",
    "一件聖物暫時沉睡，直到完成新的血誓",
    "隊伍必須留下可靠的同行者斷後",
    "黑色傷紋加深，下一次施展禁咒將付出壽命",
    "王女身分暴露給其中一個敵對勢力",
    "古龍將要求隊伍日後償還一項不可拒絕的承諾"
  ]
};

function taipeiParts(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TAIPEI,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
}

function hourKey(date) {
  const p = taipeiParts(date);
  return `${p.year}${p.month}${p.day}-${p.hour}`;
}

function hashInt(input) {
  return Number.parseInt(crypto.createHash("sha256").update(input).digest("hex").slice(0, 8), 16);
}

function sample(pool, seed, count, stride) {
  const result = [];
  for (let i = 0; result.length < Math.min(count, pool.length); i += 1) {
    const value = pool[(seed + i * stride) % pool.length];
    if (!result.includes(value)) result.push(value);
  }
  return result;
}

function makeVariants(seed, finale) {
  return [0, 1, 2].map((branch) => ({
    branch,
    intent: finale
      ? ["守住仍願同行的人並封印王冠", "以王女星血重寫古龍誓約", "犧牲聖物斬斷深淵王冠的繼承"][branch]
      : POOLS.approaches[(seed + branch * 5) % POOLS.approaches.length],
    cost: POOLS.costs[((seed >>> 3) + branch * 7) % POOLS.costs.length],
    continuityRule: "從父路徑實際 location、companions、artifacts、injuries、oaths、enemies 與 unresolvedThreads 推導，不得重置狀態",
    outcomeRule: finale
      ? "依父路徑累積選擇產生專屬結局，結清主要誓約與未解事件"
      : "產生只屬於該父路徑的結果，並留下至少一項可延續的新後果"
  }));
}

function makeEpoch(date, sequence, finale = false) {
  const key = hourKey(date);
  const seed = hashInt(`${key}:${sequence}:${finale ? "finale" : "tide"}`);
  const p = taipeiParts(date);
  return {
    id: finale ? "epoch-20260731-finale" : `epoch-${key}`,
    releaseAt: `${p.year}-${p.month}-${p.day}T${p.hour}:00:00+08:00`,
    sequence,
    finale,
    openingThread: POOLS.openingThreads[seed % POOLS.openingThreads.length],
    pressures: sample(POOLS.pressures, seed, 7, 3),
    figures: sample(POOLS.figures, seed >>> 1, 7, 5),
    revelations: sample(POOLS.revelations, seed >>> 2, 7, 3),
    artifacts: sample(POOLS.artifacts, seed >>> 3, 7, 5),
    sensory: sample(POOLS.sensory, seed >>> 4, 7, 3),
    stakes: sample(POOLS.stakes, seed >>> 5, 7, 5),
    expansion: {
      mode: "per-parent-three-children",
      childCount: 3,
      uniquenessScope: "parent-path",
      continuity: ["location", "companions", "artifacts", "injuries", "oaths", "enemies", "unresolvedThreads"],
      variants: makeVariants(seed, finale)
    }
  };
}

const now = process.env.STORY_NOW ? new Date(process.env.STORY_NOW) : new Date();
if (Number.isNaN(now.getTime())) throw new Error("Invalid STORY_NOW date");

let data;
try {
  data = JSON.parse(await fs.readFile(FILE, "utf8"));
} catch {
  data = {};
}

if (data.schema !== 3 || !Array.isArray(data.epochs)) {
  data = { schema: 3, generatedAt: null, finalized: false, entryEpochId: null, epochs: [] };
}

data.worldState ||= {
  title: "星蝕王冠",
  genre: "劍與魔法",
  latestDepth: 0,
  continuity: ["location", "companions", "artifacts", "injuries", "oaths", "enemies", "unresolvedThreads"]
};

if (data.finalized || now > FINAL_DEADLINE) {
  console.log("World feed already finalized; no changes.");
  process.exit(0);
}

const finale = now >= FINAL_START;
const id = finale ? "epoch-20260731-finale" : `epoch-${hourKey(now)}`;
if (data.epochs.some((epoch) => epoch.id === id)) {
  console.log(`World epoch ${id} already exists.`);
  process.exit(0);
}

const epoch = makeEpoch(now, data.epochs.length + 1, finale);
data.epochs.push(epoch);
data.entryEpochId ||= epoch.id;
data.generatedAt = now.toISOString();
data.worldState.latestDepth = Math.max(Number(data.worldState.latestDepth) || 0, data.epochs.length);
if (finale) data.finalized = true;

await fs.writeFile(FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(finale ? "Added path-specific finale tide." : `Added fate tide ${epoch.id} for every reachable parent path.`);
