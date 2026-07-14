# 零時迴圈 AutoRPG

一款會隨時間持續生長的繁體中文網頁 RPG。每段劇情固定提供 3 個選擇；選擇會改變勇氣、洞察、共鳴、物品與隱藏旗標，並影響後續敘事與 7 月 31 日的結局。

## 功能

- 每幕固定 3 個選擇，結果與能力變化各不相同
- 使用 Browser Cookie 保存章節、選擇序列、能力、物品與旗標
- 隨時重新開始；重啟次數會觸發額外彩蛋
- 內建動態 SVG 場景插畫，不依賴外部圖片服務
- GitHub Actions 每小時執行 `scripts/generate-story.mjs`
- 網站直接讀取 GitHub 最新的 `public/story.generated.json`，不需等待重新部署
- 2026-07-31 晚間生成最終章，之後停止新增

## 本機執行

```bash
npm install
npm run dev
```

## 測試故事生成器

```bash
STORY_NOW=2026-07-15T09:00:00+08:00 npm run story:generate
```

同一小時重複執行不會產生重複章節。

## 部署

專案使用 Next.js，可直接部署至 Vercel。正式網站部署後，後續每小時章節由 GitHub Actions 更新，玩家重新整理頁面即可取得最新內容。
