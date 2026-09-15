# Visual Paint Tracker - 專案開發開會紀錄 (Meeting Logs)

---

## 📅 會議編號：MTG-20260915-01
- **會議時間**：2026-09-15 09:02 (Local Time: 2026-09-14 17:02)
- **與會人員**：使用者 (Project Owner)、AI Coding Agent
- **會議主題**：針對功能細節優化反饋、演算法實作評估與新功能決議

### 📋 議題討論與評估

#### 議題一：塗料條碼 / QR Code 掃描盤點（評估實用性）
- **討論重點**：條碼辨識真的有比手動輸入更好嗎？
- **實務評估分析**：
  1. **瓶身幾何限制**：模型漆（GSI 10ml / Gaia 15ml / Tamiya 10ml/23ml）瓶身半徑僅約 1.5cm，屬於小曲率圓柱面，手機相機鏡頭在近距離微距對焦時，容易因曲面反光與條碼條紋拉伸變形而導致解碼失敗。
  2. **作業環境污損**：模型噴塗現場充滿漆霧、溶劑擦拭與漆罐疊放，瓶身紙質條碼極常沾染油漆或磨損。
  3. **模型漆業界編碼特性**：許多同系列塗料共用相同 JAN 條碼，甚至限量特仕版無獨立條碼；但塗料色號（如 C1、UG09、001）卻是唯一且最直觀的。
  4. **輸入效率比較**：現行系統已配備模糊搜尋與即時自動補全（Autocomplete），鍵入「UG1」或「001」僅需 0.5 秒，遠快於拿相機轉動瓶身對焦 3 秒。
- **會議決議**：暫緩實體條碼掃描功能，優先深化編號搜尋與配色辨識體驗。

#### 議題二：配色色盤取色器與色差演算（Eyedropper & Color Matching）
- **討論重點**：上傳完成照或設定圖時，如何在畫面吸色並演算出最相近的模型漆？
- **演算法核心架構**：
  1. **色彩取樣（Sampling）**：點擊畫布座標 `(x, y)`，以 3x3 像素區域平均取樣，過濾感光元件雜訊與反光高光，取得目標 RGB `(R, G, B)`。
  2. **色彩空間轉換（sRGB ➜ CIELAB）**：
     - 人眼對綠色的敏銳度高於藍色，單純 RGB 距離會有感知失真。
     - 演算法將 RGB 轉為標準 CIE XYZ，再轉為感知均勻的 CIELAB 色彩空間 $(L^*, a^*, b^*)$，其中 $L^*$ 為明度，$a^*$ 為紅綠軸，$b^*$ 為黃藍軸。
  3. **色差公式（Delta E / CIE76）**：
     $$\Delta E^* = \sqrt{(L_1 - L_2)^2 + (a_1 - a_2)^2 + (b_1 - b_2)^2}$$
     - $\Delta E < 2.0$：人眼幾乎無法分辨之極近色彩。
     - $\Delta E < 5.0$：極佳替代色。
  4. **相似度評分（Similarity Score）**：
     $$\text{Similarity (\%)} = \max(10, \min(99, 100 - \Delta E \times 1.4))$$
- **會議決議**：採納並直接實裝於 Project Editor，支援吸色點擊、色票即時預覽與前 4 名推薦色號一鍵套用。

#### 議題三：單張圖多標籤自動整齊排版與折線引線（Smart Leader Line Routing）
- **討論重點**：多標籤密集時畫面混亂、引線交錯問題。
- **演算法核心架構**：
  1. **左右分區錨定**：以畫布水平中心線為基準，`x < width/2` 歸入左翼欄位，`x >= width/2` 歸入右翼欄位。
  2. **Y 軸拓撲排序**：依據零件真實標記點之 Y 座標由上至下排序，從根本消除引線交叉（Crossing Lines）。
  3. **安全槽位分配（Slot Allocation）**：按標籤外框高度計算非重疊座標，保證標籤間距維持 6~8px。
  4. **折線導引繪製（Orthogonal / Elbow Routing）**：引線由標記錨點出發，依角度自然延伸至標籤外側，呈現如同萬代（BANDAI）官方模型說明書之工程藍圖美感。
