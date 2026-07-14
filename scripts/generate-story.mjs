import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const FILE = path.join(process.cwd(), "public", "story.generated.json");
const TAIPEI = "Asia/Taipei";
const FINAL_START = new Date("2026-07-31T20:00:00+08:00");
const ROUTES = ["nerve", "insight", "empathy"];

const routeMeta = {
  nerve: {
    label: "破界",
    icon: "⚡",
    accents: ["rose", "amber"],
    locations: ["被戰鼓包圍的斷橋", "只承認勝者的鋼鐵庭院", "燃燒著舊版本的城牆", "時間獵犬盤踞的電塔"],
    figures: ["背著碎鐘的傭兵", "從紅門逃出的少年將軍", "戴著三層面具的前任 Z", "以傷口記錄地圖的女騎士"],
    anomalies: ["每擊倒一名敵人，城市就忘記一條和平道路", "所有武器開始選擇自己的主人", "天空把你的勇氣標成系統漏洞", "敵人的影子比本體早一步攻擊"],
  },
  insight: {
    label: "觀測",
    icon: "⌘",
    accents: ["cyan", "blue"],
    locations: ["只收藏錯誤答案的博物館", "明日提交仍在編譯的資料中心", "會把謊言轉成公式的觀測塔", "每扇門都標示機率的旅館"],
    figures: ["胸口刻著提交雜湊的工程師", "自稱來自 8 月 1 日的失明先知", "由三份矛盾證詞組成的法官", "不被任何鏡子承認的研究員"],
    anomalies: ["所有答案都正確，只有問題被人替換", "尚未發生的錯誤先出現在日誌裡", "世界每七秒悄悄改寫一次規則", "一段沒有作者的程式正在預測你的下一步"],
  },
  empathy: {
    label: "守名",
    icon: "✦",
    accents: ["violet", "lime"],
    locations: ["會夢見玩家的地下湖", "禁止說出真名的夜市", "替失敗結局收屍的紙醫院", "每扇窗都住著被刪角色的旅館"],
    figures: ["戴著 Bug獸面具的小孩", "替無名者提燈的米菈", "記得所有重啟的老貓", "把心跳抵押給城市的鐘匠"],
    anomalies: ["每說出一個名字，就有另一個人恢復記憶", "雨滴落地前變成未寄出的道歉", "被刪除的角色開始共同夢見你", "所有人的傷口正交換彼此的故事"],
  },
};

const targetActions = {
  nerve: ["先發制人，破壞異常核心", "承擔所有敵意，替其他人開路", "挑戰規則制定者，奪走控制權"],
  insight: ["反向追蹤異常來源", "比對被竄改的紀錄", "利用規則例外設下邏輯陷阱"],
  empathy: ["先聽完對方未說出口的理由", "保護最容易被刪除的人", "歸還不屬於自己的名字與記憶"],
};

