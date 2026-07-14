import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const FILE = path.join(process.cwd(), "public", "story.generated.json");
const TAIPEI = "Asia/Taipei";
const FINAL_START = new Date("2026-07-31T20:00:00+08:00");
const FINAL_DEADLINE = new Date("2026-07-31T23:59:59+08:00");

const POOLS = {
  pressures: [
    "同一條走廊同時出現兩種互相衝突的出口",
    "一段舊選擇正試圖覆蓋目前空間的物理規則",
    "附近所有門鎖開始要求玩家交出一段記憶",
    "被刪除的角色正從牆面與地板的接縫返回",
    "時間獵犬沿著上一個選擇留下的氣味逼近",
    "世界維護者宣布這一區將在下一次鐘聲後封存",
    "三個不同版本的 Z 同時聲稱自己才是原本的玩家",
    "場景中的主要通道正被未提交的程式逐步改寫",
    "一件重要物品開始拒絕目前持有者",
    "所有照明設備改為顯示尚未發生的警告",
    "一名同行者的名字正從所有可見紀錄中消失",
    "目前空間的邊界開始向內收縮",
  ],
  figures: [
    "背著碎鐘的傭兵",
    "替無名者提燈的米菈",
    "胸口刻著提交雜湊的工程師",
    "戴著 Bug獸面具的小孩",
    "記得所有重啟的老貓",
    "由三份矛盾證詞組成的法官",
    "把心跳抵押給城市的鐘匠",
    "從未被鏡子承認的研究員",
    "沿途收集失敗結局的紙醫師",
    "守著一扇只能向內開啟之門的門衛",
    "從 8 月 1 日返回的失明先知",
    "以傷口記錄路線的女騎士",
  ],
  revelations: [
    "上一個場景的出口其實由某位角色的記憶維持",
    "目前異常與玩家 Cookie 中的選擇序列完全同步",
    "兩條看似交會的路線只共享地點，並不共享人物關係",
    "世界每次重啟都會保留一個無法被清除的物理痕跡",
    "所謂刪除只是把故事移到沒有索引的保存區",
    "每個出口都通往地圖上真正相鄰的區域，而非任意場景",
    "一名同行者知道下一個地點，卻隱瞞了抵達方式的代價",
    "目前場景的核心物件曾在另一條支線造成相反結果",
    "整點更新只增加世界規則，不會替玩家決定下一個節點",
    "故事樹的根並不在鐘塔，而在第一次被記住的名字裡",
    "某個看似新出現的敵人其實一直藏在上一幕的背景聲音中",
    "玩家未走過的分支不會消失，只是不會被預先物質化",
  ],
  artifacts: [
    "可標記真實出口的路徑釘",
    "記錄上一個房間氣味的玻璃片",
    "不允許場景突然跳接的連續性封條",
    "能保存同行者狀態的名字扣",
    "只會指向實際相鄰區域的羅盤",
    "記錄門窗與通道位置的空間圖紙",
    "可驗證移動過程的時間戳繩",
    "保存一段未解事件的黑匣",
    "能讓一次選擇留下實體痕跡的粉筆",
    "標示角色是否仍在場的紙手環",
    "可把前一幕關鍵物件帶入下一幕的封存袋",
    "顯示故事節點父子關係的枝狀徽章",
  ],
  sensory: [
    "空氣中仍留著上一個場景帶來的金屬與雨水氣味",
    "腳步回聲清楚顯示這裡與剛才的通道相連",
    "牆面震動頻率與你方才經過的機械完全一致",
    "同行者衣角仍沾著上一個地點的灰塵",
    "地板上的水痕一路延伸回你進入的出口",
    "遠處仍能聽見上一幕尚未停止的鐘聲",
    "你回頭時，剛才使用的門仍保持開啟",
    "照明顏色沿著通道逐步變化，而不是瞬間切換",
    "手中的物品因附近相同材質的結構而產生共鳴",
    "風向與通風口位置證明你仍在同一建築群內",
    "一串新鮮腳印從入口一路延伸到事件中心",
    "地圖上的距離與實際步行時間彼此吻合",
  ],
  stakes: [
    "目前空間的一條出口將永久封閉",
    "一名同行者可能被迫留在原地",
    "上一幕尚未解決的威脅會追入下一個區域",
    "重要物品可能改變持有者",
    "此地居民將記住你處理事件的方法",
    "故事樹會把這次選擇寫成後續人物對你的第一印象",
    "一條支線會因此取得新的實體入口",
    "空間結構將依照選擇留下可見損傷",
    "某個名字可能從後續對話中永久消失",
    "下一個地點會保留本次事件造成的環境變化",
    "同行者之間的信任將被重新排列",
    "一項世界規則會從暫時異常變成永久設定",
  ],
  openingThreads: [
    "三扇門背後的城市正以不同速度崩解",
    "維護者正在追蹤所有拒絕回到共同主線的玩家",
    "米菈的名字在不同支線中產生了互相矛盾的記憶",
    "Bug獸咬住的網路線正在把舊世界與新世界連在一起",
    "檔案館心臟開始拒絕替未走過的分支預先寫好結局",
    "每個玩家的路徑都開始生成自己的實體地圖",
  ],
};

function taipeiParts(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TAIPEI,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
}

function hourKey(date) {
  const parts = taipeiParts(date);
  return `${parts.year}${parts.month}${parts.day}-${parts.hour}`;
}

function hashInt(input) {
  return Number.parseInt(crypto.createHash("sha256").update(input).digest("hex").slice(0, 8), 16);
}

function sample(pool, seed, count, stride) {
  const result = [];
  for (let index = 0; index < count; index += 1) {
    const value = pool[(seed + index * stride) % pool.length];
    if (!result.includes(value)) result.push(value);
  }
  return result;
}

function makeEpoch(date, sequence, finale = false) {
  const key = hourKey(date);
  const seed = hashInt(`${key}:${sequence}:${finale ? "finale" : "epoch"}`);
  const parts = taipeiParts(date);
  return {
    id: finale ? "epoch-20260731-finale" : `epoch-${key}`,
    releaseAt: `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:00:00+08:00`,
    sequence,
    finale,
    openingThread: POOLS.openingThreads[seed % POOLS.openingThreads.length],
    pressures: sample(POOLS.pressures, seed, 7, 5),
    figures: sample(POOLS.figures, seed >>> 1, 7, 7),
    revelations: sample(POOLS.revelations, seed >>> 2, 7, 5),
    artifacts: sample(POOLS.artifacts, seed >>> 3, 7, 7),
    sensory: sample(POOLS.sensory, seed >>> 4, 7, 5),
    stakes: sample(POOLS.stakes, seed >>> 5, 7, 7),
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
  data = {
    schema: 3,
    generatedAt: null,
    finalized: false,
    entryEpochId: null,
    epochs: [],
  };
}

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
if (finale) data.finalized = true;

await fs.writeFile(FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(
  finale
    ? "Added the contextual finale epoch. Every existing path can now produce its own three endings."
    : `Added world epoch ${epoch.id}. It can expand every reachable branch, not only three global nodes.`,
);
