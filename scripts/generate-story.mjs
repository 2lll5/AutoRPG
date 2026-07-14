import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const FILE = path.join(process.cwd(), "public", "story.generated.json");
const TAIPEI = "Asia/Taipei";
const FINAL_START = new Date("2026-07-31T20:00:00+08:00");
const FINAL_DEADLINE = new Date("2026-07-31T23:59:59+08:00");

const locations = [
  ["沒有出口的玻璃溫室", "greenhouse"], ["沉在雲層下的逆光港口", "harbor"], ["只收藏錯誤答案的博物館", "museum"],
  ["被巨樹貫穿的資料中心", "forest"], ["每扇窗都通往昨日的旅館", "hotel"], ["漂浮在城市上空的審判庭", "court"],
  ["禁止說出真名的夜市", "market"], ["列車永遠晚一分鐘的終點站", "station"], ["會夢見玩家的地下湖", "lake"],
  ["把雷聲鎖進抽屜的氣象塔", "tower"], ["由廢棄密碼築成的城牆", "wall"], ["只有影子能進入的劇院", "theatre"]
];
const anomalies = [
  "所有時鐘忽然開始倒數同一個陌生人的壽命", "雨滴在落地前變成未寄出的訊息", "每說一次謊，天空就多裂開一道縫",
  "牆上的門牌改成你曾經放棄的名字", "遠處的鐘聲比聲音本身早三秒抵達", "人們的倒影開始秘密交換位置",
  "路燈逐盞顯示你下一次重來的原因", "空氣中浮出尚未提交的世界版本", "死去的路線透過收音機要求復原",
  "城市邊界出現一行正在閃爍的刪除確認", "所有人的夢在同一分鐘同步更新", "月亮短暫顯示成一枚巨大的游標"
];
const figures = [
  "背著空鳥籠的守門人", "自稱來自 8 月 1 日的失明先知", "手掌刻著提交紀錄的傭兵", "從未被任何鏡子承認的女王",
  "替失敗結局收屍的紙面醫師", "戴著 Bug獸面具的小孩", "每小時換一張臉的郵差", "記得所有重啟的老貓",
  "把心跳抵押給城市的鐘匠", "由三個互相矛盾的證詞組成的騎士", "胸口裝著微型月亮的逃犯", "不允許任何故事結束的編輯者"
];
const relics = [
  "能割開旁白的銀剪", "裝著半句真相的黑匣", "只會指向後悔之處的羅盤", "可交換兩段記憶的雙面鏡",
  "寫下名字就會下雨的羽筆", "封存一次重來權的琥珀", "會替主人說出真心的斷劍", "能聽見被刪資料的耳骨",
  "把傷口轉成地圖的紅線", "只在無人相信時發光的徽章", "允許一次選擇同時成立的骰子", "能讓整點延遲七秒的懷錶"
];
const verbs = {
  nerve: ["正面闖入", "先發制人", "以自己作為誘餌", "摧毀異常核心", "挑戰規則制定者"],
  insight: ["解析異常規律", "反向追蹤來源", "設計一個邏輯陷阱", "比對被竄改的紀錄", "利用規則中的例外"],
  empathy: ["先聽完對方的理由", "保護最容易被刪除的人", "歸還不屬於自己的記憶", "讓所有人共同作證", "承擔另一人的痛苦"],
};
const consequences = {
  nerve: [
    "你成功撕開封鎖，卻讓時間之外的東西第一次聞到你的氣味。",
    "障礙被強行突破，城市承認你的力量，也把你標記成下一輪的首要威脅。",
    "你贏得道路，但道路記住了你的暴力；下一次它可能會先攻擊。",
    "敵人後退了，留下的不是屍體，而是一份寫著你名字的招募契約。"
  ],
  insight: [
    "你證明異常不是意外，而是一段刻意留下的測試。測試者似乎正透過你觀察玩家。",
    "規律被破解後，場景露出一秒鐘的原始碼；其中一行註解來自未來的你。",
    "你找到最安全的路徑，卻發現它曾被另一個自己走過，並在終點留下警告。",
    "邏輯陷阱成功捕捉到幕後訊號，但訊號內容只有一句：『不要太早相信結局。』"
  ],
  empathy: [
    "被你留下的人開始記得其他時間線，世界因此更完整，也更難被重置。",
    "那份痛苦沒有消失，而是變成一盞燈，照出一條原本不存在的支線。",
    "對方交出真正的名字。名字在你的 Cookie 裡留下無法被普通重啟清除的微光。",
    "你救下了一段被判定無價值的故事。它承諾會在最終日替你說一次話。"
  ]
};
const accents = ["violet", "cyan", "rose", "amber", "lime", "blue"];
const icons = { nerve: "⚡", insight: "⌘", empathy: "✦" };

function taipeiParts(date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TAIPEI, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23"
  }).formatToParts(date).reduce((acc, p) => (acc[p.type] = p.value, acc), {});
  return parts;
}

function hashInt(input) {
  return Number.parseInt(crypto.createHash("sha256").update(input).digest("hex").slice(0, 8), 16);
}

function pick(list, seed, offset = 0) { return list[(seed + offset * 37) % list.length]; }
function pad(n, width = 3) { return String(n).padStart(width, "0"); }

function makeChoice(route, seed, location, anomaly, figure, relic, index) {
  const action = pick(verbs[route], seed, index + 1);
  const result = `${pick(consequences[route], seed, index + 4)} ${figure}將「${relic}」${route === "empathy" ? "暫時託付" : route === "insight" ? "列為你的解題證物" : "作為戰利品交給"}你。`;
  const effects = { nerve: 0, insight: 0, empathy: 0, [route]: 2 };
  return {
    label: `${action}，處理「${anomaly.slice(0, 15)}…」`,
    icon: icons[route],
    result,
    effects,
    ...(index === 1 ? { item: relic } : { flag: `hour_${route}_${seed.toString(36)}` })
  };
}

