# VUE3-COURSE-CRM

## 簡介
VUE3-COURSE-CRM 是一個基於 Vue 3 的課程預訂，旨在幫助語言教室管理課程、學生資訊和訂課情況。此系統包含後台課程管理、使用者登入與註冊、預訂課程等多種功能。

## 專案結構
```
VUE3-COURSE-CRM
|-- .env
|-- package.json
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
    |-- Components
    |   |-- BookingForm.vue
    |   |-- CourseList.vue
    |   |-- CRMDashboard.vue
    |   |-- SiteFooter.vue
    |-- Router
    |   |-- index.js
    |-- Store
    |   |-- Modules
    |       |-- index.js
    |-- Views
        |-- AdminOrders.vue
        |-- BookingPage.vue
        |-- CRM.vue
        |-- HomePage.vue
        |-- UserLogin.vue
        |-- UserRegister.vue
```

## 安裝與運行
### 環境要求
- Node.js (版本 14 以上)
- MongoDB

### 安裝步驟
1. clone 專案至本地端：
   ```
   git clone https://github.com/yohoo217/vue3-course-crm.git
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
   node server.js
   ```

## 功能說明
- **用戶管理**：用戶可以註冊、登入，並管理使用者訊息。
- **課程管理**：管理者可以新增、編輯和刪除課程資訊。
- **預訂功能**：已登入的使用者可以預訂課程，並查看預訂狀態。
- **CRM 系統**：後台管理者可以查看和管理所有預訂和使用者資訊。

## middleware
- **auth.js**：處理使用者驗證，確保只有已登入的使用者才能訪問受保護的路由。
- **admin.js**：確認管理者身份，保護管理端路由。

## API Routes
- **/bookings**：處理預訂相關的操作。
- **/courses**：處理課程的增刪改查操作。
- **/users**：處理用戶的註冊、登入和信息管理。

## 技術架構
- **前端**：Vue 3、PrimeVue，用於構建響應式的用戶界面。
- **後端**：Node.js，使用 REST API 與前端通信。
- **資料庫**：MongoDB，儲存用戶、課程和預訂信息。
