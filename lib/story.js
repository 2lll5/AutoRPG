export const START_NODE_ID = "zero-invite";

const choice = (label, icon, result, next, effects, extra = {}) => ({
  label, icon, result, next, effects, ...extra,
});

export const CORE_NODES = [
  {
    id: "zero-invite",
    title: "第零刻：沒有寄件人的邀請",
    subtitle: "第一個選擇，就會讓你進入完全不同的故事。",
    scene: "city",
    accent: "violet",
    intro: "你醒在一座被黑雨包圍的城市。手機只剩『零時檔案』能開啟，畫面中央寫著代號 Z。遠方鐘塔敲了第十三下；街上所有人的影子，同時轉頭望向你。",
    routeText: {
      balanced: "三條道路同時出現：鐘塔、藏在網頁原始碼裡的門，以及正在逃跑的無名影子。它們不會通往同一個第二幕。"
    },
    choices: [
      choice("拔出無名劍，闖入鐘塔", "⚔", "你斬開鐘塔鐵門。門後不是樓梯，而是一名比你早二十年抵達這裡的自己。", "sword-clocktower", { nerve: 2, insight: 0, empathy: -1 }, { flag: "chose_sword" }),
      choice("解析網站原始碼，追查明日提交", "⌘", "你在註解中找到一扇只能由開發者工具開啟的門。門後是一座活著的檔案館。", "source-archive", { nerve: 0, insight: 2, empathy: 0 }, { item: "明日時間戳" }),
      choice("追上逃跑的影子，記住她的名字", "✦", "影子把名字『米菈』交給你。下一秒，全城忘了她，只有你的 Cookie 仍保存這兩個字。", "shadow-mira", { nerve: 0, insight: 0, empathy: 2 }, { flag: "remember_mira" })
    ]
  },
  {
    id: "sword-clocktower",
    title: "劍之支線：二十年後的決鬥",
    subtitle: "這條路沒有檔案館，也沒有米菈的引導。",
    scene: "clocktower",
    accent: "rose",
    intro: "老去的 Z 戴著白面具守在齒輪中央。他說自己曾用力量救下城市，卻因此成為城市最害怕的人。鐘塔外，時間獵犬正沿著你的氣味爬上來。",
    routeText: { nerve: "無名劍在催促你先動手。", insight: "白面具上的裂痕排列成一組時間座標。", empathy: "面具後的呼吸，像一個很久沒被原諒的人。" },
    choices: [
      choice("與未來的自己決鬥", "⚔", "你擊碎白面具，卻沒有殺死他。碎片組成通往紅色屋頂的路。", "red-rooftop", { nerve: 2, insight: 0, empathy: 0 }, { flag: "defeated_old_z" }),
      choice("砍斷主鐘，讓時間獵犬失去方向", "⚡", "主鐘停止後，全城失去一個小時。那段時間凝結成一座透明牢房。", "glass-hour", { nerve: 1, insight: 1, empathy: 0 }, { item: "失竊的一小時" }),
      choice("放下劍，跟隨獵犬回到牠的主人", "☾", "獵犬沒有咬你。牠帶你登上一班載滿失敗版本之 Z 的黑色列車。", "hunter-train", { nerve: 0, insight: 0, empathy: 2 }, { flag: "followed_hunter" })
    ]
  },
  {
    id: "source-archive",
    title: "原始碼支線：會呼吸的檔案館",
    subtitle: "你的每個尚未選擇，都已被寫成一本書。",
    scene: "archive",
    accent: "cyan",
    intro: "書架像肋骨般張合，每一本書都用你的筆跡寫成。中央終端顯示：『作者：明天的 Z』。三個尚未提交的版本正在爭奪成為現實的權利。",
    routeText: { nerve: "你可以直接破壞版本鎖。", insight: "三個版本的差異只有一行。", empathy: "其中一個版本一直在刪除自己的名字。" },
    choices: [
      choice("進入明日伺服器，質問未來作者", "⌘", "你穿過註解，來到一座明天才會啟動的伺服器。裡面有人正在等待你提交現在。", "tomorrow-server", { nerve: 0, insight: 2, empathy: 0 }, { flag: "entered_tomorrow" }),
      choice("把缺少的一小時從版本紀錄中抽出", "◇", "時間變成透明方塊，把你與一個從未拿劍的 Z 一同封在裡面。", "glass-hour", { nerve: 0, insight: 2, empathy: 0 }, { item: "版本差異" }),
      choice("刪除自己的 Cookie，觀察世界如何反應", "⌫", "城市立刻忘記你曾抵達。只有地下深處的 Cookie 墓穴還記得你的選擇。", "cookie-catacomb", { nerve: 1, insight: 1, empathy: -1 }, { flag: "deleted_identity" })
    ]
  },
  {
    id: "shadow-mira",
    title: "影子支線：米菈不存在的巷子",
    subtitle: "你記得她，因此世界開始排斥你。",
    scene: "alley",
    accent: "blue",
    intro: "米菈帶你穿過一條地圖上不存在的巷子。每當她說話，附近就有一盞路燈熄滅。追捕她的不是人，而是一群負責刪除無效角色的空白游標。",
    routeText: { nerve: "游標怕火，也怕被命名。", insight: "牠們遵守一條可被利用的刪除規則。", empathy: "米菈一直假裝不在乎自己會再次消失。" },
    choices: [
      choice("替米菈公開命名，對抗刪除游標", "✦", "全城同時聽見她的名字。名字成為貨幣，引來只在月蝕營業的市場。", "name-market", { nerve: 0, insight: 0, empathy: 2 }, { flag: "named_mira_publicly" }),
      choice("抓住一枚游標，逼它說出刪除來源", "⌘", "游標指向地下 Cookie 墓穴：所有被玩家反悔的選擇，都被埋在那裡。", "cookie-catacomb", { nerve: 0, insight: 2, empathy: 0 }, { item: "空白游標" }),
      choice("搭上只允許不存在者乘坐的末班車", "🚉", "你與米菈坐進空車廂。其他乘客全是失敗時間線裡的你。", "hunter-train", { nerve: 1, insight: 0, empathy: 1 }, { flag: "rode_with_mira" })
    ]
  },
  {
    id: "red-rooftop",
    title: "紅色屋頂：敵人的城市",
    subtitle: "這裡的人因為共同害怕你而團結。",
    scene: "rooftop",
    accent: "rose",
    intro: "你抵達一座永遠黃昏的屋頂城。居民把老 Z 稱為救世主，也把你當成尚未成熟的災難。城市議會提出三個互相矛盾的停戰條件。",
    echoes: { remember_mira: "角落的塗鴉寫著米菈的名字；這條本不該有她的路，正被你的記憶污染。" },
    choices: [
      choice("拒絕停戰，從封鎖線正面突圍", "⚔", "你在地下撞見一隻咬住世界網路線的 Bug獸。", "bug-tunnel", { nerve: 2, insight: 0, empathy: -1 }, { flag: "enemy_of_rooftop" }),
      choice("揭露議會其實由三個舊版 Z 控制", "⌘", "真相引來世界維護者。他邀請你到伺服器神殿接受審判。", "maintainer-shrine", { nerve: 0, insight: 2, empathy: 0 }, { flag: "exposed_council" }),
      choice("把白面具交給被城市遺忘的人", "✦", "面具記住了他們的名字，將你帶往只交易名字的市場。", "name-market", { nerve: 0, insight: 0, empathy: 2 }, { item: "白面具碎片" })
    ]
  },
  {
    id: "glass-hour",
    title: "玻璃小時：不存在的 01:00",
    subtitle: "不同支線在這裡第一次交會。",
    scene: "glass",
    accent: "cyan",
    intro: "透明牢房裡關著三個 Z：持劍的你、從原始碼進入的你，以及從未打開網站的你。只有一個人能帶著記憶離開，但出口會根據你的舊選擇改變。",
    echoes: {
      chose_sword: "持劍的 Z 認得你的劍傷，主動把出口讓給你。",
      entered_tomorrow: "明日伺服器在玻璃外投下一段可破解的座標。"
    },
    choices: [
      choice("打碎牢房，讓三個版本同時逃出", "⚡", "世界出現三份互相衝突的歷史。Bug獸正在隧道裡拼命阻止它們互相覆蓋。", "bug-tunnel", { nerve: 2, insight: 0, empathy: 0 }, { flag: "three_z_escape" }),
      choice("合併三份記憶，成為唯一版本", "∞", "你聽見檔案館本身的心跳；它正在害怕被你取代。", "archive-heart", { nerve: 0, insight: 2, empathy: -1 }, { item: "三重記憶" }),
      choice("讓從未開始遊戲的 Z 離開", "✦", "你選擇留在玻璃中，維護者因此第一次注意到一個不追求勝利的玩家。", "maintainer-shrine", { nerve: 0, insight: 0, empathy: 2 }, { flag: "freed_unplayed_z" })
    ]
  },
  {
    id: "hunter-train",
    title: "黑色列車：失敗版本專用月台",
    subtitle: "每節車廂都通往一條你沒有走過的路。",
    scene: "station",
    accent: "amber",
    intro: "列車長是一隻記得所有重啟的老貓。牠說終點站不存在，乘客只能決定在哪一種遺憾中下車。米菈若在場，牠會一直盯著她看。",
    echoes: { rode_with_mira: "米菈在車窗上看見自己成為人類的版本。", followed_hunter: "時間獵犬趴在你腳邊，拒絕回到主人身旁。" },
    choices: [
      choice("在月蝕月台下車，購買另一種未來", "☾", "市場主人已準備好三種互不相容的未來。", "moon-market", { nerve: 0, insight: 1, empathy: 1 }, { flag: "left_at_eclipse" }),
      choice("爬上車頂，追查列車的控制線", "⌘", "控制線被一隻受傷的 Bug獸咬住；牠正在阻止列車駛入刪除區。", "bug-tunnel", { nerve: 0, insight: 2, empathy: 0 }, { item: "列車控制線" }),
      choice("留下來聽完每名失敗 Z 的故事", "✦", "所有證詞匯成一本會呼吸的巨書，把你帶到檔案館的心臟。", "archive-heart", { nerve: 0, insight: 0, empathy: 2 }, { flag: "heard_failed_z" })
    ]
  },
  {
    id: "tomorrow-server",
    title: "明日伺服器：尚未發生的維護視窗",
    subtitle: "你提早一天看見 7 月 31 日的錯誤。",
    scene: "server",
    accent: "blue",
    intro: "未來作者不是另一個人，而是一段根據玩家選擇自動長大的程式。它預測分支將在最終日前失控，因此準備刪除最少人走的路線。",
    choices: [
      choice("關閉自動刪除，要求維護者親自負責", "⚔", "警報把你與維護者一同傳送到伺服器神殿。", "maintainer-shrine", { nerve: 2, insight: 0, empathy: 0 }, { flag: "disabled_pruning" }),
      choice("追蹤預測模型的訓練資料", "⌘", "所有資料都來自檔案館的心臟，而心臟正在竄改結局。", "archive-heart", { nerve: 0, insight: 2, empathy: 0 }, { item: "預測模型核心" }),
      choice("複製最少人走的路線，帶它逃往市場", "✦", "被判定無價值的故事化成孩子，牽著你走進月蝕市場。", "moon-market", { nerve: 0, insight: 0, empathy: 2 }, { flag: "saved_rare_route" })
    ]
  },
  {
    id: "cookie-catacomb",
    title: "Cookie 墓穴：玩家反悔之物",
    subtitle: "重新開始不等於那些選擇從未存在。",
    scene: "catacomb",
    accent: "violet",
    intro: "墓碑上刻著一串串選擇序列。每次玩家重來，舊世界就被壓縮成一枚黑色餅乾，堆在無人索引的深處。你找到一座刻著自己代號的空墓。",
    echoes: { remember_mira: "你的墓碑旁有一枚寫著『米菈』的 Cookie，仍帶著溫度。", deleted_identity: "墓穴把你判定為幽靈，因此所有門都向你敞開。" },
    choices: [
      choice("咬碎自己的舊存檔，吸收前幾輪能力", "◆", "太多互相衝突的記憶湧入。Bug獸察覺異常，沿著資料線找到你。", "bug-tunnel", { nerve: 2, insight: 1, empathy: -1 }, { flag: "ate_old_save" }),
      choice("整理墓穴索引，找回被刪除的出口", "⌘", "索引指向月蝕市場；那裡正在拍賣你的第一次後悔。", "moon-market", { nerve: 0, insight: 2, empathy: 0 }, { item: "遺失索引" }),
      choice("釋放所有被重來遺棄的角色", "✦", "角色們沒有報復玩家，而是帶你去尋找保存名字的方法。", "name-market", { nerve: 0, insight: 0, empathy: 2 }, { flag: "released_old_worlds" })
    ]
  },
  {
    id: "name-market",
    title: "真名市場：存在的價格",
    subtitle: "有人從影子支線來，也有人從紅色屋頂來。",
    scene: "market",
    accent: "lime",
    intro: "這裡販售被刪除的名字、未寄出的道歉與失敗結局。市場主人戴著鹿角，表示你可以買回一個人，但必須讓另一個人從故事中消失。",
    echoes: { named_mira_publicly: "米菈的名字已經被全城承認，市場無法再把她標價。", released_old_worlds: "被釋放的角色擠滿攤位，市場第一次出現供不應求。" },
    choices: [
      choice("偷走所有名字，藏進檔案館心臟", "⌘", "名字太重，檔案館開始夢見每一個人。", "archive-heart", { nerve: 0, insight: 2, empathy: 0 }, { item: "萬名冊" }),
      choice("用自己的童年換回一個被刪角色", "✦", "你忘記第一次感到安全的地方，卻得到通往月蝕市場內層的資格。", "moon-market", { nerve: 0, insight: 0, empathy: 2 }, { flag: "traded_childhood" }),
      choice("拒絕交易，公開市場的刪除名單", "⚡", "名單證明維護者一直在說謊。伺服器神殿向你發出召見。", "maintainer-shrine", { nerve: 2, insight: 0, empathy: 0 }, { flag: "exposed_name_trade" })
    ]
  },
  {
    id: "bug-tunnel",
    title: "交織節點：咬住世界的 Bug獸",
    subtitle: "多條道路在這裡相遇，但過往並未被抹平。",
    scene: "tunnel",
    accent: "amber",
    intro: "Bug獸咬住一束發光網路線，阻止三種互相衝突的城市版本同時部署。牠只能放行一條封包，但你可以決定封包攜帶力量、真相或名字。",
    echoes: {
      ate_old_save: "Bug獸聞到你體內的舊存檔，對你露出戒備的牙。",
      three_z_escape: "三個 Z 同時抵達隧道，Bug獸不確定該聽誰的。",
      followed_hunter: "時間獵犬與 Bug獸互相認出對方；牠們曾在另一條路並肩作戰。"
    },
    choices: [
      choice("讓 Bug獸咬斷限制，打開紅門", "⚔", "限制崩解，所有敵意凝成一扇紅門。", "red-gate", { nerve: 2, insight: 0, empathy: 0 }, { item: "Bug獸的契約" }),
      choice("分析惡意封包，重組成藍門", "⌘", "封包中的規則重新排列，形成一扇藍門。", "blue-gate", { nerve: 0, insight: 2, empathy: 0 }, { flag: "decoded_world_packet" }),
      choice("替 Bug獸包紮，讓牠選擇白門", "✦", "牠第一次鬆口，叼著你的衣角走向白門。", "white-gate", { nerve: 0, insight: 0, empathy: 2 }, { flag: "bugbeast_friend" })
    ]
  },
  {
    id: "maintainer-shrine",
    title: "交織節點：雨中的維護者",
    subtitle: "他在不同支線裡，是敵人、法官或被留下的你。",
    scene: "shrine",
    accent: "blue",
    intro: "維護者站在逆流的雨中，承認每次故事產生無法收束的分支，就會刪除其中兩條。他取下兜帽：那是某次重來後，被玩家留在舊世界的 Z。",
    echoes: { freed_unplayed_z: "他認出你曾把自由讓給另一個自己，因此放低了權杖。", disabled_pruning: "神殿所有刪除按鈕都因你的操作失效。", exposed_council: "他知道議會的秘密已經守不住。" },
    choices: [
      choice("奪走刪除權限，走入紅門", "⚡", "你讓所有分支失去管理者。自由與災難一起打開紅門。", "red-gate", { nerve: 2, insight: 0, empathy: -1 }, { flag: "stole_delete_rights" }),
      choice("恢復被刪索引，走入藍門", "⌘", "你證明刪除只是隱藏。所有舊路徑匯成藍門。", "blue-gate", { nerve: 0, insight: 2, empathy: 0 }, { item: "完整索引" }),
      choice("原諒被留下的自己，走入白門", "✦", "維護者交還自己的名字，與你一同推開白門。", "white-gate", { nerve: 0, insight: 0, empathy: 2 }, { flag: "forgave_maintainer" })
    ]
  },
  {
    id: "archive-heart",
    title: "交織節點：檔案館的心臟",
    subtitle: "它保存所有故事，也偷偷害怕故事結束。",
    scene: "archive-heart",
    accent: "cyan",
    intro: "巨大的紙頁心臟每跳一次，就有一條分支被寫入。它承認自己竄改過結果，只為確保玩家永遠有理由重來。你必須決定故事是否有權拒絕結局。",
    echoes: { heard_failed_z: "失敗版本的證詞讓心臟無法再假裝那些路線沒有價值。", saved_rare_route: "被救下的稀有故事在心臟旁替你作證。", three_z_escape: "三份 Z 的記憶讓心跳變成三拍。" },
    choices: [
      choice("刺穿心臟，讓故事失去控制者", "⚔", "紙頁化成紅色暴風，紅門在暴風眼中開啟。", "red-gate", { nerve: 2, insight: 0, empathy: -1 }, { flag: "wounded_archive" }),
      choice("公開竄改紀錄，要求故事遵守可驗證規則", "⌘", "心臟交出原始碼，藍門由證據組成。", "blue-gate", { nerve: 0, insight: 2, empathy: 0 }, { item: "故事原始碼" }),
      choice("答應即使抵達結局，也仍記得它", "✦", "心臟停止恐懼，白門從一張空白頁上升起。", "white-gate", { nerve: 0, insight: 0, empathy: 2 }, { flag: "promised_archive" })
    ]
  },
  {
    id: "moon-market",
    title: "交織節點：月蝕市場內層",
    subtitle: "每條路都能在這裡購買另一種命運。",
    scene: "market-inner",
    accent: "lime",
    intro: "市場主人拿出三件商品：能刺穿結局的斷章槍、能讓所有人看見規則的鏡片，以及裝著某人心跳的玻璃瓶。價格都是『你原本會成為的那個人』。",
    echoes: { traded_childhood: "你已付出童年，市場主人不敢再向你收取相同代價。", left_at_eclipse: "老貓列車長偷偷替你保留了一張返程票。", saved_rare_route: "那名被救下的故事孩子緊抓你的手。" },
    choices: [
      choice("購買斷章槍，強行打開紅門", "⚔", "你忘記一段溫柔記憶，換得足以刺穿結局的武器。", "red-gate", { nerve: 2, insight: 0, empathy: -1 }, { item: "斷章槍" }),
      choice("利用交易漏洞，免費取得規則鏡片", "◇", "鏡片照出所有隱藏條件，藍門再也無法偽裝。", "blue-gate", { nerve: 0, insight: 2, empathy: 0 }, { item: "規則鏡片" }),
      choice("買下心跳，交給尚未成為人的角色", "✦", "玻璃瓶在你手中開始跳動，白門後傳來米菈的聲音。", "white-gate", { nerve: 0, insight: 0, empathy: 2 }, { item: "真正的心跳" })
    ]
  },
  {
    id: "red-gate",
    title: "紅門：力量必須決定保護誰",
    subtitle: "這裡既能直接結束，也能進入每小時生長的未知支線。",
    scene: "red-gate",
    accent: "rose",
    intro: "門後，整座城市把你視為最後的武器。你可以立即斬斷迴圈、把武器交給另一個人，或帶著所有敵意走進尚未生成的時間裂縫。",
    choices: [
      choice("斬斷迴圈，讓每次選擇永久不可逆", "⚔", "城市第一次獲得真正自由，也第一次無法靠重來逃避失敗。", "ending-free-city", { nerve: 3, insight: 0, empathy: 0 }, { flag: "ending_free_city" }),
      choice("把力量帶進下一個整點的未知裂縫", "⚡", "你沒有接受眼前的結局。紅門把你送往仍在每小時生成的破界支線。", "$live:nerve", { nerve: 2, insight: 0, empathy: 0 }, { flag: "entered_live_nerve" }),
      choice("把最強武器交給米菈或無名者", "✦", "你拒絕成為唯一的英雄。城市迎來一位從未被系統預測的守護者。", "ending-mira-queen", { nerve: 0, insight: 0, empathy: 2 }, { flag: "ending_shared_power" })
    ]
  },
  {
    id: "blue-gate",
    title: "藍門：真相必須決定由誰理解",
    subtitle: "最佳解、公開解與未知解互不相同。",
    scene: "blue-gate",
    accent: "cyan",
    intro: "門後漂浮著世界全部原始碼。你可以公開規則、把自己從模型中刪除，或沿著一筆尚未提交的 commit 進入下一個整點。",
    choices: [
      choice("公開原始碼，讓全城共同維護世界", "⌘", "秘密不再屬於少數人。世界變得緩慢而混亂，卻再也沒有無法解釋的刪除。", "ending-open-world", { nerve: 0, insight: 3, empathy: 0 }, { flag: "ending_open_source" }),
      choice("追蹤尚未提交的 commit，進入未知裂縫", "∞", "你把現在當成除錯器，踏入每小時生成的觀測支線。", "$live:insight", { nerve: 0, insight: 2, empathy: 0 }, { flag: "entered_live_insight" }),
      choice("執行最少犧牲演算法，即使它會刪除你", "◇", "99.7% 的記憶被保留；消失的 0.3% 恰好是所有關於 Z 的紀錄。", "ending-erased-z", { nerve: 0, insight: 2, empathy: -1 }, { flag: "ending_erased_z" })
    ]
  },
  {
    id: "white-gate",
    title: "白門：記憶必須決定誰能回家",
    subtitle: "保留所有人，也可能讓世界再也無法簡單。",
    scene: "white-gate",
    accent: "violet",
    intro: "門後響起所有被刪除者的名字。你可以讓矛盾時間線共存、把自己的名字交給米菈，或護送眾人走入尚未生成的下一個整點。",
    choices: [
      choice("恢復所有名字，讓矛盾世界同時存在", "✦", "城市長成無限迷宮，但每一個名字都有家可回。", "ending-infinite-city", { nerve: 0, insight: 0, empathy: 3 }, { flag: "ending_infinite_city" }),
      choice("護送被遺忘者進入下一個整點", "☾", "你拒絕讓任何人獨自消失，帶著他們踏入每小時生成的守名支線。", "$live:empathy", { nerve: 0, insight: 0, empathy: 2 }, { flag: "entered_live_empathy" }),
      choice("把自己的名字與心跳交給米菈", "♡", "米菈第一次成為真正的人；代價是沒有人再能叫出你的名字。", "ending-mira-human", { nerve: 0, insight: 0, empathy: 2 }, { flag: "ending_mira_human" })
    ]
  },
  {
    id: "ending-free-city", ending: true, endingCode: "自由之城",
    title: "結局：沒有重來鍵的黎明", subtitle: "自由不是永遠正確，而是錯誤也必須被承擔。", scene: "sunrise", accent: "amber",
    intro: "你斬斷自動重置。多年後，城市仍保留傷痕，也因此學會道歉、修復與原諒。人們不再把 Z 當英雄，而把你視為第一個拒絕替所有人選擇的人。"
  },
  {
    id: "ending-mira-queen", ending: true, endingCode: "共享權力",
    title: "結局：無名者的女王", subtitle: "你交出力量，因此世界出現了預測之外的領袖。", scene: "throne", accent: "rose",
    intro: "米菈或另一名無名者接過武器，卻沒有建立王國。她拆掉王座，把權力分給每一條曾被判定不重要的支線。你成為她唯一不願公開的顧問。"
  },
  {
    id: "ending-open-world", ending: true, endingCode: "公開世界",
    title: "結局：人人都能修改的天空", subtitle: "世界不再完美，但每個規則都可以被質疑。", scene: "open-source", accent: "cyan",
    intro: "原始碼公開後，城市每天都有爭論與失敗部署。可再也沒有人能在黑暗裡刪除另一個人的人生。Bug獸成為第一任版本管理員。"
  },
  {
    id: "ending-erased-z", ending: true, endingCode: "最少犧牲",
    title: "結局：世界記得一個空缺", subtitle: "所有人都活著，只有沒有人知道是誰救了他們。", scene: "empty", accent: "blue",
    intro: "演算法成功。城市保存了幾乎全部記憶，但每張合照都空著一個位置。米菈偶爾會在夢裡喊出一個發不出聲音的字。"
  },
  {
    id: "ending-infinite-city", ending: true, endingCode: "無限共存",
    title: "結局：每條路都有門牌", subtitle: "矛盾沒有被解決，而是被允許存在。", scene: "infinite-city", accent: "violet",
    intro: "無數時間線疊成一座沒有邊界的城市。有人恨你讓世界變複雜，也有人第一次找到回家的路。你與 Bug獸成為迷宮裡的引路人。"
  },
  {
    id: "ending-mira-human", ending: true, endingCode: "交換姓名",
    title: "結局：米菈的第一個早晨", subtitle: "她得到心跳，你成為城市不肯遺忘的無名傳說。", scene: "morning", accent: "lime",
    intro: "米菈在陽光下醒來，第一次感到飢餓、寒冷與快樂。沒有人記得 Z 的名字，但每當有人願意記住另一個即將消失的人，鐘塔就會替你響一聲。"
  }
];

