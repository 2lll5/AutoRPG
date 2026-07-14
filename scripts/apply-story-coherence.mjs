import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const runtimeSource = path.join(root, "overrides", "runtimeStory.coherent.js");
const runtimeTarget = path.join(root, "lib", "runtimeStory.js");
const storyTarget = path.join(root, "lib", "story.js");

if (!fs.existsSync(runtimeSource)) {
  throw new Error(`Missing coherent runtime override: ${runtimeSource}`);
}

fs.copyFileSync(runtimeSource, runtimeTarget);

let story = fs.readFileSync(storyTarget, "utf8");
let patched = 0;
const warnings = [];

function findCallBounds(source, label) {
  const labelIndex = source.indexOf(`"${label}"`);
  if (labelIndex < 0) return null;
  const start = source.lastIndexOf("choice(", labelIndex);
  if (start < 0) return null;

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "(") depth += 1;
    if (char === ")") {
      depth -= 1;
      if (depth === 0) return { start, end: index + 1 };
    }
  }

  return null;
}

function replaceChoice(oldLabel, replacement, newLabel = null) {
  const bounds = findCallBounds(story, oldLabel);
  if (!bounds) {
    if (newLabel && story.includes(`"${newLabel}"`)) return;
    warnings.push(oldLabel);
    return;
  }
  story = `${story.slice(0, bounds.start)}${replacement}${story.slice(bounds.end)}`;
  patched += 1;
}

replaceChoice(
  "檢查軍令印章，找出真正的叛徒",
  `choice(
        "讓三位軍侯重演收令順序，逼叛徒露出破綻",
        "✧",
        "你把三份軍令分別交回三位軍侯，要求他們照昨夜的順序重演。第三人接過假令時，下意識摸向袖中的攝政王火漆。書記見事敗便衝上雨台；你追過兩座連絡橋，在他啟動傳送咒前奪下火漆。咒門沒有消失，反而打開通往守界者神殿的雨幕階梯。你押著書記走完階梯，親自把證物放上神殿祭壇。",
        "maintainer-shrine",
        { nerve: 0, insight: 2, empathy: 0 },
        { flag: "exposed_war_council" }
      )`
);

replaceChoice(
  "把三份記憶合在一個人身上",
  `choice(
        "讓三個自己各說出一段只有本人知道的記憶，再完成合魂",
        "✧",
        "你沒有立刻啟動法陣，而是先讓三個自己各說出一段無法偽造的記憶。確認沒有人被囚塔替換後，法袍的你才畫下最後一道合魂紋。三份記憶融合時，晶壁底部浮出世界樹根文；一名守書人從裂縫伸手求救。你們合力撬開根門，沿著樹液甬道走了近一刻鐘，最後抵達正在急促跳動的世界樹書庫。",
        "archive-heart",
        { nerve: 0, insight: 2, empathy: -1 },
        { item: "三魂水晶" }
      )`
);

replaceChoice(
  "留下來聽完乘客的故事",
  `choice(
        "逐一核對乘客的死亡地點，找出同一個造假者",
        "♡",
        "你沒有只聽故事，而是把每名乘客的姓名、死亡地點和最後見到的人寫在車票背面。七張車票都出現同一枚守書人印章。獨眼老貓立刻改道，把黑鹿馬車駛入一條被樹根頂開的廢棄隧道。車輪停下時，你已站在世界樹書庫的根門前，手裡握著能指認造假者的七份證詞。",
        "archive-heart",
        { nerve: 0, insight: 0, empathy: 2 },
        { flag: "heard_lost_legends" }
      )`
);

replaceChoice(
  "砸碎星鏡，阻止他裁決別人的未來",
  `choice(
        "把星鏡轉向先知自己，逼他看見被刪除者的下場",
        "⚔",
        "你沒有直接把鏡子砸成無用碎片，而是扳動鏡架，讓先知看見那些被他剪掉的家庭與軍隊。先知失控揮杖，鏡面才在衝突中破裂。碎片落地後拼出守界者神殿的雨幕座標；先知承認裁決命令來自那裡。你帶著最大一塊鏡片下塔，依照座標穿過暴雨，抵達神殿正門。",
        "maintainer-shrine",
        { nerve: 2, insight: 0, empathy: 0 },
        { flag: "broke_judgement_mirror" }
      )`
);