const results = {
  nerve: [
    "你強行撕開封鎖，眼前世界裂成一條全新的破界路線；舊道路則在身後永久熔毀。",
    "你贏下主動權，但時間之外的獵人第一次聞到你的氣味。下一節點將把你視為威脅。",
    "規則制定者後退了，留下的不是屍體，而是一份寫著 Z 的招募契約。"
  ],
  insight: [
    "規律被破解後，場景露出一秒原始碼。你改變了下一節點的入口，而不是回到原本主線。",
    "你捕捉到幕後訊號；訊號證明其他兩條路也曾經過這裡，但留下了不同版本的真相。",
    "邏輯陷阱成功。異常被迫交出一枚能在交會節點辨認舊路的證物。"
  ],
  empathy: [
    "被你留下的人開始記得其他時間線。下一節點會因這份記憶呈現不同內容。",
    "痛苦沒有消失，而是變成一盞燈，照出原本不存在的守名支線。",
    "對方交出真正名字；名字寫入 Cookie，連重啟也只會留下淡淡回聲。"
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
  const p = taipeiParts(date);
  return `${p.year}${p.month}${p.day}-${p.hour}`;
}

function nodeId(date, route) {
  return `live-${hourKey(date)}-${route}`;
}

function hashInt(input) {
  return Number.parseInt(crypto.createHash("sha256").update(input).digest("hex").slice(0, 8), 16);
}

function pick(list, seed, offset = 0) {
  return list[(seed + offset * 37) % list.length];
}

function nextHour(date) {
  return new Date(date.getTime() + 60 * 60 * 1000);
}

function makeChoice(currentRoute, targetRoute, seed, index, nextDate) {
  const relic = {
    nerve: "斷裂的紅色權限",
    insight: "未提交的藍色證物",
    empathy: "仍有心跳的白色名字",
  }[targetRoute];

  return {
    label: pick(targetActions[targetRoute], seed, index),
    icon: routeMeta[targetRoute].icon,
    result: `${pick(results[targetRoute], seed, index + 3)} 你從「${routeMeta[currentRoute].label}」路線轉向「${routeMeta[targetRoute].label}」路線，故事不會回到共同下一幕。`,
    next: nodeId(nextDate, targetRoute),
    effects: {
      nerve: targetRoute === "nerve" ? 2 : 0,
      insight: targetRoute === "insight" ? 2 : 0,
      empathy: targetRoute === "empathy" ? 2 : 0,
    },
    ...(targetRoute === "insight" ? { item: relic } : { flag: `live_${currentRoute}_to_${targetRoute}_${seed.toString(36)}` }),
  };
}

function makeNode(date, route, index) {
  const key = hourKey(date);
  const seed = hashInt(`${key}-${route}-${index}`);
  const meta = routeMeta[route];
  const location = pick(meta.locations, seed, 1);
  const figure = pick(meta.figures, seed, 2);
  const anomaly = pick(meta.anomalies, seed, 3);
  const nextDate = nextHour(date);
  const p = taipeiParts(date);

  return {
    id: nodeId(date, route),
    route,
    releaseAt: `${p.year}-${p.month}-${p.day}T${p.hour}:00:00+08:00`,
    title: `時隙 ${String(index).padStart(3, "0")} · ${meta.label}：${location}`,
    subtitle: `這是 ${p.hour}:00 同時生成的三個節點之一；其他選擇正在另一條故事裡發生。`,
    scene: `${route}-${key}`,
    accent: pick(meta.accents, seed, 4),
    intro: `你沿著${meta.label}路線抵達${location}。${anomaly}。${figure}守在交會點，聲稱自己見過從另外兩條路抵達的你，但那些版本留下了完全不同的後果。`,
    routeText: {
      nerve: `你察覺${figure}正在防備你的第一擊；力量可以改寫這一幕，但也會燒掉一條退路。`,
      insight: `你發現${anomaly}並非隨機事件，它與上一個節點的選擇序列共享同一組雜湊。`,
      empathy: `${figure}說出一個只有被刪角色才知道的名字。對方可能正在等待你承認另一條時間線。`,
      balanced: "三條下一路線同時可見。選擇其中之一後，你會進入下一小時對應的不同節點。",
    },
    echoes: {
      remember_mira: "米菈的名字在場景邊緣閃了一下；即使這不是她的路，她仍記得你。",
      bugbeast_friend: "Bug獸從資料縫隙探出頭，替你標出一個別人看不見的安全點。",
      deleted_identity: "這個節點無法辨認你的身分，因此把原本鎖住的資訊全部顯示出來。",
      entered_live_nerve: "紅門留下的敵意仍黏在你身上，這裡的人先把你當作武器。",
      entered_live_insight: "藍門留下的規則鏡片讓你看見三個下一節點的真實 ID。",
      entered_live_empathy: "白門帶來的無名者在遠處替你作證，避免這一幕刪除你的同伴。",
    },
    choices: ROUTES.map((targetRoute, choiceIndex) => makeChoice(route, targetRoute, seed, choiceIndex, nextDate)),
  };
}

function makeFinalRouteNode(route) {
  const meta = routeMeta[route];
  const endingIds = ROUTES.map((target) => `final-ending-${route}-${target}`);
  const endingLabels = {
    nerve: ["切斷所有自動重來", "由你成為唯一守門人", "摧毀故事樹，讓角色自行選擇"],
    insight: ["公開全部分支與規則", "封存最穩定的唯一版本", "讓每個居民擁有修改權"],
    empathy: ["恢復所有被刪除的名字", "把自己的名字交給世界", "讓矛盾時間線共同生活"],
  }[route];

  return {
    id: `live-20260731-20-${route}`,
    route,
    releaseAt: "2026-07-31T20:00:00+08:00",
    title: `終幕分支 · ${meta.label}：最後一次整點`,
    subtitle: "7 月 31 日，故事樹停止長出新枝；你的路線仍有三種不同收尾。",
    scene: `final-${route}`,
    accent: meta.accents[0],
    intro: `最後一道鐘聲響起。所有走過的節點在天空展開成真正的樹狀圖。你沿著${meta.label}路線抵達樹冠，但最終選擇仍不會與另外兩條路共用同一個結局。`,
    routeText: { balanced: "三個最終決定會導向三個不同結局；完成後仍可重啟探索其他樹枝。" },
    choices: endingLabels.map((label, index) => ({
      label,
      icon: ["⚔", "⌘", "✦"][index],
      result: `你在${meta.label}路線採取第 ${index + 1} 種最終決定。天空中的其他枝條沒有消失，但這一次旅程只會落在屬於你的結局。`,
      next: endingIds[index],
      effects: {
        nerve: index === 0 ? 4 : 0,
        insight: index === 1 ? 4 : 0,
        empathy: index === 2 ? 4 : 0,
      },
      flag: `final_${route}_${index}`,
    })),
  };
}

function makeFinalEnding(route, target, index) {
  const names = {
    nerve: ["不可逆的自由", "最後守門人", "沒有主角的黎明"],
    insight: ["透明世界", "完美但寂靜的版本", "全民維護的天空"],
    empathy: ["萬名歸城", "無名者 Z", "矛盾者的家"],
  }[route];
  const copies = {
    nerve: [
      "你切斷重來機制。世界第一次必須承擔每一次錯誤，也因此學會真正的修復。",
      "你守在故事樹根部，允許冒險繼續，卻不再替任何人決定該走哪一枝。",
      "你摧毀主角權限。所有角色開始自行做選擇，Z 則成為第一個退到故事之外的人。",
    ],
    insight: [
      "所有規則、條件與分支公開。世界變慢了，卻再也沒有秘密刪除。",
      "你保留唯一穩定版本。每個人都安全，只有夢裡仍會出現那些被剪掉的可能。",
      "你把修改權交給居民。天空每天都在變，但沒有人再只能被動接受更新。",
    ],
    empathy: [
      "所有被刪名字回到城中。城市成為無限迷宮，卻沒有人再無家可歸。",
      "你把自己的名字交給世界換回眾人。沒有人記得 Z，卻每個人都記得曾被拯救。",
      "互相矛盾的時間線共同存在。爭吵從未停止，但米菈與 Bug獸終於都有家。",
    ],
  }[route];

  return {
    id: `final-ending-${route}-${target}`,
    ending: true,
    endingCode: names[index],
    title: `最終結局：${names[index]}`,
    subtitle: `這是 ${routeMeta[route].label} 路線的第 ${index + 1} 種結局。`,
    scene: `ending-${route}-${index}`,
    accent: routeMeta[route].accents[index % routeMeta[route].accents.length],
    intro: copies[index],
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

if (!Array.isArray(data.nodes)) {
  data = { schema: 2, generatedAt: null, finalized: false, entrypoints: {}, nodes: [] };
}

data.schema = 2;
data.entrypoints ||= {};
data.nodes ||= [];

if (data.finalized) {
  console.log("Story graph already finalized.");
  process.exit(0);
}

if (now >= FINAL_START) {
  const finalNodes = ROUTES.map(makeFinalRouteNode);
  const finalEndings = ROUTES.flatMap((route) => ROUTES.map((target, index) => makeFinalEnding(route, target, index)));
  for (const node of [...finalNodes, ...finalEndings]) {
    if (!data.nodes.some((existing) => existing.id === node.id)) data.nodes.push(node);
  }
  data.finalized = true;
  data.generatedAt = now.toISOString();
  await fs.writeFile(FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("Added nine route-specific final endings.");
  process.exit(0);
}

const ids = ROUTES.map((route) => nodeId(now, route));
if (ids.every((id) => data.nodes.some((node) => node.id === id))) {
  console.log("This hour's three story nodes already exist.");
  process.exit(0);
}

const layerIndex = Math.floor(data.nodes.filter((node) => node.id.startsWith("live-") && !node.id.startsWith("live-ending")).length / 3) + 1;
const newNodes = ROUTES.map((route) => makeNode(now, route, layerIndex));
for (const node of newNodes) {
  if (!data.nodes.some((existing) => existing.id === node.id)) data.nodes.push(node);
}

for (const route of ROUTES) {
  data.entrypoints[route] ||= nodeId(now, route);
}

data.generatedAt = now.toISOString();
await fs.writeFile(FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Added branching layer ${hourKey(now)} with three distinct nodes.`);
