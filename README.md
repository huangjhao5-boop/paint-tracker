# Visual Paint Tracker - 塗裝配方管理系統 (V3 PWA)

模型玩家與塗裝愛好者專用的**視覺化模型塗裝配方紀錄、零件視覺標籤、色表庫存與進度管理系統**。

---

## 🌟 V3 重點特色與更新 (What's New in V3)

1. **📱 完整 PWA (Progressive Web App) 支援**：
   - 支援安裝至電腦桌面 (Chrome / Edge) 與手機主畫面 (iOS Safari / Android Chrome)。
   - 內建 Service Worker 與離線快取，無網路時可 100% 離線秒開運作（單機訪客模式）。
2. **💾 大容量本機儲存 (IndexedDB 升級)**：
   - 解決瀏覽器 LocalStorage 5MB 容量上限問題，支援每個專案儲存多張高畫質照片不遺失。
   - 支援 IndexedDB 自動回退至 LocalStorage 機制。
3. **🎯 視覺化標籤與智慧排版修復**：
   - 修正 `updateBomList` 名稱不一致導致的 JavaScript 錯誤。
   - 修正 Canvas `arc` 與手機觸控拖曳座標（`touchend` 支援）。
   - 支援標籤縮放、自動防碰撞排版、單擊編輯與雙擊切換詳細檢視。
4. **🔍 標籤 Modal 塗料即時自動補全**：
   - 彈出標籤視窗時，輸入主色漆料 (如 `UG09`) 或底漆 (如 `87042`) 即刻顯示智慧過濾清單並可一鍵代入。
5. **📤 一鍵輸出分享**：
   - **輸出圖片**：將標註好零件色號的 Canvas 渲染成高解析度 PNG 圖片下載。
   - **配方TXT檔**：一鍵輸出格式化零件塗裝清單 (BOM) 文字檔。
6. **🎨 完整日系模型漆資料庫**：
   - 收錄 **田宮 (TAMIYA)**、**蓋亞 (GAIANOTES)**、**郡氏 (GSI Creos / Mr.COLOR)** 數千種漆料、底漆、溶劑與專用工具。

---

## 📲 如何安裝為 PWA 應用程式

### 電腦端 (Windows / macOS)
- 使用 **Google Chrome** 或 **Microsoft Edge** 開啟 `index.html`。
- 點擊網址列右側出現的 **「安裝應用程式」** (電腦螢幕圖示) 或設定選單中的「安裝 Paint Tracker」。

### 手機端 (iOS Safari)
- 使用 **Safari** 開啟頁面。
- 點擊底部的 **「分享 (Share)」** 按鈕 ➜ 選擇 **「加入主畫面 (Add to Home Screen)」**。

### 手機端 (Android Chrome)
- 使用 **Chrome** 開啟頁面。
- 點擊右上角選單 ➜ 選擇 **「加到主畫面」** 或點擊頁面跳出的「安裝」提示。

---

## 🛠️ 目錄結構

```
paint-tracker/v3/
├── index.html         # V3 主應用程式介面與核心邏輯
├── manifest.json      # PWA 應用設定檔
├── sw.js              # PWA Service Worker 離線快取
├── README.md          # 系統說明文件
└── icons/             # 應用程式圖示
    ├── icon.svg       # 向量圖示
    ├── icon-192.png   # 192x192 PWA 圖示
    └── icon-512.png   # 512x512 PWA 圖示
```

---

## 💡 免責聲明
本應用程式內記載之所有塗料名稱、品牌與商標皆屬於原權利所有者。本工具為第三方獨立開發之管理應用程式，與各原廠無任何關聯。
