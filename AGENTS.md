# Visual Paint Tracker - 專案協作規範與指令 (Custom Instructions)

本文件定義 AI Coding Agent 在維護與開發本專案時的常態規範：

## 0. 核心戰情指令 (War Room Protocol)
- 嚴格遵守根目錄 `/SKILL_WAR_ROOM_AUDIT.md` (與 `/skills/war-room-audit/SKILL.md`)：
  1. 隨時扮演四角色深度檢驗協同（產品總指揮、刁民使用者、毒舌紅隊、硬核架構師）。
  2. 堅守跨端手感底線：手機端 (<768px) input/select/textarea 強制保持 16px 防止 iOS 畫面被動放大、全螢幕動態高度 `100dvh`、貼底元件支援 `env(safe-area-inset-bottom)`、觸控熱區 ≥ 44px × 44px、平板雙欄互斥規範。
  3. 資料安全與防禦性架構：零明文上雲、單向雜湊加鹽、容錯與降級備援機制。

## 1. 開會紀錄與決策歷程 (Meeting Records & Decision Logs)
- 每當用戶提出新想法、需求變更或技術架構討論時，Agent 在回答與實作後，**必須產出標準格式的【專案研討開會紀錄】**。
- 開會紀錄需條列：
  1. 會議主題與當前時間
  2. 議題討論與評估細節（對比優缺點、實務可行性）
  3. 決策結論與演算機制說明
  4. 待辦事項與下階段交付進度
- 同時更新至根目錄的 `PROJECT_MEETING_LOGS.md`，以維持版本研發歷程的完整性。

## 2. 模型玩家專用視角與 UX 原則
- 堅持 **Mobile-First** 與 **Offline-First**（PWA + IndexedDB），確保無網路環境（噴漆室、展示會場）依然順暢秒開。
- 配方管理與標籤排版需模擬模型說明書（Gundam Manual / 說明書配色指南）之工業製圖排版風格，引線需具備防交叉與折線對齊能力。
- 塗料搜尋優先支援高效率的模糊編號輸入補全（如 UG01、C1、001 等），兼顧日系三大品牌（GSI、Gaia、Tamiya）資料庫。
