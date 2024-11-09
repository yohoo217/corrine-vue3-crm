# VUE3-COURSE-CRM

## 簡介
VUE3-COURSE-CRM 是一個基於 Vue 3 的課程預訂和 CRM 系統，旨在幫助語言教學機構管理課程、學生信息和預訂情況。此應用包含後台課程管理、使用者登入與註冊、預訂課程等多種功能。

## 專案結構
```
VUE3-COURSE-CRM
|-- .env
|-- package.json
|-- package-lock.json
|-- server.js
|-- Middleware
|   |-- auth.js
|   |-- admin.js
|-- Server
|   |-- Config
|   |   |-- config.js
|   |-- Models
|   |   |-- Booking.js
|   |   |-- Course.js
|   |   |-- Customer.js
|   |   |-- User.js
|   |-- Routes
|       |-- bookings.js
|       |-- courses.js
|       |-- customers.js
|       |-- payment.js
|       |-- users.js
|-- src
    |-- API
    |   |-- config.js
    |-- Assets
    |-- Components
    |   |-- BookingForm.vue
    |   |-- CourseList.vue
    |   |-- CRMDashboard.vue
    |   |-- ErrorBoundary.vue
    |   |-- HelloWorld.vue
    |   |-- SiteFooter.vue
    |-- Router
    |   |-- bookings.js
    |   |-- courses.js
    |   |-- index.js
    |-- Store
    |   |-- Modules
    |       |-- index.js
    |-- Views
        |-- AdminOrders.vue
        |-- BookingPage.vue
        |-- CourseDetail.vue
        |-- CourseInfo.vue
        |-- CourseList.vue
        |-- CRM.vue
        |-- HomePage.vue
        |-- NewsPage.vue
        |-- PersonalInfo.vue
        |-- UserLogin.vue
        |-- UserRegister.vue
        |-- App.vue
|-- Config Files
    |-- .browserslistrc
    |-- .eslintrc.js
    |-- .gitignore
    |-- babel.config.js
    |-- jsconfig.json
    |-- main.js
    |-- pnpm-lock.yaml
    |-- README.md
    |-- typings.d.ts
    |-- vue.config.js
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
- **用戶管理**：用戶可以註冊、登入，並管理個人信息。
- **課程管理**：管理者可以新增、編輯和刪除課程信息。
- **預訂功能**：已登入的用戶可以預訂課程，並查看預訂狀態。
- **CRM 系統**：後台管理者可以查看和管理所有預訂和用戶信息。

## 中介軟體
- **auth.js**：處理用戶驗證，確保只有已登入的用戶才能訪問受保護的路由。
- **admin.js**：確認管理者身份，保護管理端路由。

## API Routes
- **/bookings**：處理預訂相關的操作。
- **/courses**：處理課程的增刪改查操作。
- **/users**：處理用戶的註冊、登入和信息管理。

## 技術架構
- **前端**：Vue 3、PrimeVue，用於構建響應式的用戶界面。
- **後端**：Node.js，使用 REST API 與前端通信。
- **資料庫**：MongoDB，儲存用戶、課程和預訂信息。

## 貢獻指南
1. Fork 此專案。
2. 創建你的分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'Add some feature'`)
4. Push 到分支 (`git push origin feature/your-feature`)
5. 提交 Pull Request

## License
此專案使用 MIT License，詳細請參閱 LICENSE 文件。

