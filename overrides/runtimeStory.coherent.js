export const LIVE_PREFIX = "$live:";
const DYNAMIC_PREFIX = "dyn|";
const ENDING_PREFIX = "end|";
const ROUTES = ["nerve", "insight", "empathy"];

const ROUTE_META = {
  nerve: { label: "劍誓", icon: "⚔", accent: "rose" },
  insight: { label: "星紋", icon: "✧", accent: "cyan" },
  empathy: { label: "靈契", icon: "♡", accent: "violet" },
};

const LOCATIONS = {
  ember_pass: {
    name: "赤焰山口",
    scene: "ember-pass",
    accent: "rose",
    details: [
      "風把折斷長劍吹得互相敲擊，像一排沒有節奏的警鐘",
      "翻覆軍車堵住半條山道，車底還壓著兩名活著的斥候",
      "對面山脊的黑龍軍正在架設第二具投火弩",
    ],
    exits: [
      {
        destination: "dragon_belfry",
        trigger: "敵軍傳令兵搶走龍鐘塔的布防圖",
        passage: "你追著他越過三段被龍火燒裂的石橋，在鐘聲響起前撞進龍鐘塔外庭",
      },
      {
        destination: "royal_forge",
        trigger: "軍車底下露出矮人王室的鍛爐印記",
        passage: "你撬開刻著錘徽的礦門，帶隊穿過冒著熱氣的舊礦井，最後抵達古王鍛爐",
      },
      {
        destination: "storm_spire",
        trigger: "山口上空的護城雷網突然反向擊中自己人",
        passage: "你抓住尚未熔斷的避雷鏈攀上岩壁，從被雷劈開的側門闖入雷鳴尖塔",
      },
    ],
  },
  dragon_belfry: {
    name: "龍鐘塔外庭",
    scene: "dragon-belfry-yard",
    accent: "amber",
    details: [
      "斷裂的龍骨鐘槌壓著一名守衛，他每次呼吸都會咳出血沫",
      "銅門被人從內側纏死，門縫裡不斷滲出帶硫磺味的黑煙",
      "城牆上的三名弩手已經射空箭筒，只能用石塊阻擋攻城梯",
    ],
    exits: [
      {
        destination: "belfry_sanctum",
        trigger: "鐘腹裡有人敲出王室求救暗號",
        passage: "你拆下鐘槌上的龍骨楔，撞開纏死的銅門，沿著震動中的石階進入內殿",
      },
      {
        destination: "ash_citadel",
        trigger: "東牆升起代表城破的三道紅煙",
        passage: "你帶著僅存弩手跨過兩座傾斜箭塔，踩著臨時木橋趕到赤灰堡壘",
      },
      {
        destination: "royal_forge",
        trigger: "黑煙裡混著只有古王鍛爐才會使用的赤鐵粉",
        passage: "你掀開排水柵欄，順著溫熱水流爬過低矮石道，在熔爐轟鳴中抵達古王鍛爐",
      },
    ],
  },
  royal_forge: {
    name: "古王鍛爐",
    scene: "royal-forge",
    accent: "amber",
    details: [
      "主熔爐閘門卡死，熔鐵正沿地溝逼近工匠宿舍",
      "矮人工匠把龍火傷員搬上鐵桌，卻只剩一瓶止痛藥",
      "三條魔力導管同時過熱，牆上的王家徽記被照得像在燃燒",
    ],
    exits: [
      {
        destination: "storm_spire",
        trigger: "過熱導管的源頭來自雷鳴尖塔",
        passage: "你關閉副爐，把濕布纏在口鼻上，沿著發紅的導管維修洞爬進雷鳴尖塔底層",
      },
      {
        destination: "old_king_road",
        trigger: "一名工匠承認有人從封死的王道運走禁制兵器",
        passage: "你用工匠長的印章解除礦門，沿地下石路追蹤新鮮車轍，進入廢棄古王道",
      },
      {
        destination: "dragon_belfry",
        trigger: "升降台上掉下一枚仍帶血的龍鐘守衛徽章",
        passage: "你啟動鎖鏈升降台，在火星與金屬摩擦聲中升回地面，正好落在龍鐘塔外庭",
      },
    ],
  },
  storm_spire: {
    name: "雷鳴符文尖塔",
    scene: "storm-rune-spire",
    accent: "cyan",
    details: [
      "塔頂水晶每次放電，都會把一段龍語烙進牆面",
      "護城法師倒在控制台旁，左手仍死死按著停止符文",
      "箭孔灌進來的風帶著赤灰堡壘燃燒後的焦味",
    ],
    exits: [
      {
        destination: "sky_battlement",
        trigger: "塔外傳來獅鷲騎手的求救哨",
        passage: "你扣上符文安全繩，爬過三層避雷平台，在狂風裡翻上天空城牆",
      },
      {
        destination: "ley_vault",
        trigger: "控制台顯示地脈晶窟正在反向抽走護城魔力",
        passage: "你打開符文地板，沿著藍光法脈下行，穿過兩道結霜石門進入月晶窟",
      },
      {
        destination: "ash_citadel",
        trigger: "堡壘信號旗只打到一半便被人砍斷",
        passage: "你頂著側風跑過狹窄石橋，從上層箭台翻進正在交戰的赤灰堡壘",
      },
    ],
  },
  star_archive: {
    name: "星典秘庫",
    scene: "star-archive",
    accent: "cyan",
    details: [
      "中央星盤把一條從未記錄的黑色星軌投在天花板上",
      "封閉書櫃被人撬開，三卷禁書和一名值夜學徒同時失蹤",
      "桌下藏著一頁仍在滲血的羊皮紙，上面只寫了半句警告",
    ],
    exits: [
      {
        destination: "worldtree_heart",
        trigger: "血字沿著地板爬向世界樹根部",
        passage: "你念出羊皮紙上的古精靈根文，書櫃後長出一道樹門，把你送進世界樹書庫",
      },
      {
        destination: "oath_catacomb",
        trigger: "被偷走的禁書在地下誓碑上留下同樣墨跡",
        passage: "你撬開封印階梯，循著尚未乾透的黑墨一路下到誓痕墓窟",
      },
      {
        destination: "ley_vault",
        trigger: "黑色星軌的終點標在地脈月晶窟",
        passage: "你用星典殘頁啟動月銀升降籠，下降到寒霧瀰漫的地脈晶窟",
      },
    ],
  },
  ley_vault: {
    name: "地脈月晶窟",
    scene: "ley-crystal-vault",
    accent: "blue",
    details: [
      "中央月晶柱從中裂開，冷霧把地面凍成一層薄冰",
      "封死晶壁後傳來礦工用木槌敲出的求救節奏",
      "每根晶柱都映出不同戰場，其中一幅正是你背後的洞窟",
    ],
    exits: [
      {
        destination: "crown_vault",
        trigger: "變黑的魔力絲全部指向王冠聖庫",
        passage: "你披上抗寒斗篷，踩著裂開的藍晶脈穿過兩道封魔門，抵達王冠聖庫",
      },
      {
        destination: "moon_observatory",
        trigger: "晶柱投影出一名觀星學徒正在焚燒證據",
        passage: "你從晶窟後方的祕法石梯向上攀升，在最後一張星圖燒完前闖進月輪觀星塔",
      },
      {
        destination: "oath_catacomb",
        trigger: "求救敲擊其實是古王墓的開門節奏",
        passage: "你照節奏敲開幽藍裂縫，側身穿過積水墓道，來到誓痕墓窟",
      },
    ],
  },
  moon_observatory: {
    name: "月輪觀星塔",
    scene: "moon-observatory",
    accent: "cyan",
    details: [
      "主觀星鏡偏離軌道，聚焦的月光正燒穿王都民宅",
      "三名學徒爭著銷毀同一份預言，紙角已經起火",
      "圓頂投影顯示北境軍隊正從地圖空白處逼近",
    ],
    exits: [
      {
        destination: "sky_battlement",
        trigger: "觀星鏡照出城牆上有人向敵軍打信號",
        passage: "你抓住鏡架垂下的纜索滑過塔間空隙，落在天空城牆的瞭望台",
      },
      {
        destination: "star_archive",
        trigger: "預言原稿的缺頁藏在星典秘庫",
        passage: "你搶下尚未燒完的預言，沿刻著古代星名的螺旋梯衝回星典秘庫",
      },
      {
        destination: "silverleaf_hospice",
        trigger: "被月光灼傷的居民被送往銀葉聖院",
        passage: "你調回觀星鏡救下街區，再沿空中石廊護送傷者進入銀葉療癒聖院",
      },
    ],
  },
  true_name_bazaar: {
    name: "真名夜市",
    scene: "true-name-bazaar",
    accent: "lime",
    details: [
      "打翻的靈魂瓶放出十幾個名字，像螢火蟲般鑽進人群",
      "鹿角守門人封住出口，聲稱市場裡混進了王都密探",
      "拍賣台綁著一名沒有臉的孩子，台下買家正在加價",
    ],
    exits: [
      {
        destination: "silverleaf_hospice",
        trigger: "無臉孩子的脈搏只對銀葉藥草有反應",
        passage: "你割斷繩索，把孩子藏進藥草車，推著車從後門闖入銀葉聖院",
      },
      {
        destination: "oath_catacomb",
        trigger: "密探把偷來的名字塞進地下拍賣梯",
        passage: "你故意放走密探，再跟著他穿過拍賣台暗門，一路下到誓痕墓窟",
      },
      {
        destination: "oath_ferry",
        trigger: "逃散的名字全往黑水碼頭飛去",
        passage: "你用空瓶收攏名字，跳上正要離岸的月蝕誓舟，回到幽誓渡口",
      },
    ],
  },
  silverleaf_hospice: {
    name: "銀葉療癒聖院",
    scene: "silverleaf-hospice",
    accent: "violet",
    details: [
      "走廊擺滿臨時病床，醫師正剪掉一條條染黑繃帶",
      "一名昏迷斥候反覆念出敵軍將領的名字",
      "藥房被人從內側鎖住，裡面不斷傳出玻璃碎裂聲",
    ],
    exits: [
      {
        destination: "worldtree_heart",
        trigger: "染黑繃帶裡長出世界樹才有的寄生根",
        passage: "你封存根鬚樣本，循著病歷上的精靈字跡穿過樹皮門，抵達世界樹書庫",
      },
      {
        destination: "dream_lake",
        trigger: "昏迷斥候只在聽見地下湖水聲時恢復意識",
        passage: "你把斥候綁在擔架上，從月井石梯下降，將他帶到夢境地下湖",
      },
      {
        destination: "true_name_bazaar",
        trigger: "藥房竊賊帶著解毒劑逃回真名夜市",
        passage: "你撞開藥房後門，踩著一路灑落的銀葉粉追進真名夜市",
      },
    ],
  },
  dream_lake: {
    name: "夢境地下湖",
    scene: "dream-lake",
    accent: "violet",
    details: [
      "翻覆小舟的船底有人用力敲擊，聲音卻來自水下",
      "星露鐘乳石逐根熄滅，洞窟正陷入完全黑暗",
      "湖面映出的不是你，而是一名穿王袍的陌生人",
    ],
    exits: [
      {
        destination: "worldtree_heart",
        trigger: "水下敲擊者拿著世界樹書庫的守門骨牌",
        passage: "你潛入船底救出守書人，扶正小舟，划向湖心長出的世界樹根島",
      },
      {
        destination: "oath_catacomb",
        trigger: "王袍倒影指向半淹古墓道",
        passage: "你踏進及腰冷水，跟著倒影穿過半淹石道，進入誓痕墓窟",
      },
      {
        destination: "oath_ferry",
        trigger: "熄滅的鐘乳石順序正是渡口的求援燈號",
        passage: "你點亮最後三根星露石，沿岸梯趕回黑水碼頭的幽誓渡口",
      },
    ],
  },
  old_king_road: {
    name: "廢棄古王道",
    scene: "old-king-road",
    accent: "amber",
    details: [
      "濕泥裡新出現一列馬蹄印，卻沒有任何馬匹經過",
      "倒塌拱門壓著一名信使，他仍緊抱密封軍令",
      "不滅墓火突然全變成藍色，表示大批亡魂正在靠近",
    ],
    exits: [
      {
        destination: "ghost_caravan",
        trigger: "軍令要求亡魂驛站在今夜封鎖所有乘客",
        passage: "你救出信使，奪下一匹無主黑鹿，趕在封站前抵達亡魂驛站",
      },
      {
        destination: "oath_catacomb",
        trigger: "無馬蹄印在王陵岔路突然消失",
        passage: "你移開生鏽王盾，沿著仍在滴泥的狹窄岔道深入誓痕墓窟",
      },
      {
        destination: "royal_forge",
        trigger: "密封軍令使用古王鍛爐的火漆",
        passage: "你帶著軍令穿過矮人維修道，從熔爐後方回到古王鍛爐",
      },
    ],
  },
  ghost_caravan: {
    name: "亡魂驛站",
    scene: "ghost-caravan-station",
    accent: "amber",
    details: [
      "月台長椅坐滿帶傷英雄，其中一人正逐漸變透明",
      "黑鹿馬車少了一匹鹿，車夫拒絕在日出前發車",
      "售票窗堆著今天才死亡的人名，最上面一張寫著你的姓氏",
    ],
    exits: [
      {
        destination: "true_name_bazaar",
        trigger: "失蹤黑鹿被人看見拉著一車名字進入夜市",
        passage: "你把灰狼騎士套上備用韁繩，代替缺少的黑鹿，把整車亡魂送到真名夜市",
      },
      {
        destination: "ley_vault",
        trigger: "逐漸透明的英雄胸口嵌著月晶碎片",
        passage: "你用碎片打開驛站密門，背著英雄沿地下石道進入地脈月晶窟",
      },
      {
        destination: "old_king_road",
        trigger: "售票簿顯示你的死亡紀錄來自古王道",
        passage: "你搶走售票簿，循著墓火返回古王道，尋找尚未發生的伏擊",
      },
    ],
  },
  worldtree_heart: {
    name: "世界樹書庫",
    scene: "worldtree-library",
    accent: "cyan",
    details: [
      "樹液心臟跳得過快，附近書架正一排排倒下",
      "守書人被根鬚纏住腳踝，手裡仍抓著改寫紀錄",
      "三條根文廊道同時封閉，門上浮出同一句警告",
    ],
    exits: [
      {
        destination: "crown_vault",
        trigger: "寄生根的末端纏在王冠聖庫的封印上",
        passage: "你切下寄生根當作引路物，穿過赤根廊道，抵達王冠聖庫",
      },
      {
        destination: "star_archive",
        trigger: "改寫紀錄缺少的原稿仍鎖在星典秘庫",
        passage: "你把守書人從根鬚裡拖出來，跟著發光星葉穿過密集書架，回到星典秘庫",
      },
      {
        destination: "silverleaf_hospice",
        trigger: "樹心毒素已透過白根流進療癒聖院",
        passage: "你截斷受污染白根，把樣本裝進銀瓶，趕到銀葉聖院阻止醫師繼續用毒水治療",
      },
    ],
  },
  oath_catacomb: {
    name: "誓痕墓窟",
    scene: "oath-catacomb",
    accent: "violet",
    details: [
      "一座石棺被人從內側推開，棺蓋留下還很新的刮痕",
      "黑曜誓碑開始滲血，其中一塊刻著你上一個選擇",
      "墓道盡頭傳來鐵鏈拖地聲，守墓人正在逐門檢查",
    ],
    exits: [
      {
        destination: "star_archive",
        trigger: "滲血誓碑拼出星典秘庫被偷走的索引",
        passage: "你拆下三塊誓碑排成星序，石階重新亮起，直通星典秘庫",
      },
      {
        destination: "dream_lake",
        trigger: "空棺底部湧出帶星光的湖水",
        passage: "你躲進空棺避開守墓人，等棺底完全沉沒後游進夢境地下湖",
      },
      {
        destination: "ghost_caravan",
        trigger: "鐵鏈聲其實來自被扣留的亡魂車隊",
        passage: "你砍斷墓門鐵鏈，放出被扣留的亡魂，跟著車隊抵達亡魂驛站",
      },
    ],
  },
  belfry_sanctum: {
    name: "龍鐘塔內殿",
    scene: "dragon-belfry-sanctum",
    accent: "rose",
    details: [
      "巨型龍骨鐘擋住出口，鐘腹裡有人敲出求救節奏",
      "祭壇上的王冠寶石剛被拔走，地面還留著濕腳印",
      "垂落鎖鏈在無風狀態下劇烈擺動，像有東西在塔頂奔跑",
    ],
    exits: [
      {
        destination: "sky_battlement",
        trigger: "濕腳印一路爬上鐘塔外牆",
        passage: "你避開鐘擺，抓著垂鏈爬上龍骨棧道，翻到天空城牆",
      },
      {
        destination: "moon_observatory",
        trigger: "被拔走的寶石正讓月輪觀星鏡失控",
        passage: "你打開祭壇後的王室密道，穿過封閉石廊，闖入月輪觀星塔",
      },
      {
        destination: "dragon_belfry",
        trigger: "鐘腹求救者其實被壓在外庭鐘槌下",
        passage: "你用鎖鏈抬起龍骨鐘，沿石階返回外庭，救出被壓住的守衛",
      },
    ],
  },
  sky_battlement: {
    name: "天空城牆",
    scene: "sky-battlement",
    accent: "rose",
    details: [
      "一頭受傷獅鷲掛在吊籃索具上，左翼被弩箭貫穿",
      "城牆下的街區正在撤離，東側城門卻遲遲沒有打開",
      "高空石橋被雷劈掉半截，對岸士兵正用繩索求援",
    ],
    exits: [
      {
        destination: "ash_citadel",
        trigger: "射傷獅鷲的箭使用赤灰堡壘庫存的箭羽",
        passage: "你替獅鷲拔箭止血，讓牠載你越過斷橋，直接落在赤灰堡壘天台",
      },
      {
        destination: "belfry_sanctum",
        trigger: "求援繩索綁著龍鐘塔內殿的鑰匙",
        passage: "你把繩索固定在垛口，盪過斷橋，沿內梯下降到龍鐘塔內殿",
      },
      {
        destination: "moon_observatory",
        trigger: "東門不開是因為觀星塔發出錯誤封城令",
        passage: "你修好獅鷲吊籃，沿索道滑向月輪觀星塔，準備撤銷封城令",
      },
    ],
  },
  ash_citadel: {
    name: "赤灰堡壘",
    scene: "ash-citadel",
    accent: "rose",
    details: [
      "東牆剛被龍火炸開缺口，士兵正用糧車堵住",
      "三位軍侯的旗幟同時降到半旗，卻沒人知道誰下令",
      "難民擠在上層箭台，唯一逃生梯被守軍鎖住",
    ],
    exits: [
      {
        destination: "dragon_belfry",
        trigger: "假軍令要求龍鐘塔停止敲響撤離鐘",
        passage: "你把假軍令釘在盾牌上當證物，跨過屋頂木橋趕往龍鐘塔外庭",
      },
      {
        destination: "storm_spire",
        trigger: "偽造軍令的蠟印需要雷鳴尖塔的高溫符文",
        passage: "你抓住逃跑書記，押著他穿過弩炮平台，進入雷鳴尖塔",
      },
      {
        destination: "old_king_road",
        trigger: "鎖住逃生梯的人把鑰匙丟進地下古王道",
        passage: "你剪開鎖鏈讓難民先走，再沿外牆石梯追進廢棄古王道",
      },
    ],
  },
  crown_vault: {
    name: "王冠聖庫",
    scene: "crown-vault",
    accent: "blue",
    details: [
      "三色王冠碎片互相撞擊，每一次碰撞都讓牆面裂開",
      "守庫人倒在護罩外，胸前插著一枚沒有紋章的匕首",
      "數百條光絲從王冠連向居民，其中十幾條正在變黑",
    ],
    exits: [
      {
        destination: "ley_vault",
        trigger: "無紋匕首沾著月晶粉末",
        passage: "你收起匕首，關閉護罩，沿藍晶地脈追進月晶窟",
      },
      {
        destination: "worldtree_heart",
        trigger: "變黑光絲的另一端扎進世界樹心臟",
        passage: "你切斷一條黑絲作為追蹤線，穿過發光樹根廊道進入世界樹書庫",
      },
      {
        destination: "moon_observatory",
        trigger: "護罩紀錄顯示兇手利用觀星塔遮蔽身影",
        passage: "你打開王室緊急出口，沿垂直石梯爬上月輪觀星塔",
      },
    ],
  },
  oath_ferry: {
    name: "幽誓渡口",
    scene: "oath-ferry",
    accent: "violet",
    details: [
      "黑水碼頭擠滿沒有姓名木牌的難民",
      "渡船白羽帆被箭射穿，船夫正用麻繩緊急修補",
      "岸邊石碑每隔幾秒就少一個名字，抹除咒正在逼近",
    ],
    exits: [
      {
        destination: "true_name_bazaar",
        trigger: "抹除咒的施術者把偷來的名字送往夜市",
        passage: "你把白羽帆補成誘餌，讓誓舟順著偷名者的燈號駛進真名夜市",
      },
      {
        destination: "silverleaf_hospice",
        trigger: "一名難民的名字被刪除後立刻陷入昏迷",
        passage: "你背起昏迷難民，帶隊穿過掛滿還願絲帶的銀葉步道，抵達療癒聖院",
      },
      {
        destination: "dream_lake",
        trigger: "水下精靈燈排出被刪除名字的順序",
        passage: "你潛下岸梯，跟著精靈燈穿過半淹隧道，進入夢境地下湖",
      },
    ],
  },
};

