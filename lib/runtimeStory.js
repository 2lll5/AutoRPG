export const LIVE_PREFIX = "$live:";
const DYNAMIC_PREFIX = "dyn|";
const ENDING_PREFIX = "end|";
const ROUTES = ["nerve", "insight", "empathy"];

const ROUTE_META = {
  nerve: { label: "破界", icon: "⚡", accent: "rose" },
  insight: { label: "觀測", icon: "⌘", accent: "cyan" },
  empathy: { label: "守名", icon: "✦", accent: "violet" },
};

const LOCATIONS = {
  red_bridge: {
    name: "紅門外側的斷橋平台",
    scene: "red-bridge",
    accent: "rose",
    features: ["身後的紅門仍在低鳴", "斷裂鋼軌懸在城市上方", "橋腹的維修燈逐盞亮起"],
    exits: [
      { label: "沿橋面走向鐘塔外庭", destination: "clock_yard", travel: "跨過三段搖晃鋼板，再沿著仍有餘溫的軌道前進" },
      { label: "從維修梯下到橋腹機房", destination: "bridge_engine", travel: "抓著生鏽扶梯下降兩層，穿過震動中的纜線井" },
      { label: "順著信號纜線進入電塔", destination: "signal_tower", travel: "沿發光纜線繞過橋柱，從側門鑽入信號電塔" },
    ],
  },
  blue_gallery: {
    name: "藍門後的觀測廊",
    scene: "blue-gallery",
    accent: "cyan",
    features: ["兩側是透明資料牆而不是窗戶", "腳下流動著尚未提交的時間戳", "走廊盡頭有三盞不同頻率的指示燈"],
    exits: [
      { label: "循著資料牆進入版本檔案室", destination: "version_archive", travel: "沿資料牆上的提交記錄前行，通過一扇需要時間戳解鎖的門" },
      { label: "搭乘維護升降梯前往伺服器層", destination: "server_floor", travel: "進入沒有窗戶的維護升降梯，下降到低溫伺服器層" },
      { label: "穿過校驗閘門前往觀測塔", destination: "observatory", travel: "逐一通過三道校驗閘門，再沿螺旋梯抵達觀測塔" },
    ],
  },
  white_ferry: {
    name: "白門後的記名渡口",
    scene: "white-ferry",
    accent: "violet",
    features: ["岸邊石碑刻著被刪除者的名字", "渡船以記憶作為燃料", "水面只映出仍被某人記得的角色"],
    exits: [
      { label: "搭渡船前往名字市場", destination: "name_market", travel: "登上窄船，沿著由名字發光形成的航道渡過黑水" },
      { label: "沿岸步道前往紙醫院", destination: "paper_hospital", travel: "沿石碑旁的岸道步行，穿過掛滿未寄道歉信的長廊" },
      { label: "跟隨水下燈火進入地下湖", destination: "memory_lake", travel: "沿岸梯下降，穿過半淹沒的隧道抵達地下湖" },
    ],
  },
  clock_yard: {
    name: "鐘塔外庭",
    scene: "clock-yard",
    accent: "amber",
    features: ["庭院中央躺著停止轉動的分針", "四周牆面留有舊戰鬥的劍痕", "唯一的大門通往鐘塔內部"],
    exits: [
      { label: "推開銅門進入鐘塔齒輪層", destination: "clock_gears", travel: "推動卡死的銅門，沿狹窄石階進入齒輪層" },
      { label: "沿城牆前往紅色屋頂", destination: "red_rooftop", travel: "攀上外庭城牆，沿屋脊跨過兩棟傾斜建築" },
      { label: "從排水道返回橋腹", destination: "bridge_engine", travel: "掀開排水柵欄，沿潮濕通道回到斷橋下方" },
    ],
  },
  bridge_engine: {
    name: "斷橋橋腹機房",
    scene: "bridge-engine",
    accent: "amber",
    features: ["這裡沒有窗戶，只有震動的壓力表", "三組主纜線分別通往不同城區", "地板下傳來像心跳的金屬聲"],
    exits: [
      { label: "沿紅色纜線前往信號塔", destination: "signal_tower", travel: "關閉一組壓力閥，沿紅色纜線穿過低矮維修孔" },
      { label: "從檢修門進入地下軌道", destination: "underground_track", travel: "打開檢修門，沿廢棄軌道向城市下方前進" },
      { label: "搭貨梯返回鐘塔外庭", destination: "clock_yard", travel: "啟動老舊貨梯，在鋼索摩擦聲中回到地面" },
    ],
  },
  signal_tower: {
    name: "橋側信號電塔",
    scene: "signal-tower",
    accent: "rose",
    features: ["牆上排列著城市各區的信號燈", "塔頂天線正接收不屬於今日的廣播", "通風口吹入帶鐵鏽味的風"],
    exits: [
      { label: "沿外部梯架登上塔頂", destination: "tower_roof", travel: "扣好安全索，沿塔外梯架爬過三層天線平台" },
      { label: "順著地下電纜前往資料中心", destination: "server_floor", travel: "打開電纜槽，沿標記清楚的地下維修道前進" },
      { label: "穿過連絡橋前往紅色屋頂", destination: "red_rooftop", travel: "跨過狹窄連絡橋，抵達相鄰建築的屋頂" },
    ],
  },
  version_archive: {
    name: "版本檔案室",
    scene: "version-archive",
    accent: "cyan",
    features: ["封閉書櫃保存每一次重來前的版本", "天花板只有冷白維修燈，沒有對外窗", "中央桌面投影出目前路徑的差異"],
    exits: [
      { label: "穿過索引門前往檔案館心臟", destination: "archive_heart", travel: "依序輸入三段索引，穿過書櫃後方的窄門" },
      { label: "沿備份通道前往 Cookie 墓穴", destination: "cookie_catacomb", travel: "順著標示『已刪除但未清除』的備份通道向下走" },
      { label: "搭內部電梯前往伺服器層", destination: "server_floor", travel: "進入封閉電梯，以明日時間戳取得下降權限" },
    ],
  },
  server_floor: {
    name: "低溫伺服器層",
    scene: "server-floor",
    accent: "blue",
    features: ["這是一間完全沒有窗戶的密閉機房", "冷卻霧沿機櫃底部流動", "每座機櫃都標著一條尚未完成的故事路徑"],
    exits: [
      { label: "沿冷卻管線前往核心機房", destination: "core_room", travel: "戴上防寒面罩，沿藍色冷卻管線穿過兩道氣密門" },
      { label: "從維護梯上到觀測塔", destination: "observatory", travel: "穿過機房後側的防火門，沿維護梯向上攀升" },
      { label: "循備援網路進入 Cookie 墓穴", destination: "cookie_catacomb", travel: "沿地板下的備援網路通道匍匐前進" },
    ],
  },
  observatory: {
    name: "規則觀測塔",
    scene: "observatory",
    accent: "cyan",
    features: ["圓頂內側投影著整座故事樹", "觀測鏡只對準已做出的選擇", "三條螺旋梯分別標示力量、真相與名字"],
    exits: [
      { label: "沿力量梯前往塔頂平台", destination: "tower_roof", travel: "沿刻滿戰鬥紀錄的螺旋梯向上走" },
      { label: "沿真相梯返回版本檔案室", destination: "version_archive", travel: "沿寫滿校驗碼的階梯下降到檔案室" },
      { label: "沿名字梯前往紙醫院", destination: "paper_hospital", travel: "沿掛滿姓名牌的階梯走入連接醫院的空中廊道" },
    ],
  },
  name_market: {
    name: "只交易真名的月蝕市場",
    scene: "name-market",
    accent: "lime",
    features: ["攤位以燈籠照明，沒有固定牆面", "每張價目表都寫著一段被放棄的記憶", "市場出口由戴鹿角的管理人看守"],
    exits: [
      { label: "穿過記憶攤位前往紙醫院", destination: "paper_hospital", travel: "沿掛滿記憶瓶的攤道前行，從後門進入紙醫院" },
      { label: "沿地下拍賣梯進入 Cookie 墓穴", destination: "cookie_catacomb", travel: "從拍賣台旁的石梯下降，進入埋藏舊存檔的地下區" },
      { label: "搭乘夜航船返回記名渡口", destination: "white_ferry", travel: "登上只在月蝕時開航的小船，沿黑水返回渡口" },
    ],
  },
  paper_hospital: {
    name: "替失敗結局收屍的紙醫院",
    scene: "paper-hospital",
    accent: "violet",
    features: ["病床由折疊書頁製成", "走廊掛著尚未完成的角色病歷", "通風井傳來地下湖的水聲"],
    exits: [
      { label: "沿病歷走廊前往檔案館心臟", destination: "archive_heart", travel: "循著同一筆字跡的病歷前行，穿過會呼吸的紙門" },
      { label: "從通風井下降到地下湖", destination: "memory_lake", travel: "沿維修梯進入通風井，循水聲下降到湖岸" },
      { label: "從後門回到名字市場", destination: "name_market", travel: "推開堆滿空白病歷的後門，回到市場內側" },
    ],
  },
  memory_lake: {
    name: "會夢見玩家的地下湖",
    scene: "memory-lake",
    accent: "violet",
    features: ["洞頂沒有天空，只有會發光的鐘乳石", "湖面映出每次重新開始留下的舊世界", "岸邊泊著一艘只能載三人的小船"],
    exits: [
      { label: "乘小船前往湖心檔案島", destination: "archive_heart", travel: "划過映著舊世界的湖面，抵達由書頁堆成的小島" },
      { label: "沿半淹隧道前往 Cookie 墓穴", destination: "cookie_catacomb", travel: "涉水穿過半淹隧道，沿墓碑微光前進" },
      { label: "沿岸梯返回記名渡口", destination: "white_ferry", travel: "沿濕滑石梯上行，回到黑水渡口" },
    ],
  },
  underground_track: {
    name: "廢棄地下軌道",
    scene: "underground-track",
    accent: "amber",
    features: ["軌道兩側只有紅色緊急燈", "遠處列車聲總比震動晚一秒", "牆上標示通往橋腹與墓穴的維修方向"],
    exits: [
      { label: "沿軌道前往黑色列車月台", destination: "black_platform", travel: "踩著枕木前進，穿過封鎖柵欄抵達舊月台" },
      { label: "從岔線進入 Cookie 墓穴", destination: "cookie_catacomb", travel: "扳動生鏽轉轍器，沿較窄岔線進入地下墓穴" },
      { label: "沿維修道返回橋腹機房", destination: "bridge_engine", travel: "循牆上箭頭走過維修道，回到機房檢修門" },
    ],
  },
  black_platform: {
    name: "失敗版本專用黑色月台",
    scene: "black-platform",
    accent: "amber",
    features: ["月台頂棚遮住天空", "候車椅坐著不同版本的 Z", "列車只停靠尚未被接受的故事"],
    exits: [
      { label: "搭黑色列車前往月蝕市場", destination: "name_market", travel: "登上最後一節車廂，經過三座沒有站名的月台" },
      { label: "沿月台維修門進入伺服器層", destination: "server_floor", travel: "打開標示資料線路的維修門，沿地下通道前進" },
      { label: "從軌道步行返回地下岔道", destination: "underground_track", travel: "跳下月台，沿緊急步道返回地下軌道" },
    ],
  },
  archive_heart: {
    name: "會呼吸的檔案館心臟",
    scene: "archive-heart",
    accent: "cyan",
    features: ["巨大紙頁心臟懸在無窗穹頂中央", "每次跳動都會翻動附近書頁", "三條索引廊道通往不同保存區"],
    exits: [
      { label: "沿紅色索引前往核心機房", destination: "core_room", travel: "沿紅色索引廊道前行，穿過一扇由錯誤訊息組成的門" },
      { label: "沿藍色索引返回版本檔案室", destination: "version_archive", travel: "順著藍色書籤走過密集書架，返回檔案室" },
      { label: "沿白色索引前往紙醫院", destination: "paper_hospital", travel: "沿寫滿名字的白色廊道走入紙醫院" },
    ],
  },
  cookie_catacomb: {
    name: "埋藏舊存檔的 Cookie 墓穴",
    scene: "cookie-catacomb",
    accent: "violet",
    features: ["墓穴深處完全沒有自然光", "黑色餅乾狀存檔嵌在牆面", "每座墓碑刻著一串選擇序列"],
    exits: [
      { label: "沿新索引前往版本檔案室", destination: "version_archive", travel: "整理墓碑序列後，沿重新亮起的索引通道上行" },
      { label: "循水聲前往地下湖", destination: "memory_lake", travel: "穿過低矮墓道，沿積水逐漸加深的方向前進" },
      { label: "沿鐵軌岔道前往黑色月台", destination: "black_platform", travel: "推開墓穴側門，沿廢棄岔線抵達黑色月台" },
    ],
  },
  clock_gears: {
    name: "鐘塔齒輪層",
    scene: "clock-gears",
    accent: "rose",
    features: ["巨型齒輪遮住所有對外視線", "中央軸心卡著一枚白面具碎片", "維修棧道連接塔頂與外庭"],
    exits: [
      { label: "沿棧道登上塔頂平台", destination: "tower_roof", travel: "避開轉動齒輪，沿狹窄棧道向上攀爬" },
      { label: "從側門前往規則觀測塔", destination: "observatory", travel: "穿過連接兩塔的封閉石廊" },
      { label: "沿石階返回鐘塔外庭", destination: "clock_yard", travel: "順著銅門後的石階向下返回外庭" },
    ],
  },
  tower_roof: {
    name: "城市最高的塔頂平台",
    scene: "tower-roof",
    accent: "rose",
    features: ["平台四周沒有牆，整座城市清楚可見", "天線與鐘針在頭頂交錯", "三座連絡橋通往不同建築"],
    exits: [
      { label: "跨連絡橋前往紅色屋頂", destination: "red_rooftop", travel: "扣上安全索，跨過高空連絡橋" },
      { label: "沿內梯下降到鐘塔齒輪層", destination: "clock_gears", travel: "從中央艙門沿內梯下降" },
      { label: "搭維護索道前往觀測塔", destination: "observatory", travel: "坐進單人維護吊籃，沿鋼索滑向觀測塔" },
    ],
  },
  red_rooftop: {
    name: "永遠黃昏的紅色屋頂城",
    scene: "red-rooftop",
    accent: "rose",
    features: ["屋頂之間以狹窄木橋相連", "城市議會旗幟掛在最高煙囪", "下方街道被封鎖線完全隔離"],
    exits: [
      { label: "沿木橋前往議會煙囪", destination: "clock_yard", travel: "跨過兩座屋頂木橋，再從煙囪旁的梯子下到外庭" },
      { label: "從天台門進入信號電塔", destination: "signal_tower", travel: "穿過天台機房，再沿連絡橋進入電塔" },
      { label: "沿逃生梯下降到地下軌道", destination: "underground_track", travel: "順著外牆逃生梯下降，穿過封鎖街道進入地鐵口" },
    ],
  },
  core_room: {
    name: "故事樹核心機房",
    scene: "core-room",
    accent: "blue",
    features: ["密閉機房中央懸著三色核心", "這裡沒有窗戶也沒有自然風", "每條玩家路徑以細線接入核心"],
    exits: [
      { label: "沿藍色管線返回伺服器層", destination: "server_floor", travel: "關閉核心護罩，沿冷卻管線穿過氣密門" },
      { label: "沿紙頁接口前往檔案館心臟", destination: "archive_heart", travel: "接上紙頁接口，穿過由文字構成的連接廊道" },
      { label: "從緊急梯登上規則觀測塔", destination: "observatory", travel: "打開緊急出口，沿垂直梯爬上觀測塔底層" },
    ],
  },
};