replaceChoice(
  "追查第一條被改寫的星軌",
  `choice(
        "把三面星鏡疊在一起，沿黑色星軌追到改寫現場",
        "✧",
        "三面星鏡重疊後，黑色星軌不再指向天空，而是穿過塔底地板。你和先知拆開觀測台，找到一條被樹根包住的舊維修井。你順著仍在發熱的墨跡下降，途中撿到三張剛改寫完的預言原稿；井底的根門通往世界樹書庫。守書人看見原稿時，立刻把你帶到正在自行改字的樹液心臟前。",
        "archive-heart",
        { nerve: 0, insight: 2, empathy: 0 },
        { item: "第十三星圖" }
      )`
);

replaceChoice(
  "整理誓碑，找出真正出口",
  `choice(
        "按死亡日期重排誓碑，找出仍在使用墓窟的人",
        "✧",
        "你依死亡日期重排七塊誓碑，只有最新一塊的背面沾著紫色燈油。燈油一路滴進空棺下方的運貨通道。你等守墓人走遠後鑽進通道，推開盡頭木板，正好躲在月蝕集市的拍賣台下。台上商人正在出售你第一次背叛自己的記憶，而你手裡的誓碑足以證明貨物來自古王墓。",
        "moon-market",
        { nerve: 0, insight: 2, empathy: 0 },
        { item: "古王墓圖" }
      )`
);

replaceChoice(
  "讀出王矛上的契約",
  `choice(
        "拓下九支王矛的契約，找出下令釘龍的人",
        "✧",
        "你把濕羊皮逐一壓上九支王矛，拼出完整契約。最後一行不是古王簽名，而是上一任守界者的真名。契約完成時，裂谷上方降下一道逆流雨幕，形成只能由契約持有人通過的石橋。你帶著拓本走過裂谷；橋的另一端就是守界者神殿，守界者已在門前等你交出證據。",
        "maintainer-shrine",
        { nerve: 0, insight: 2, empathy: 0 },
        { item: "九矛契約" }
      )`
);

replaceChoice(
  "帶走古龍最後一顆蛋",
  `choice(
        "先替龍蛋包上隔熱鎧布，再護送它離開獵龍隊射程",
        "♡",
        "索爾迦恩用尾尖把龍蛋推到你腳邊，並用爪子在地上畫出一條避開獵龍隊的舊獸徑。你把鎧布浸濕包住蛋殼，趁古龍以火牆斷後，沿獸徑穿過兩座乾涸峽谷。天黑前，銀葉樹主動垂下枝條遮住你們；鹿角精靈王在林界接過傷藥，帶你進入低語森林。",
        "whisper-forest",
        { nerve: 0, insight: 0, empathy: 2 },
        { item: "赤金龍蛋" }
      )`
);

replaceChoice(
  "與精靈王簽訂不看血統的盟約",
  `choice(
        "讓人類難民、狼人與樹精共同在盟約上留下手印",
        "♡",
        "你拒絕只和精靈王交換信物，而是把所有需要被保護的人叫到林地中央。人類難民、狼人、樹精與被逐學徒依次在白銀誓羽上留下手印。最後一枚手印落下時，林外的雨逆著樹幹流向同一處，露出守界者神殿的石門。精靈王派兩名弓手同行，你們帶著多人共同簽署的盟約走進神殿。",
        "maintainer-shrine",
        { nerve: 0, insight: 0, empathy: 2 },
        { item: "白銀誓羽" }
      )`
);

replaceChoice(
  "奪走長杖，讓所有人自行承擔後果",
  `choice(
        "擊落裁決長杖，逼守界者親自打開被他封死的軍道",
        "⚔",
        "你擊落長杖後沒有直接離開，而是把杖尖抵在三幅戰爭壁畫中央，要求守界者指出仍有人受困的路線。他沉默片刻，解除東側封印。牆後露出一條埋藏多年的軍道，盡頭傳來傷兵求救與攻城鼓聲。你和守界者走完整條軍道，從斷裂劍門後方進入東城臨時軍營。",
        "red-gate",
        { nerve: 2, insight: 0, empathy: -1 },
        { flag: "seized_warden_staff" }
      )`
);