const ACTIONS = {
  nerve: [
    {
      label: ({ pressure, artifact }) => `把${artifact}綁上斷箭，射進危機中心`,
      result: ({ location, pressure, figure, stake }) =>
        `你沒有對著人群亂揮劍，而是把目標鎖定在「${pressure}」的源頭。${figure}替你標出弱點，你一擊打斷核心機關；現場暫時安靜下來，但${stake}已成為必須立刻處理的新問題。`,
      mode: "stay",
    },
    {
      label: ({ figure }) => `假裝負傷，引${figure}口中的內應現身`,
      result: ({ revelation, stake }) =>
        `你故意把武器丟在顯眼處，讓隊伍散開。內應果然來搜你的行囊，當場暴露「${revelation}」。他見事敗便奪路逃走，而${stake}迫使你不能放任他離開。`,
      mode: "pursue",
    },
    {
      label: ({ location, pressure }) => `拆掉${location.name}的防線，改造成一次反伏擊`,
      result: ({ figure, pressure, sensory }) =>
        `你讓${figure}把守軍撤到第二道掩體，再故意留下缺口。敵人為了擴大「${pressure}」全部擠進狹道，你在${sensory}中封死退路，逼出一條通往幕後據點的逃生線。`,
      mode: "pursue",
    },
    {
      label: ({ figure, artifact }) => `用${artifact}交換人質，近身擒住${figure}`,
      result: ({ revelation, stake }) =>
        `你把${artifact}放在地上，要求先放人。交換進行到一半時，你抓住對方手腕，把人質拉回掩體。俘虜承認「${revelation}」，卻警告${stake}。`,
      mode: "escort",
    },
  ],
  insight: [
    {
      label: ({ artifact }) => `把${artifact}拆成三份，驗出哪一份被動過手腳`,
      result: ({ revelation, pressure, stake }) =>
        `你用火、鹽和月光分別檢驗碎片，只有第三份在接近「${pressure}」時變黑。這證明「${revelation}」，也讓你確定${stake}不是意外。`,
      mode: "stay",
    },
    {
      label: ({ figure }) => `故意說錯一段情報，觀察${figure}先看向誰`,
      result: ({ revelation, sensory }) =>
        `你當眾說出一個錯誤地點。${figure}沒有反駁，卻立刻看向出口旁的同夥。你順著視線找到藏起來的證物，確認「${revelation}」；${sensory}，對方已準備滅口。`,
      mode: "pursue",
    },
    {
      label: ({ pressure }) => `讓「${pressure}」再發生一次，但先布好捕捉法陣`,
      result: ({ artifact, revelation, stake }) =>
        `你冒險重現相同條件，並用${artifact}記錄每一道魔力變化。法陣捕捉到一條離開現場的殘痕，證明「${revelation}」。若不順著殘痕追查，${stake}。`,
      mode: "pursue",
    },
    {
      label: ({ figure, artifact }) => `請${figure}辨認${artifact}，再比對他的口供`,
      result: ({ revelation, stake }) =>
        `${figure}說自己從未見過${artifact}，手指卻下意識避開上面的家徽。你拆穿謊言後得到完整口供：「${revelation}」。他願意帶路，因為${stake}也會害死他。`,
      mode: "escort",
    },
  ],
  empathy: [
    {
      label: ({ figure }) => `讓${figure}先把最害怕承認的事說完`,
      result: ({ revelation, stake }) =>
        `你命令其他人收起武器，給${figure}一分鐘。對方終於承認「${revelation}」，並說${stake}。他不再只是現場路人，而成為願意承擔後果的證人。`,
      mode: "stay",
    },
    {
      label: ({ artifact, figure }) => `把唯一的${artifact}交給${figure}，換他救出另一批人`,
      result: ({ pressure, stake }) =>
        `你先把${artifact}交出去，等於放棄最安全的籌碼。${figure}照約定救出受困者，也指出「${pressure}」背後還有第二批人。${stake}，你們只能立刻轉移。`,
      mode: "escort",
    },
    {
      label: ({ pressure }) => `公開承擔「${pressure}」造成的責任，逼雙方停手`,
      result: ({ figure, revelation, sensory }) =>
        `你站到兩邊武器之間，先承認自己上一個決定造成的損失。${figure}因此放下武器，交出能證明「${revelation}」的線索。${sensory}，傷者需要被送往安全處。`,
      mode: "escort",
    },
    {
      label: ({ figure }) => `把隊伍拆成兩組，自己留下替${figure}斷後`,
      result: ({ pressure, stake }) =>
        `你讓傷者和證人先撤，自己守住最後一道門。追兵被你拖住後，${figure}從另一側打開退路。雖然「${pressure}」暫時被壓下，${stake}仍跟著隊伍進入下一處。`,
      mode: "forced",
    },
  ],
};