function hashInt(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick(list, seed, offset = 0) {
  if (!list?.length) return "";
  return list[(seed + offset * 97) % list.length];
}

function rotateRoutes(route, seed) {
  const start = ROUTES.indexOf(route);
  const rotated = ROUTES.map((_, index) => ROUTES[(start + index) % ROUTES.length]);
  if (seed % 2) [rotated[1], rotated[2]] = [rotated[2], rotated[1]];
  return rotated;
}

function compactFlag(epochId, path, route) {
  return `b_${hashInt(`${epochId}:${path}:${route}`).toString(36)}`;
}

function dynamicId(originId, entryRoute, path = "") {
  return `${DYNAMIC_PREFIX}${originId}|${entryRoute}|${path || "-"}`;
}

function endingId(originId, entryRoute, path) {
  return `${ENDING_PREFIX}${originId}|${entryRoute}|${path}`;
}

export function normalizeWorldFeed(data) {
  if (!data || data.schema !== 3 || !Array.isArray(data.epochs)) {
    return { schema: 3, generatedAt: null, finalized: false, entryEpochId: null, epochs: [] };
  }
  return {
    schema: 3,
    generatedAt: data.generatedAt || null,
    finalized: Boolean(data.finalized),
    entryEpochId: data.entryEpochId || data.epochs[0]?.id || null,
    epochs: data.epochs,
  };
}

export function makeDynamicEntryId(route, feed) {
  const originId = feed.entryEpochId || feed.epochs[0]?.id;
  return originId ? dynamicId(originId, route, "") : `${LIVE_PREFIX}${route}`;
}

export function isDynamicNodeId(nodeId) {
  return nodeId?.startsWith(DYNAMIC_PREFIX) || nodeId?.startsWith(ENDING_PREFIX);
}

function parseId(nodeId, prefix) {
  const [originId, entryRoute, path = "-"] = nodeId.slice(prefix.length).split("|");
  return { originId, entryRoute, path: path === "-" ? "" : path };
}

function entryContext(route, epoch, state) {
  const start = {
    nerve: { locationKey: "red_bridge", arrival: "你穿過紅門，腳下立刻傳來斷橋鋼板的震動。" },
    insight: { locationKey: "blue_gallery", arrival: "你穿過藍門，走進由透明資料牆包圍的觀測廊。" },
    empathy: { locationKey: "white_ferry", arrival: "你穿過白門，沿石階走到記名渡口的黑水岸邊。" },
  }[route];

  const companions = [];
  if (state?.flags?.includes("remember_mira") || state?.flags?.includes("named_mira_publicly")) companions.push("米菈");
  if (state?.flags?.includes("bugbeast_friend") || state?.items?.includes("Bug獸的契約")) companions.push("Bug獸");

  return {
    ...start,
    route,
    companions,
    thread: epoch?.openingThread || "三扇門背後的世界正在重新排列",
    inheritedChoice: "你選擇進入仍會生長的故事樹",
  };
}

function branchContent(epoch, pathSeed, offset = 0) {
  return {
    pressure: pick(epoch.pressures, pathSeed, offset),
    figure: pick(epoch.figures, pathSeed, offset + 1),
    revelation: pick(epoch.revelations, pathSeed, offset + 2),
    artifact: pick(epoch.artifacts, pathSeed, offset + 3),
    sensory: pick(epoch.sensory, pathSeed, offset + 4),
    stake: pick(epoch.stakes, pathSeed, offset + 5),
  };
}

function createChoices({ originId, entryRoute, path, context, epoch, seed }) {
  const location = LOCATIONS[context.locationKey];
  const routes = rotateRoutes(context.route, seed);
  const exits = location.exits;
  const figure = branchContent(epoch, seed).figure;

  return routes.map((targetRoute, index) => {
    const route = ROUTE_META[targetRoute];
    const nextPath = `${path}${index}`;
    const isFinal = Boolean(epoch.finale);
    let nextContext;
    let label;
    let result;

    if (index === 0) {
      const content = branchContent(epoch, seed, 10);
      label = `留在${location.name}，${targetRoute === "nerve" ? "正面處理眼前威脅" : targetRoute === "insight" ? "查清異常的運作規則" : "先保住現場的人與名字"}`;
      result = `你沒有離開${location.name}。眼前的危機是「${content.pressure}」。你暫時控制局面，但「${content.stake}」仍未解除，下一幕會繼續處理同一空間留下的後果。`;
      nextContext = {
        ...context,
        route: targetRoute,
        arrival: `你仍留在${location.name}。上一個選擇留下的變化尚未消失，${content.sensory}。`,
        thread: content.stake,
        inheritedChoice: label,
      };
    } else {
      const exit = exits[(seed + index) % exits.length];
      const destination = LOCATIONS[exit.destination];
      const companion = context.companions[index % Math.max(context.companions.length, 1)] || figure;
      const content = branchContent(epoch, seed, index * 11);
      label = index === 1
        ? exit.label
        : `跟隨${companion}，${exit.label}`;
      result = `${exit.travel}。你確實從${location.name}抵達${destination.name}，沒有跳過中間移動。新的線索是「${content.revelation}」，下一幕會從這條線索繼續。`;
      nextContext = {
        ...context,
        locationKey: exit.destination,
        route: targetRoute,
        arrival: `你依照上一個選擇，${exit.travel}，現在已抵達${destination.name}。`,
        companions: [...new Set([...context.companions, ...(index === 2 ? [companion] : [])])].slice(-3),
        thread: content.revelation,
        inheritedChoice: label,
      };
    }

    return {
      label,
      icon: route.icon,
      result,
      next: isFinal ? endingId(originId, entryRoute, nextPath) : dynamicId(originId, entryRoute, nextPath),
      effects: {
        nerve: targetRoute === "nerve" ? 2 : 0,
        insight: targetRoute === "insight" ? 2 : 0,
        empathy: targetRoute === "empathy" ? 2 : 0,
      },
      ...(targetRoute === "insight"
        ? { item: branchContent(epoch, seed, index + 20).artifact }
        : { flag: compactFlag(epoch.id, nextPath, targetRoute) }),
      nextContext,
    };
  });
}

function createNode({ originId, entryRoute, path, context, epoch, depth, state }) {
  const location = LOCATIONS[context.locationKey];
  const seed = hashInt(`${originId}:${entryRoute}:${path}:${epoch.id}:${context.locationKey}`);
  const content = branchContent(epoch, seed);
  const route = ROUTE_META[context.route];
  const companions = context.companions.length ? `同行者是${context.companions.join("、")}。` : "你目前沒有固定同行者。";
  const continuity = `${context.arrival} ${location.features[(seed + depth) % location.features.length]}。剛才使用的入口仍然可見，退路與前進方向都能在現場確認。`;

  return {
    id: dynamicId(originId, entryRoute, path),
    dynamic: true,
    releaseAt: epoch.releaseAt,
    title: `生長層 ${String(depth + 1).padStart(3, "0")} · ${route.label}：${location.name}`,
    subtitle: `本節點由路徑 ${path || "ROOT"} 生成；同一層的其他選擇會形成不同場景與後果。`,
    scene: `${location.scene}-${hashInt(path || entryRoute).toString(36)}`,
    accent: location.accent || route.accent,
    location: location.name,
    intro: `${continuity} 現場異常是「${content.pressure}」。${content.figure}正在處理這件事，並指出「${context.thread}」仍未解決。${companions}`,
    routeText: {
      nerve: `若直接施力，你會先改變${location.name}內的局勢；代價是${content.stake}可能立刻惡化。`,
      insight: `此地可觀察到的線索包括「${content.revelation}」。所有推論都只使用目前空間已有的物件與出口。`,
      empathy: `${content.figure}與${context.companions[0] || "現場被困者"}都受到同一事件影響；先保住他們會改變後續同行者。`,
      balanced: `你可以留在${location.name}解決問題，也能沿明確出口移動；下一幕會繼承實際位置。`,
    },
    continuityNote: `上一個行動：${context.inheritedChoice}。目前位置：${location.name}。可用出口：${location.exits.map((exit) => exit.label).join("、")}。`,
    choices: createChoices({ originId, entryRoute, path, context, epoch, seed }),
    finale: Boolean(epoch.finale),
    stateEcho: state?.items?.includes("月背鑰匙") ? "月背鑰匙在靠近出口時微微發熱。" : null,
  };
}

function buildStandardNode(nodeId, feed, state) {
  const { originId, entryRoute, path } = parseId(nodeId, DYNAMIC_PREFIX);
  const originIndex = feed.epochs.findIndex((epoch) => epoch.id === originId);
  if (originIndex < 0 || !ROUTES.includes(entryRoute)) return null;

  let context = entryContext(entryRoute, feed.epochs[originIndex], state);
  let node = null;

  for (let depth = 0; depth <= path.length; depth += 1) {
    const epoch = feed.epochs[originIndex + depth];
    if (!epoch) return null;
    const prefixPath = path.slice(0, depth);
    node = createNode({ originId, entryRoute, path: prefixPath, context, epoch, depth, state });
    if (depth === path.length) return node;
    const choiceIndex = Number(path[depth]);
    if (!Number.isInteger(choiceIndex) || !node.choices[choiceIndex]) return null;
    context = node.choices[choiceIndex].nextContext;
  }
  return node;
}

function buildEndingNode(nodeId, feed, state) {
  const { originId, entryRoute, path } = parseId(nodeId, ENDING_PREFIX);
  if (!path.length) return null;
  const parentPath = path.slice(0, -1);
  const choiceIndex = Number(path.at(-1));
  const parent = buildStandardNode(dynamicId(originId, entryRoute, parentPath), feed, state);
  const selected = parent?.choices?.[choiceIndex];
  if (!parent?.finale || !selected) return null;
  const context = selected.nextContext;
  const location = LOCATIONS[context.locationKey];
  const route = ROUTE_META[context.route];
  const companionText = context.companions.length
    ? `${context.companions.join("、")}留在你身旁，記得你如何一步步走到這裡。`
    : "沒有固定同行者替你作證，但沿途留下的選擇仍完整存在。";
  const endings = {
    nerve: ["不可逆的守護", "把力量交還眾人", "斬開尚未命名的未來"],
    insight: ["透明而可驗證的世界", "保留所有矛盾版本", "讓規則失去唯一作者"],
    empathy: ["萬名歸城", "以自己的名字交換眾人", "讓每條支線都有家"],
  }[context.route];
  const code = endings[choiceIndex] || `${route.label}結局`;

  return {
    id: nodeId,
    ending: true,
    endingCode: code,
    title: `最終結局：${code}`,
    subtitle: `這個結局只屬於路徑 ${path}，並繼承最後所在的${location.name}。`,
    scene: `ending-${location.scene}-${choiceIndex}`,
    accent: location.accent || route.accent,
    intro: `${context.arrival} 你沒有被突然傳送到陌生場所；最後決定就在${location.name}完成。${selected.result} ${companionText}`,
  };
}

export function buildDynamicNode(nodeId, feed, state) {
  if (nodeId?.startsWith(DYNAMIC_PREFIX)) return buildStandardNode(nodeId, feed, state);
  if (nodeId?.startsWith(ENDING_PREFIX)) return buildEndingNode(nodeId, feed, state);
  return null;
}

export function migrateLiveNodeId(nodeId, feed) {
  if (!nodeId) return nodeId;
  if (nodeId.startsWith(LIVE_PREFIX)) return makeDynamicEntryId(nodeId.slice(LIVE_PREFIX.length), feed);
  const legacy = nodeId.match(/^live-\d{8}-\d{2}-(nerve|insight|empathy)$/);
  return legacy ? makeDynamicEntryId(legacy[1], feed) : nodeId;
}
