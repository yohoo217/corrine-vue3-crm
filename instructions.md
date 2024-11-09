## 核心功能 - API 路由描述
### 用戶功能
- **註冊 (`POST /api/users/register`)**
  - 功能：用戶註冊。
  - 輸入格式：
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - 輸出：
    - 成功：`{ message: "註冊成功" }`
    - 失敗：返回 `400` 和錯誤訊息。

- **登入 (`POST /api/users/login`)**
  - 功能：用戶登入並生成 JWT。
  - 輸入格式：
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - 輸出：
    - 成功：
      ```json
      {
        "token": "string",
        "role": "user | admin"
      }
      ```
    - 失敗：返回 `400` 和錯誤訊息。

- **獲取當前用戶 (`GET /api/users/me`)**
  - 功能：返回當前已登入用戶的信息。
  - 輸出：
    ```json
    {
      "_id": "string",
      "username": "string",
      "email": "string",
      "isAdmin": false,
      "__v": 0
    }
    ```

### 課程功能
- **獲取課程列表 (`GET /api/courses`)**
  - 功能：返回所有課程信息。
  - 輸出：
    ```json
    [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": "number",
        "date": "string",
        "level": "string"
      }
    ]
    ```

- **新增課程 (`POST /api/courses`)**
  - 功能：新增課程。
  - 輸入格式：課程資料。

- **更新課程 (`PUT /api/courses/:id`)**
  - 功能：更新指定課程。
  - 輸入格式：課程資料。

- **刪除課程 (`DELETE /api/courses/:id`)**
  - 功能：刪除指定課程。
