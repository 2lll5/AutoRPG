# Repository agent guidelines

## Google Drive — Repository-specific Build Delivery (Required)

所有 Codex／Agent／人工開發者均必須遵守。Google Drive 正式交付位置：`AI Project/AutoRPG/`（AI Project 根資料夾 ID：`1Yhfro6Ss5TSCXCVIZIHEu5h7V1gL8b27`），資料夾名稱必須**完全等於 GitHub Repository 名稱**。

1. **最新完整版放專案資料夾根目錄**：只有 Build 已成功、經可執行／必要測試、檔案完整（ZIP、SHA-256、分割檔所有片段、必要安裝／還原腳本）且 Drive 讀回確認後，才作為最新版；不要為每次 Build 建立新的版本資料夾，更不能散放於 `AI Project/` 根目錄。
2. **重大差異才建立版本子資料夾**：例如重要功能、架構、平台相容性或美術里程碑，用 `vX.Y.Z-功能名稱/` 封存重要版本；一般舊 Build 移到 `歷史封存/`，不刪除、不遺失必要還原檔。已存在的其它檔案與 Git 專案不可動。
3. **新版上傳必須先驗證再換版**：核對 ZIP、checksum、大小、版本、所有分片，並讀回 Drive parent／名稱。缺少 ZIP 或只有 checksum 的版本是**不完整**，不可取代上一個完整最新版；失敗時保留舊版並清楚回報。
4. **各平台最新版可並存**：Windows／Linux／Google TV 等各保留其完整最新交付；同一版本的 checksum 和啟動說明要放一起。沒產出實際 Build 就不假稱上傳成功，也不必建立空資料夾。
5. **每次開發均推送 GitHub**。昂貴 Build／發布 GitHub Actions 只在有必要的手動 `workflow_dispatch` 或正式 `release: published` 觸發，不要每次 push `main` 都重建／重傳。最終回報專案資料夾連結、Build 版本、檔案、SHA 與驗證狀態。

**For all coding agents:** The current verified build belongs directly in `AI Project/AutoRPG/`; create `vX.Y.Z-description/` only for material historical milestones; place routine older builds in `歷史封存/`; never publish an incomplete upload as latest. This policy applies to every future build.

## Google Drive Build 交付規範（所有 Agent 必須遵守）
- Google Drive 唯一目的地：`AI Project/AutoRPG/`（專案資料夾名稱必須與 GitHub Repository 完全相同；AI Project folder ID `1Yhfro6Ss5TSCXCVIZIHEu5h7V1gL8b27`）。不在 `AI Project/` 頂層堆放 ZIP 或每次 Build 新建版本目錄。
- **最新版直接放在專案根目錄**：只上傳已成功 Build、通過必要測試且有完整 ZIP／分卷、SHA-256、必要還原腳本的版本；不同平台可各有最新檔。上傳後核對 Drive 名稱、大小、父目錄及 checksum。
- **只有重要差異才建立 `vX.Y.Z-說明/` 版本子資料夾**（功能、架構、重大美術、平台相容性）；其餘舊版移到專案內 `歷史封存/`，不可逕自刪除舊檔。
- ZIP 遺漏、只有 checksum 或分卷不全時不得將新版標記為最新，也不能移走上一個完整版本。未實測不得宣稱 Build 成功或已完成上傳。
- 所有新開發提交／推送 GitHub；昂貴 Build／發行 Actions 優先 `workflow_dispatch` 或 `release: published`，避免每次 push main 都觸發。回報 Drive 專案資料夾、版本、檔案、校驗與驗證狀態。

**English for Codex:** Keep only the newest complete verified build(s) at `AI Project/AutoRPG/`. Preserve major milestone versions in `vX.Y.Z-description/`; move routine older versions to `歷史封存/` without deletion. Never promote incomplete builds.