function hashInt(input) {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick(list, seed, offset = 0, fallback = "") {
  if (!Array.isArray(list) || list.length === 0) return fallback;
  return list[(seed + offset * 97) % list.length];
}

function rotateRoutes(route, seed) {
  const start = Math.max(0, ROUTES.indexOf(route));
  const rotated = ROUTES.map((_, index) => ROUTES[(start + index) % ROUTES.length]);
  if (seed % 2) [rotated[1], rotated[2]] = [rotated[2], rotated[1]];
  return rotated;
}

function compactFlag(epochId, path, route) {
  return `story_${hashInt(`${epochId}:${path}:${route}`).toString(36)}`;
}

function dynamicId(originId, entryRoute, path = "") {
  return `${DYNAMIC_PREFIX}${originId}|${entryRoute}|${path || "-"}`;
}

function endingId(originId, entryRoute, path) {
  return `${ENDING_PREFIX}${originId}|${entryRoute}|${path || "-"}`;
}

function parseId(nodeId, prefix) {
  const [originId, entryRoute, path = "-"] = nodeId.slice(prefix.length).split("|");
  return { originId, entryRoute, path: path === "-" ? "" : path };
}

export function normalizeWorldFeed(data) {
  if (!data || data.schema !== 4 || !Array.isArray(data.epochs)) {
    return {
      schema: 4,
      generatedAt: null,
      finalized: false,
      entryEpochId: null,
      epochs: [],
      worldState: null,
    };
  }
  return {
    schema: 4,
    generatedAt: data.generatedAt || null,
    finalized: Boolean(data.finalized),
    entryEpochId: data.entryEpochId || data.epochs[0]?.id || null,
    epochs: data.epochs,
    worldState: data.worldState || null,
  };
}

export function makeDynamicEntryId(route, feed) {
  const originId = feed.entryEpochId || feed.epochs[0]?.id;
  return originId ? dynamicId(originId, route, "") : `${LIVE_PREFIX}${route}`;
}

export function isDynamicNodeId(nodeId) {
  return Boolean(nodeId?.startsWith(DYNAMIC_PREFIX) || nodeId?.startsWith(ENDING_PREFIX));
}

function entryContext(route, epoch, state) {
  const start = {
    nerve: {
      locationKey: "ember_pass",
      arrival: "你離開東城軍營後，沿著黑龍軍留下的焦土行軍。半個時辰後，赤焰山口的守軍把你攔在翻覆軍車前。",
      objective: "查明北境軍旗為何能越過三座哨站",
    },
    insight: {
      locationKey: "star_archive",
      arrival: "你把群星鏡固定在星門上，鏡面裂出一條可供一人通過的銀色縫隙。穿過去後，你落在星典秘庫中央的星盤旁。",
      objective: "追查被人改寫的第一條黑色星軌",
    },
    empathy: {
      locationKey: "oath_ferry",
      arrival: "你帶著第一批無名者走出王都西門。隊伍在日落前抵達幽誓渡口，卻發現最後一艘渡船的白羽帆已被箭射穿。",
      objective: "替無名者找到不必再次放棄姓名的新家",
    },
  }[route];

  const companions = [];
  if (state?.flags?.includes("remember_mira") || state?.flags?.includes("named_mira_publicly")) companions.push("米菈");
  if (state?.flags?.includes("befriended_runebeast") || state?.items?.includes("符文獸誓印")) companions.push("符文獸烏魯");
  if (state?.items?.includes("赤金龍蛋")) companions.push("尚未孵化的赤金幼龍");

  return {
    ...start,
    route,
    companions,
    unresolved: epoch?.openingThread || "王都北方的烽火在同一刻全部熄滅",
    inheritedChoice: "你離開三座城門，選擇繼續追查尚未結束的危機",
    consequence: "你還不知道敵人是否已掌握你的路線",
    evidence: null,
  };
}

function branchContent(epoch, seed, offset = 0) {
  return {
    pressure: pick(epoch?.pressures, seed, offset, "追兵正在封鎖唯一出口"),
    figure: pick(epoch?.figures, seed, offset + 1, "一名滿身是血的王都信使"),
    revelation: pick(epoch?.revelations, seed, offset + 2, "敵人早已掌握隊伍上一段行程"),
    artifact: pick(epoch?.artifacts, seed, offset + 3, "刻著陌生家徽的銅牌"),
    sensory: pick(epoch?.sensory, seed, offset + 4, "空氣裡有雨水、鐵鏽與燒焦木頭的味道"),
    stake: pick(epoch?.stakes, seed, offset + 5, "唯一能撤離的道路會在天亮前被切斷"),
  };
}

function chooseExit(location, seed, index, context) {
  const exits = location.exits;
  const candidate = exits[(seed + index * 2) % exits.length];
  if (!context.previousLocationKey || candidate.destination !== context.previousLocationKey) return candidate;
  return exits.find((exit) => exit.destination !== context.previousLocationKey) || candidate;
}

function actionFor(route, seed, index) {
  const list = ACTIONS[route];
  return list[(seed + index * 3) % list.length];
}

function buildChoice({ originId, entryRoute, path, context, epoch, seed, targetRoute, index }) {
  const location = LOCATIONS[context.locationKey];
  const content = branchContent(epoch, seed, index * 13);
  const route = ROUTE_META[targetRoute];
  const action = actionFor(targetRoute, seed, index);
  const nextPath = `${path}${index}`;
  const isFinal = Boolean(epoch?.finale);
  const exit = action.mode === "stay" ? null : chooseExit(location, seed, index, context);
  const destination = exit ? LOCATIONS[exit.destination] : location;
  const parameters = { ...content, location, figure: content.figure, artifact: content.artifact };

  const label = action.label(parameters);
  const actionResult = action.result(parameters);

  let transition;
  let arrival;
  let nextLocationKey = context.locationKey;
  let companionList = context.companions;

  if (!exit) {
    transition = `你仍留在${location.name}。${actionResult}`;
    arrival = `${actionResult} 你沒有換場；下一章會從同一處的傷者、證物和未解危機繼續。`;
  } else {
    transition = `${actionResult} ${exit.trigger}。${exit.passage}。`;
    arrival = `${exit.trigger}。${exit.passage}。你現在位於${destination.name}，並帶著上一章取得的證物與後果。`;
    nextLocationKey = exit.destination;
    if (targetRoute === "empathy" || action.mode === "escort") {
      companionList = [...new Set([...context.companions, content.figure])].slice(-3);
    }
  }

  const consequence = targetRoute === "nerve"
    ? `你的強硬行動讓敵人改變部署；${content.stake}`
    : targetRoute === "insight"
      ? `你取得能驗證「${content.revelation}」的證據，但敵人也知道線索已暴露`
      : `${content.figure}和被救下的人願意作證，但隊伍因此更難隱藏行蹤`;

  return {
    label,
    icon: route.icon,
    result: transition,
    next: isFinal ? endingId(originId, entryRoute, nextPath) : dynamicId(originId, entryRoute, nextPath),
    effects: {
      nerve: targetRoute === "nerve" ? 2 : 0,
      insight: targetRoute === "insight" ? 2 : 0,
      empathy: targetRoute === "empathy" ? 2 : 0,
    },
    ...(targetRoute === "insight"
      ? { item: content.artifact }
      : { flag: compactFlag(epoch.id, nextPath, targetRoute) }),
    nextContext: {
      ...context,
      previousLocationKey: context.locationKey,
      locationKey: nextLocationKey,
      route: targetRoute,
      companions: companionList,
      arrival,
      unresolved: content.stake,
      inheritedChoice: label,
      consequence,
      evidence: targetRoute === "insight" ? content.artifact : context.evidence,
      objective: exit ? `查清${exit.trigger}背後的主使者` : context.objective,
    },
  };
}

function createChoices({ originId, entryRoute, path, context, epoch, seed }) {
  const routes = rotateRoutes(context.route, seed);
  return routes.map((targetRoute, index) =>
    buildChoice({ originId, entryRoute, path, context, epoch, seed, targetRoute, index })
  );
}

function createNode({ originId, entryRoute, path, context, epoch, depth, state }) {
  const location = LOCATIONS[context.locationKey];
  const seed = hashInt(`${originId}:${entryRoute}:${path}:${epoch.id}:${context.locationKey}`);
  const content = branchContent(epoch, seed);
  const route = ROUTE_META[context.route];
  const detail = location.details[(seed + depth) % location.details.length];
  const companionText = context.companions.length
    ? `${context.companions.join("、")}仍跟在你身邊，並記得上一章發生的事。`
    : "你目前沒有固定同行者，現場的人不會無條件相信你。";
  const evidenceText = context.evidence
    ? `你仍帶著${context.evidence}，它是上一章留下、尚未驗證完的證物。`
    : "";

  return {
    id: dynamicId(originId, entryRoute, path),
    dynamic: true,
    releaseAt: epoch.releaseAt,
    title: `邊境章節 ${String(depth + 1).padStart(3, "0")}：${location.name}`,
    subtitle: `上一個選擇已改變所在地、同行者與敵人的反應；本章直接承接該後果。`,
    scene: `${location.scene}-${hashInt(path || entryRoute).toString(36)}`,
    accent: location.accent || route.accent,
    location: location.name,
    intro: `${context.arrival} ${detail}。${content.sensory}。${content.figure}正在處理「${content.pressure}」，他看見你後立刻說：「${context.unresolved}還沒解決。再拖下去，${content.stake}。」${companionText}${evidenceText}`,
    routeText: {
      nerve: `可直接打擊「${content.pressure}」的源頭，但敵人會立刻改變部署。`,
      insight: `${content.artifact}與現場痕跡可能證明「${content.revelation}」，前提是你願意讓危機再暴露一次。`,
      empathy: `${content.figure}知道關鍵內情。先救人或交換籌碼，會增加同行者，也會拖慢撤離速度。`,
      balanced: `目前目標是${context.objective}。三個選項分別改變敵人部署、可用證據與同行隊伍，不是同一個移動指令的改寫。`,
    },
    continuityNote: `上一個行動：${context.inheritedChoice}。上一章後果：${context.consequence}。目前位置：${location.name}。仍未解決：${context.unresolved}。`,
    choices: createChoices({ originId, entryRoute, path, context, epoch, seed }),
    finale: Boolean(epoch.finale),
    stateEcho: state?.items?.includes("月蝕碎片")
      ? "月蝕碎片靠近現場魔力時發出銀紫色微光，證明這場異常與王都星蝕同源。"
      : null,
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
  const witnessText = context.companions.length
    ? `${context.companions.join("、")}都在場，能說出你每一次決定造成的代價。`
    : "沒有固定同行者替你作證，但現場留下的傷者、證物和敵軍部署記錄了整條路。";
  const endings = {
    nerve: ["守住最後一座城門", "拆掉王冠軍的指揮鏈", "把北境戰場交還守軍"],
    insight: ["公開黑色星軌", "建立可被質疑的祕法議會", "讓預言失去唯一作者"],
    empathy: ["替無名者取得新家", "讓敵我傷者共用第一座聖院", "把真名交還每一個家庭"],
  }[context.route];
  const code = endings[choiceIndex] || `${route.label}終章`;

  return {
    id: nodeId,
    ending: true,
    endingCode: code,
    title: `最終結局：${code}`,
    subtitle: `最後決定發生在${location.name}，並承接上一章的目標、證物與同行者。`,
    scene: `ending-${location.scene}-${choiceIndex}`,
    accent: location.accent || route.accent,
    intro: `${context.arrival} 你沒有突然出現在陌生地方。${selected.result} ${witnessText}天亮後，人們先處理傷者，再依照留下的證據決定誰該受審；這個結局由你一路做過的選擇構成。`,
  };
}

export function buildDynamicNode(nodeId, feed, state) {
  if (nodeId?.startsWith(DYNAMIC_PREFIX)) return buildStandardNode(nodeId, normalizeWorldFeed(feed), state);
  if (nodeId?.startsWith(ENDING_PREFIX)) return buildEndingNode(nodeId, normalizeWorldFeed(feed), state);
  return null;
}

export function migrateLiveNodeId(nodeId, feed) {
  if (!nodeId) return nodeId;
  if (nodeId.startsWith(LIVE_PREFIX)) return makeDynamicEntryId(nodeId.slice(LIVE_PREFIX.length), feed);
  const legacy = nodeId.match(/^live-\d{8}-\d{2}-(nerve|insight|empathy)$/);
  return legacy ? makeDynamicEntryId(legacy[1], feed) : nodeId;
}