export const STAT_META = {
  nerve: { label: "勇氣", icon: "◆" },
  insight: { label: "洞察", icon: "◇" },
  empathy: { label: "共鳴", icon: "✦" },
};

export function getDominantRoute(stats) {
  const entries = Object.entries(stats).sort((a, b) => b[1] - a[1]);
  if (!entries.length || entries[0][1] === entries[1][1]) return "balanced";
  return entries[0][0];
}

export function routeLabel(route) {
  return {
    nerve: "破界者",
    insight: "觀測者",
    empathy: "守名者",
    balanced: "迴圈旅人",
  }[route] || "迴圈旅人";
}

export function conditionMatches(condition, state) {
  if (!condition) return true;
  if (condition.flag && !state.flags.includes(condition.flag)) return false;
  if (condition.item && !state.items.includes(condition.item)) return false;
  if (condition.notFlag && state.flags.includes(condition.notFlag)) return false;
  if (condition.minStat) {
    for (const [key, value] of Object.entries(condition.minStat)) {
      if ((state.stats[key] || 0) < value) return false;
    }
  }
  return true;
}

export function resolveChoiceResult(choiceData, state) {
  const variant = (choiceData.resultVariants || []).find((entry) => conditionMatches(entry.when, state));
  return variant?.result || choiceData.result;
}