replaceChoice(
  "刺穿心臟，停止它繼續改寫",
  `choice(
        "切開纏住樹心的王冠根瘤，阻止它繼續改寫",
        "⚔",
        "守書人先用銀針指出樹心表面的黑色根瘤：真正改寫故事的是寄生在心臟外層的王冠根，不是世界樹本身。你用誓劍切開根瘤，黑色樹汁噴滿地面，失控赤根立刻縮回牆內，露出被封住的古代軍用石梯。梯下的守軍正在搬運傷兵；他們告訴你東城劍門即將失守。你跟著守軍下到地底，再從劍門後方進入臨時軍營。",
        "red-gate",
        { nerve: 2, insight: 0, empathy: -1 },
        { flag: "wounded_worldtree" }
      )`,
  "切開纏住樹心的王冠根瘤，阻止它繼續改寫"
);

replaceChoice(
  "把所有改寫紀錄公開給王國",
  `choice(
        "把原稿與改寫版本逐頁裝訂，送進王室咒文庫公開查驗",
        "✧",
        "你沒有只把文件丟給群眾，而是讓守書人把每份原稿和修改痕跡裝訂成可核對的雙頁冊。第一卷星典吸收最後一頁後，封面展開成王室咒文庫的星門座標。你帶著三箱證據穿過星門，抵達咒文庫中央；高塔法師與平民代表已被召來，無法再否認文件來源。",
        "blue-gate",
        { nerve: 0, insight: 2, empathy: 0 },
        { item: "第一卷星典" }
      )`
);

replaceChoice(
  "答應記住結束的故事，但要求它停止操控人",
  `choice(
        "替亡魂完成最後一頁，交換樹心解除無名者通道",
        "♡",
        "你逐一念出亡魂姓名，並替每個沒有結尾的故事寫下死亡地點與見證者。樹心的跳動慢下來，纏住白根的尖刺逐根鬆開，露出一條通往無名者候車廳的地下通道。你和守書人帶著完成的名冊走過白根長廊，親手把第一批名字交到米菈的登記桌上。",
        "white-gate",
        { nerve: 0, insight: 0, empathy: 2 },
        { flag: "promised_worldtree" }
      )`
);

replaceChoice(
  "衝上屋頂，當眾喊出米菈的名字",
  `choice(
        "撞響市場警鐘，讓整條街一起喊出米菈的名字",
        "♡",
        "你衝上染坊屋頂撞響銅鐘，先喊出米菈的名字，再逼追兵當眾說明逮捕理由。街坊從窗戶探頭，數百人跟著重複她的名字，抹名咒當場失控。負責收購失名者的鹿角掮客見法術失敗，轉身逃進一扇紫燈側門。你和米菈追過三條屋巷，從側門進入正在開市的真名夜市。",
        "name-market",
        { nerve: 0, insight: 0, empathy: 2 },
        { flag: "named_mira_publicly" }
      )`
);

replaceChoice(
  "把破碎王冠交給難民代表",
  `choice(
        "把破碎王冠砸成通行牌，先送孩子與傷者出城",
        "♡",
        "難民代表沒有戴上王冠。你們把它砸成十二枚通行牌，讓孩子與重傷者先穿過封鎖線。最後一名孩子卻被鹿角商人攔下，對方聲稱她的姓名已被拿去抵債。你帶著難民代表和剩下的王冠碎片追進商人的紫燈巷，抵達真名夜市，準備用公開證人推翻這筆交易。",
        "name-market",
        { nerve: 0, insight: 0, empathy: 2 },
        { item: "難民通行牌" }
      )`
);

fs.writeFileSync(storyTarget, story, "utf8");
console.log(`Applied coherent story runtime and ${patched} core transition patches.`);
if (warnings.length) {
  console.warn(`Story transition labels not found: ${warnings.join("、")}`);
}
