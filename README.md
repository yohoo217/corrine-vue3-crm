# VUE3-COURSE-CRM

## 簡介

VUE3-COURSE-CRM 是一個基於 Vue 3 的課程預訂和 CRM 系統，於設計中目的是幫助語言教學機構管理課程、學生資訊和預訂情況。此應用包含後台課程管理、使用者登入與註冊、預訂課程等多種功能。

## 專案結構

```
VUE3-COURSE-CRM
.
├── README.md               # 專案簡介文件
├── api-docs.md             # API 文件
├── babel.config.js         # Babel 配置
├── config.md               # 配置說明
├── db-design.md            # 資料庫設計文件
├── dist                    # 打包後的輸出目錄
│   ├── css                 # 打包的 CSS
│   ├── fonts               # 字型資源
│   ├── img                 # 圖片資源
│   └── js                  # 打包的 JavaScript
├── instructions.md         # 使用說明文件
├── jsconfig.json           # JavaScript 設定
├── middleware              # 中間件
│   ├── admin.js            # 管理員驗證中間件
│   └── auth.js             # 認證中間件
├── models                  # 資料模型
│   └── Course.js           # 課程模型
├── node_modules            # 依賴文件（省略具體內容）
├── package-lock.json       # 鎖定的依賴版本
├── package.json            # 專案依賴與腳本配置
├── server                  # 伺服器端代碼
│   ├── models              # 資料模型
│   ├── routes              # 路由
│   └── server.js           # 主伺服器檔案
├── src                     # 前端代碼
│   ├── App.vue             # 主應用組件
│   ├── api                 # API 請求相關文件
│   ├── assets              # 靜態資源
│   ├── components          # Vue 組件
│   ├── i18n.js             # 國際化設置
│   ├── locales             # 翻譯文件
│   ├── main.js             # 應用入口
│   ├── router              # 路由設置
│   ├── store               # 狀態管理
│   └── views               # 頁面視圖
├── test-plan.md            # 測試計畫
├── typings.d.ts            # TypeScript 類型定義
└── vue.config.js           # Vue 配置文件

```

## 安裝與運行

### 環境要求

- Node.js (版本 14 以上)
- MongoDB

### 安裝步驟

1. 克隆專案至本地端：

   ```
   git clone https://github.com/yourusername/VUE3-COURSE-CRM.git
   ```

2. 安裝依賴：

   ```
   cd VUE3-COURSE-CRM
   npm install
   ```

3. 配置 `.env` 文件：

   - 在根目錄創建 `.env` 文件，並填寫必要的環境變數，例如資料庫連接字串。

4. 啟動服務：

   ```
   npm run serve
   ```

## 功能說明

- **用戶管理**：用戶可以註冊、登入，並管理個人資訊。
- **課程管理**：管理者可以新增、編輯和刪除課程資訊。
- **預訂功能**：已登入的用戶可以預訂課程，並查看預訂狀態。
- **CRM 系統**：後台管理者可以查看和管理所有預訂和用戶資訊。
- **多語言支援**：提供中文和英文的界面。

## 中介軟體

- **auth.js**：處理用戶驗證，確保只有已登入的用戶才能訪問受保護的路由。
- **admin.js**：確認管理者身份，保護管理端路由。

## API Routes

- **/bookings**：處理預訂相關的操作。
- **/courses**：處理課程的增刪改查操作。
- **/users**：處理用戶的註冊、登入和資訊管理。

## 技術架構

- **前端**：Vue 3、PrimeVue，用於構建響應式的用戶界面。
- **後端**：Node.js，使用 REST API 與前端通信。
- **資料庫**：MongoDB，儲存用戶、課程和預訂資訊。

## 貢獻指南

1. Fork 此專案。
2. 創建你的分支（`git checkout -b feature/your-feature`）。
3. 提交更改（`git commit -m 'Add some feature'`）。
4. Push 到分支（`git push origin feature/your-feature`）。
5. 提交 Pull Request。

## License

此專案使用 MIT License，詳細請參閱 LICENSE 文件。