- **會議決議**：採納並實裝「智慧排版」按鈕，同時支援手動微調與自動對齊。

### 📌 待辦事項與指派 (Action Items)
1. ✅ 建立 `AGENTS.md` 規範，將開會紀錄產出列為常態標準。
2. ✅ 實作畫布吸色器（Eyedropper Tool）與 CIELAB Delta-E 漆料比對演算法。
3. ✅ 實作智慧引線與一鍵自動整齊排版（Auto Tidy Layout）。
4. ✅ 實裝工程製圖級折線導引（Elbow Leader Lines）與同心精確瞄準針點（Precision Target Pin）。
5. ✅ 完成驗證測試與 PWA 本地離線運行測試。

---

## 📅 會議編號：MTG-20260915-02
- **會議時間**：2026-09-15 09:12 (Local Time: 2026-09-14 17:12)
- **與會人員**：使用者 (Project Owner)、AI Coding Agent
- **會議主題**：通用型技能（Universal SKILL.md）獨立模組化與跨平台移植

### 📋 議題討論與評估

#### 議題一：SKILL 的通用性與封裝格式
- **討論重點**：使用者要求將「專案開會紀錄與決策歷程規範」以及「技術圖面拓撲排版與 CIELAB 色彩比對」單獨拆解為通用的 SKILL 定義，以便在其他專案、團隊或不同的 AI Coding Agent（如 Google AI Studio、Claude Code、Cursor、Windsurf）中無縫複用。
- **實務評估分析**：
  1. **標準規範對齊**：遵循官方標準的 `SKILL.md` 格式（包含 YAML Frontmatter 的 `name`、`description` 與完整的流程指南）。
  2. **跨專案可移植性 (Portability)**：將特定業務領域與純演算法/規範解耦，確保丟入任何一個 Git 倉庫都能立即生效。
  3. **交付形式**：除建立於專案之 `/skills/` 實體目錄以供隨時下載外，於對話窗口中直接提供完整 Markdown 原始檔，方便使用者直接複製使用。
- **會議決議**：完成兩大通用技能的封裝：
  - `skills/project-meeting-logs/SKILL.md`：通用型【專案研討開會紀錄與工程決策歷程】技能。
  - `skills/technical-canvas-annotation/SKILL.md`：通用型【技術圖面防交叉拓撲排版與 CIELAB 色差感知比對】技能。

### 📌 待辦事項與指派 (Action Items)
1. ✅ 產出通用型開會與決策規範 `skills/project-meeting-logs/SKILL.md`。
2. ✅ 產出通用型技術圖面拓撲排版與色差感知 `skills/technical-canvas-annotation/SKILL.md`。
3. ✅ 於對話終端以標準程式碼區塊完整交付，方便使用者單鍵複製使用。

---

## 📅 會議編號：MTG-20260915-03
- **會議時間**：2026-09-15 09:16 (Local Time: 2026-09-14 17:16)
- **與會人員**：使用者 (Project Owner), AI Coding Agent (War Room Operator)
- **會議主題**：【SKILL_WAR_ROOM_AUDIT】完整規範實體固化與最高準則落地

### 📋 議題討論與評估

#### 議題一：SKILL_WAR_ROOM_AUDIT 的完整性與持久化存檔
- **討論重點**：先前對話因平台 context truncation（歷史對話截斷）導致使用者提供的《Universal Agentic Dev & War Room Protocol》未以實體檔案持久化而遺失。使用者重新提供了完整的 4 角色深度檢驗協同與行動/平板手感底線標準。
- **實務評估分析**：
  1. **防遺失機制 (Anti-Loss Persistence)**：必須同時寫入根目錄 `/SKILL_WAR_ROOM_AUDIT.md`、技能目錄 `/skills/war-room-audit/SKILL.md`，並將其約束明確錨定在 `/AGENTS.md` 的常態規則頂部（第 0 條）。
  2. **跨端手感與安全準則落實**：
     - 4 角色（產品總指揮、刁民使用者、毒舌紅隊、硬核架構工程師）列為後續所有開發的必檢項目。
     - 行動端 `<768px` 輸入框強制 16px（防止 iOS 放大）、動態高度 `100dvh`、安全區保護 `env(safe-area-inset-bottom)`、觸控熱區 ≥ 44px × 44px、平板雙欄互斥。
     - 零明文上雲、單向雜湊加鹽與本機 IndexedDB 離線防禦。
