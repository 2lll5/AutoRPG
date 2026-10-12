# Repository agent guidelines

## Google Drive Build 交付規範（所有 Agent 必須遵守）
- Google Drive 唯一目的地：`AI Project/AutoRPG/`（專案資料夾名稱必須與 GitHub Repository 完全相同；AI Project folder ID `1Yhfro6Ss5TSCXCVIZIHEu5h7V1gL8b27`）。不在 `AI Project/` 頂層堆放 ZIP 或每次 Build 新建版本目錄。
- **最新版直接放在專案根目錄**：只上傳已成功 Build、通過必要測試且有完整 ZIP／分卷、SHA-256、必要還原腳本的版本；不同平台可各有最新檔。上傳後核對 Drive 名稱、大小、父目錄及 checksum。
- **只有重要差異才建立 `vX.Y.Z-說明/` 版本子資料夾**（功能、架構、重大美術、平台相容性）；其餘舊版移到專案內 `歷史封存/`，不可逕自刪除舊檔。
- ZIP 遺漏、只有 checksum 或分卷不全時不得將新版標記為最新，也不能移走上一個完整版本。未實測不得宣稱 Build 成功或已完成上傳。
- 所有新開發提交／推送 GitHub；昂貴 Build／發行 Actions 優先 `workflow_dispatch` 或 `release: published`，避免每次 push main 都觸發。回報 Drive 專案資料夾、版本、檔案、校驗與驗證狀態。

**English for Codex:** Keep only the newest complete verified build(s) at `AI Project/AutoRPG/`. Preserve major milestone versions in `vX.Y.Z-description/`; move routine older versions to `歷史封存/` without deletion. Never promote incomplete builds.
