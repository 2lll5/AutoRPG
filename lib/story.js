export const CORE_STORY = [
  {
    id: "core-001",
    title: "第零刻：沒有寄件人的邀請",
    subtitle: "世界在 00:00 後，多了一個不該存在的網站。",
    scene: "city",
    accent: "violet",
    intro: "你醒在一座被黑雨包圍的城市。手機只剩一個頁面能開啟：『零時檔案』。畫面中央寫著你的代號——Z。遠方鐘塔敲了第十三下，而街上所有人的影子，同時轉頭望向你。",
    routeText: {
      nerve: "你先注意到影子們的站姿：那不是恐懼，而是在等候命令。",
      insight: "你發現鐘聲與螢幕刷新率完全同步，像有人正在遠端部署這個世界。",
      empathy: "你聽見每一道影子都在重複同一句求救，只是聲音被雨切碎了。"
    },
    choices: [
      { label: "拔出路旁的無名劍，走向鐘塔", icon: "⚔", result: "劍身映出一個比你早一步抵達鐘塔的自己。它沒有攻擊你，只留下第一句警告：『別相信整點出現的人。』", effects: { nerve: 2, insight: 0, empathy: -1 }, flag: "saw_future_self" },
      { label: "分析網站原始碼與城市異常", icon: "⌘", result: "你在頁面註解裡找到一段每小時執行的指令。作者欄不是人名，而是明天的日期。", effects: { nerve: 0, insight: 2, empathy: 0 }, item: "明日時間戳" },
      { label: "追上最近的一道影子詢問真相", icon: "✦", result: "影子停下來，將自己的名字交給你。下一秒，它從所有人的記憶中消失；只有你仍記得『米菈』。", effects: { nerve: 0, insight: 0, empathy: 2 }, flag: "remember_mira" }
    ]
  },
  {
    id: "core-002",
    title: "第一刻：會呼吸的檔案館",
    subtitle: "記錄不是歷史，而是尚未發生的選擇。",
    scene: "archive",
    accent: "cyan",
    intro: "鐘塔底下沒有樓梯，只有一座向下生長的檔案館。書架像肋骨般張合，每一本書都用你的筆跡寫成。最深處傳來翻頁聲，卻看不見讀者。",
    routeText: {
      nerve: "你的腳步越重，書架退得越遠，像在測量你是否真的敢追。",
      insight: "書脊上的編號不是分類，而是你尚未做出的選擇序列。",
      empathy: "有一本書在發抖。封面寫著：『米菈最後一次被記得。』"
    },
    choices: [
      { label: "燒掉寫著自己死亡方式的書", icon: "🔥", result: "火焰沒有燒毀書頁，反而燒掉了死亡發生的那條走廊。你改寫了一次命運，也讓某個未知出口永遠消失。", effects: { nerve: 2, insight: -1, empathy: 0 }, flag: "burned_death" },
      { label: "閱讀最後一頁，再倒著讀回開頭", icon: "◈", result: "倒讀後，故事主角從你變成檔案館本身。它承認自己害怕 7 月 31 日，因為那天之後，再也沒有人替它增加新記憶。", effects: { nerve: 0, insight: 2, empathy: 0 }, flag: "archive_confession" },
      { label: "把顫抖的書抱離書架", icon: "☾", result: "書在你懷中化成一隻紙鳥。它記得所有被世界刪除的人，並願意為你尋路。", effects: { nerve: 0, insight: 0, empathy: 2 }, item: "失名紙鳥" }
    ]
  },
  {
    id: "core-003",
    title: "第二刻：屋頂上的三個叛徒",
    subtitle: "每個人都說自己來自真正的時間線。",
    scene: "rooftop",
    accent: "rose",
    intro: "你從檔案館的天窗爬出，來到城市最高的屋頂。三名陌生人早已等候：戴白面具的劍士、沒有倒影的工程師，以及自稱米菈的女孩。他們同時要求你交出零時檔案。",
    routeText: {
      nerve: "白面劍士微微退了半步。他認得你手中那把無名劍。",
      insight: "工程師胸前的識別證每秒改變一次姓名，卻固定使用同一組提交雜湊。",
      empathy: "女孩叫出只有那道影子曾告訴你的暱稱，但她的心跳聲是鐘擺。"
    },
    choices: [
      { label: "與白面劍士決鬥，以勝負換情報", icon: "⚔", result: "你的劍在交鋒時碎裂，碎片卻組成一張地下路線圖。劍士摘下面具——那是老去二十年的你。", effects: { nerve: 2, insight: 0, empathy: -1 }, flag: "met_old_z" },
      { label: "要求工程師現場證明他的時間線", icon: "⌁", result: "他讓天空短暫顯示系統日誌。你看見城市已重啟 418 次，而每次重啟都由『玩家主動重新開始』觸發。", effects: { nerve: 0, insight: 2, empathy: 0 }, flag: "knows_loop_count" },
      { label: "相信米菈，但不交出檔案", icon: "✦", result: "米菈笑了。她說真正的信任不是服從，並把一枚只在謊言附近發熱的玻璃心交給你。", effects: { nerve: 0, insight: 0, empathy: 2 }, item: "測謊玻璃心" }
    ]
  },
  {
    id: "core-004",
    title: "第三刻：斷線隧道",
    subtitle: "地下深處，有東西正在咬住世界的網路線。",
    scene: "tunnel",
    accent: "amber",
    intro: "路線圖指向封鎖多年的地鐵隧道。沿途的燈一盞盞熄滅，最後只剩一雙藍色眼睛。那是一隻披著故障碼鱗片的小獸，嘴裡正咬著發光的網路線，尾巴像游標般閃爍。",
    routeText: {
      nerve: "牠壓低身體，發出像硬碟讀取失敗的低吼。",
      insight: "你看出牠不是在破壞線路，而是在阻止某段惡意指令通過。",
      empathy: "牠嘴角已被高溫燙傷，卻仍不肯鬆口。"
    },
    choices: [
      { label: "徒手拔除線路上的黑色寄生碼", icon: "⚡", result: "寄生碼鑽進你的手臂，留下會在危險前發亮的紋路。小獸承認你的膽量，成為暫時同伴。", effects: { nerve: 2, insight: 0, empathy: 0 }, item: "Bug獸的契約" },
      { label: "追蹤封包，找出指令的發送端", icon: "⌘", result: "封包繞過整座城市，最後回到你的瀏覽器。發送端名稱是『COOKIE』，內容則是你一路做過的所有選擇。", effects: { nerve: 0, insight: 2, empathy: 0 }, flag: "found_cookie_truth" },
      { label: "先替小獸包紮，再問牠為何守在這裡", icon: "✚", result: "牠把網路線輕放到你手中。原來只要線路接回，世界就會更新；但更新也會讓一名舊角色永久消失。", effects: { nerve: 0, insight: 0, empathy: 2 }, flag: "bugbeast_friend" }
    ]
  },
  {
    id: "core-005",
    title: "第四色：月蝕市場",
    subtitle: "你可以購買任何遺失之物，代價是另一段記憶。",
    scene: "market",
    accent: "lime",
    intro: "隧道盡頭是只在月蝕時營業的市場。攤販販售被刪除的名字、未寄出的道歉、以及從失敗時間線回收的武器。市場主人戴著鹿角，宣稱能賣給你『最適合目前路線的未來』。",
    routeText: {
      nerve: "一柄紅色長槍不斷呼喚你，承諾能刺穿任何結局。",
      insight: "價目表的文字會隨你眨眼改變，只有小數點的位置從未移動。",
      empathy: "角落有一瓶標示『某人忘記你的那一天』，瓶中傳來壓抑的哭聲。"
    },
    choices: [
      { label: "用一段童年記憶換取破局武器", icon: "⚔", result: "你得到『斷章槍』，卻再也想不起第一次感到安全的地方。武器很強，空缺也很真實。", effects: { nerve: 2, insight: 0, empathy: -1 }, item: "斷章槍" },
      { label: "找出市場交易規則中的邏輯漏洞", icon: "◇", result: "你用『尚未遺失的遺失物』完成零成本交易。市場主人哈哈大笑，送你一枚能讓一次選擇不被記錄的空白硬幣。", effects: { nerve: 0, insight: 2, empathy: 0 }, item: "空白硬幣" },
      { label: "買下那瓶哭泣的記憶並歸還原主", icon: "✦", result: "瓶子回到米菈手中。她想起自己其實不是人，而是所有玩家曾經反悔之選擇的集合。", effects: { nerve: 0, insight: 0, empathy: 2 }, flag: "mira_awakened" }
    ]
  },
  {
    id: "core-006",
    title: "第五刻：雨中的維護者",
    subtitle: "有人負責修復世界，也有人負責讓錯誤留下。",
    scene: "shrine",
    accent: "blue",
    intro: "城市中央的伺服器神殿開始降下逆流的雨。維護者站在雨中，身後懸浮著無數刪除按鈕。他坦承每次世界產生無法收束的分支，就會手動刪去其中兩條。你正站在下一個待刪除節點上。",
    routeText: {
      nerve: "維護者把刪除權杖指向你，但他的手正在顫抖。",
      insight: "你發現所謂刪除只是把資料移到一個沒有索引的角落。",
      empathy: "他身後每一顆雨滴，都映著被迫消失角色的最後表情。"
    },
    choices: [
      { label: "奪走刪除權杖，逼他解除限制", icon: "⚡", result: "你成功解除分支上限，城市瞬間長出數百條道路。自由降臨了，方向也消失了。", effects: { nerve: 2, insight: 0, empathy: -1 }, flag: "branch_overflow" },
      { label: "證明被刪除的分支仍可恢復", icon: "⌘", result: "你從沒有索引的角落找回第一個被刪除的選擇。它竟是：『什麼都不選，關閉網頁。』", effects: { nerve: 0, insight: 2, empathy: 0 }, item: "遺失索引" },
      { label: "問維護者是否也曾是玩家", icon: "☂", result: "他沉默良久，取下兜帽。你認出他是某一次重來後，被留在舊世界的自己。", effects: { nerve: 0, insight: 0, empathy: 2 }, flag: "forgave_maintainer" }
    ]
  },
  {
    id: "core-007",
    title: "第六刻：三扇只開一次的門",
    subtitle: "門後不是地點，而是你願意成為的人。",
    scene: "doors",
    accent: "violet",
    intro: "神殿核心升起三扇門。紅門後傳來戰鼓，藍門後是無限延伸的公式，白門後則有人輕聲念出所有被遺忘者的名字。Bug獸咬住你的衣角，提醒你門會記住猶豫。",
    routeText: {
      nerve: "紅門上的裂縫與你手臂的寄生碼紋路同時發光。",
      insight: "藍門邊框浮現一行小字：『最佳解不等於唯一解。』",
      empathy: "白門後的聲音裡，有一個名字屬於你。"
    },
    choices: [
      { label: "走進紅門，承擔所有敵意", icon: "⚔", result: "你成為城市的『敵人』，讓原本互相爭鬥的人第一次站到同一邊。世界因此團結，代價是沒有人再相信你。", effects: { nerve: 3, insight: 0, empathy: -1 }, flag: "red_door" },
      { label: "走進藍門，尋找最少犧牲的演算法", icon: "∞", result: "你找到一條能保留 99.7% 記憶的路徑。剩下的 0.3% 恰好包含你自己。", effects: { nerve: 0, insight: 3, empathy: 0 }, flag: "blue_door" },
      { label: "走進白門，替被刪除者逐一作證", icon: "✦", result: "每念回一個名字，城市就多亮一扇窗。到最後，整座城都醒了，而你開始忘記自己原本的聲音。", effects: { nerve: 0, insight: 0, empathy: 3 }, flag: "white_door" }
    ]
  },
  {
    id: "core-008",
    title: "第七刻：整點之前",
    subtitle: "下一次更新即將抵達，而你已經能聽見它。",
    scene: "clock",
    accent: "rose",
    intro: "你回到鐘塔頂端。指針距離下一個整點只差一格，天空外側傳來巨大齒輪轉動聲。螢幕顯示：『後續故事將由選擇與時間共同生成。』你必須決定如何迎接第一個真正未知的章節。",
    routeText: {
      nerve: "你感到每一次心跳都能推動指針，世界正在等你先出手。",
      insight: "你看見更新並非覆蓋，而是在既有世界上疊加新的可能。",
      empathy: "城裡所有曾與你相遇的人，都把一小段聲音交給了鐘。"
    },
    choices: [
      { label: "主動敲響鐘，挑戰尚未生成的敵人", icon: "⚡", result: "鐘聲提早一秒響起。未知世界措手不及，你獲得先行者的優勢，也驚醒了時間之外的獵人。", effects: { nerve: 2, insight: 0, empathy: 0 }, flag: "rang_early" },
      { label: "記錄更新前後的差異，尋找生成規律", icon: "⌘", result: "你捕捉到新章節出現前的短暫空白。空白中藏著一句話：『結局不是最後一章，而是玩家停止重來的那次。』", effects: { nerve: 0, insight: 2, empathy: 0 }, flag: "saw_generation_gap" },
      { label: "讓全城一起倒數，不讓任何人獨自消失", icon: "✦", result: "倒數聲穿過每條分支。更新完成後，所有人都還在——只是每個人都記得一個略有不同的你。", effects: { nerve: 0, insight: 0, empathy: 2 }, flag: "shared_countdown" }
    ]
  }
];

export const STAT_META = {
  nerve: { label: "勇氣", icon: "◆" },
  insight: { label: "洞察", icon: "◇" },
  empathy: { label: "共鳴", icon: "✦" },
};

export function getDominantRoute(stats) {
  const entries = Object.entries(stats);
  entries.sort((a, b) => b[1] - a[1]);
  if (entries[0][1] === entries[1][1]) return "balanced";
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