- **會議決議**：
  - 100% 完整收錄使用者提供的全文，精確落盤至專案儲存區。
  - 將本技能作為本專案及後續所有專案的最高指令集。

### 📌 待辦事項與指派 (Action Items)
1. ✅ 完整落盤 `/SKILL_WAR_ROOM_AUDIT.md`。
2. ✅ 建立 `/skills/war-room-audit/SKILL.md` 供跨專案移植。
3. ✅ 於 `AGENTS.md` 確立為最高戰情指令規範。
4. ✅ 稽核前端代碼 (`index.html`)，確認 16px、100dvh、安全區與 44px 觸控熱區完全合規。

---

## 📅 會議編號：MTG-20260915-04
- **會議時間**：2026-09-15 10:10 (Local Time: 2026-09-14 18:10)
- **與會人員**：使用者 (Project Owner), AI Coding Agent
- **會議主題**：回歸 App 產品原點思考與「微觀吸色放大鏡準心 (Offset Precision Loupe)」實裝

### 📋 議題討論與評估

#### 議題一：回歸產品原點思考（Core Product Purpose）
- **討論重點**：重新定義「Visual Paint Tracker」的靈魂價值。
- **原點總結**：
  - 本 App 的唯一核心原點，就是**「讓模型玩家能將說明書/範例圖上的零件色彩，精確轉譯為真實可購買的模型漆號（GSI/Gaia/Tamiya）與調色配方，並無縫標記在零件圖上」**。
  - 第一步「取樣吸色」是整個鏈條的生命線。若第一步吸色因手指遮擋而吸到反光區或陰影區，所有後續 Delta-E 色差比對與 BOM 清單都將失真。

#### 議題二：微觀吸色放大鏡準心 (Precision Loupe Engine) 實裝
- **討論重點**：解決行動端單手操作、戴手套或手指粗大時遮擋 1/144 等細小零件吸色區域的致命問題。
- **實務與演算法架構**：
  1. **無障礙視線偏移 (Offset Precision Geometry)**：長按或拖曳時，放大鏡圓心設定於觸摸點正上方 75px (`loupeCY = y - (loupeR + 55)`)，當觸及頂部邊界時自動切換至下方懸浮，確保視線零遮擋。
  2. **2.6x 畫布微觀像素放大**：以 `Canvas.clip()` 圓形遮罩截取採樣點周遭像素，進行 2.6 倍超高對比動態放大。
  3. **雙層高對比十字準心 (Reticle Crosshair & Centre Ring)**：中心配備 4px 空心環不遮擋像素，搭配雙色反色導線與點陣錨點。
  4. **即時 HUD 漆號比對膠囊**：滑動過程中即時演算 CIELAB 色差，並於放大鏡上方/下方呈現即時漆號（如 `UG01 (98%)`）與 Hex 色票。
  5. **離手鎖定機制 (Release-to-Lock)**：手指滑動為動態探針預覽，抬起（TouchUp/MouseUp）時才精確鎖定位置並彈出配方設定 Modal。

### 📌 待辦事項與指派 (Action Items)
1. ✅ 完成吸色放大鏡 `drawEyedropperLoupe` 畫布渲染引擎開發。
2. ✅ 整合 Touch / Mouse 事件流（Down, Move, Up），支援行動端雙向平滑預覽。
3. ✅ 通過 `compile_applet` 100% 靜態與編譯檢查。