function makeEpisode(date, index) {
  const p = taipeiParts(date);
  const hourKey = `${p.year}${p.month}${p.day}-${p.hour}`;
  const seed = hashInt(`${hourKey}-${index}`);
  const [location, scene] = pick(locations, seed);
  const anomaly = pick(anomalies, seed, 1);
  const figure = pick(figures, seed, 2);
  const relic = pick(relics, seed, 3);
  const routeOrder = ["nerve", "insight", "empathy"];
  return {
    id: `hour-${hourKey}`,
    releaseAt: `${p.year}-${p.month}-${p.day}T${p.hour}:00:00+08:00`,
    title: `時隙 ${pad(index)}：${location}`,
    subtitle: `整點 ${p.hour}:00，新分支已寫入世界。`,
    scene,
    accent: pick(accents, seed, 4),
    intro: `鐘聲過後，你抵達${location}。${anomaly}。${figure}守在異常中心，宣稱只有願意承擔結果的人，才有資格帶走「${relic}」。`,
    routeText: {
      nerve: `你的力量讓${figure}重新評估距離。眼前的障礙看似堅固，核心卻正在害怕你先動手。`,
      insight: `你發現「${relic}」與異常的出現頻率一致，兩者很可能共用同一段生成規則。`,
      empathy: `你聽見${figure}的聲音裡藏著疲憊。對方也許不是守衛，而是另一名被困太久的玩家。`,
      balanced: `三種直覺同時發出警告。這一幕沒有標準答案，只會留下不同的債。`
    },
    choices: routeOrder.map((route, choiceIndex) => makeChoice(route, seed, location, anomaly, figure, relic, choiceIndex))
  };
}

function makeFinale(date, index) {
  const p = taipeiParts(date);
  return {
    id: "finale-20260731",
    releaseAt: `${p.year}-${p.month}-${p.day}T${p.hour}:00:00+08:00`,
    title: "終幕：7 月 31 日，最後一次整點",
    subtitle: "世界不再等待新的章節。現在，它等待你的定義。",
    scene: "finale",
    accent: "violet",
    intro: "7 月 31 日的最後一道鐘聲響起，天空展開成一頁巨大的提交紀錄。所有你救過、懷疑過、擊敗過的人都站在分支盡頭。維護者交出最後的權限：不是刪除世界，而是決定這段故事要以什麼方式繼續存在。",
    routeText: {
      nerve: "斷章槍與你手臂上的紋路同時發亮。你可以讓任何結局屈服，但不能命令人們如何記得你。",
      insight: "你看懂了全部生成規律：真正不可預測的變數，一直都是玩家願不願意承擔選擇。",
      empathy: "所有被刪除者的名字在城中亮起。米菈握住你的手，第一次擁有屬於自己的心跳。",
      balanced: "Bug獸安靜坐在你身旁。力量、真相與記憶都已足夠，差別只在你想留下什麼。"
    },
    choices: [
      { label: "成為守門人，讓世界永遠保有冒險與風險", icon: "⚔", result: "【破界結局】你斬斷自動重置機制，讓每次選擇都真正不可逆。城市獲得自由，也必須第一次學會承擔失敗。多年後，人們仍把敢於選擇的人稱作 Z。", effects: { nerve: 5, insight: 0, empathy: 0 }, flag: "ending_breaker" },
      { label: "公開世界原始碼，讓所有人共同維護未來", icon: "⌘", result: "【觀測結局】秘密不再屬於少數維護者。每個居民都能看見規則、提出修改，也能拒絕更新。世界變得緩慢而混亂，卻再也沒有無法解釋的刪除。", effects: { nerve: 0, insight: 5, empathy: 0 }, flag: "ending_observer" },
      { label: "保留所有分支，讓被遺忘者回到同一座城", icon: "✦", result: "【守名結局】你讓互相矛盾的時間線同時存在。城市因此長成一座無限迷宮，但每個名字都有家可回。米菈與 Bug獸在新門口等你，邀請你開始一段不再由排程決定的冒險。", effects: { nerve: 0, insight: 0, empathy: 5 }, flag: "ending_keeper" }
    ],
    finale: true
  };
}

const nowArg = process.env.STORY_NOW ? new Date(process.env.STORY_NOW) : new Date();
if (Number.isNaN(nowArg.getTime())) throw new Error("Invalid STORY_NOW date");

const raw = await fs.readFile(FILE, "utf8");
const data = JSON.parse(raw);
data.episodes ||= [];

if (data.finalized || nowArg > FINAL_DEADLINE) {
  console.log("Story generation finished; no changes.");
  process.exit(0);
}

const p = taipeiParts(nowArg);
const hourId = `hour-${p.year}${p.month}${p.day}-${p.hour}`;
if (data.episodes.some((episode) => episode.id === hourId || episode.id === "finale-20260731")) {
  console.log("This hour already exists; no changes.");
  process.exit(0);
}

const nextIndex = data.episodes.length + 1;
if (nowArg >= FINAL_START) {
  data.episodes.push(makeFinale(nowArg, nextIndex));
  data.finalized = true;
} else {
  data.episodes.push(makeEpisode(nowArg, nextIndex));
}
data.generatedAt = nowArg.toISOString();
await fs.writeFile(FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Added ${data.episodes.at(-1).id}`);
