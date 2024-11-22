# API 文檔

## 基本信息
- Local Base URL: `http://localhost:5001/api`
- POC Base URL: `https://wangcom.online/api`

## 路由詳情
### 用戶相關
1. **POST /api/users/register**
   - 描述：用戶註冊。
   - 請求 Body：
     ```json
     {
       "username": "string",
       "email": "string",
       "password": "string"
     }
     ```
   - 回應：
     - 成功：`{ message: "註冊成功" }`
     - 失敗：`{ error: "錯誤訊息" }`

2. **POST /api/users/login**
   - 描述：用戶登入。
   - 請求 Body：
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - 回應：
     ```json
     {
       "token": "string",
       "role": "user"
     }
     ```

3. **GET /api/users/me**
   - 描述：返回當前用戶信息。
   - 請求 Header：
     - `Authorization: Bearer <token>`
   - 回應：
     ```json
     {
       "_id": "string",
       "username": "string",
       "email": "string",
       "isAdmin": false
     }
     ```

### 課程相關
1. **GET /api/courses**
   - 描述：返回所有課程信息。
   - 回應：
     ```json
     [
       {
         "_id": "string",
         "name": "string",
         "price": "number",
         "description": "string",
         "duration": "string",
         "level": "string"
       }
     ]
     ```

2. **POST /api/courses**
   - 描述：新增課程。
   - 請求 Body：
     ```json
     {
       "name": "string",
       "description": "string",
       "price": "number",
       "date": "string",
       "duration": "string",
       "level": "string"
     }
     ```
   - 回應：新增課程資料。

---
