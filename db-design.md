# 資料庫設計

## 用戶集合 (Users)
| 欄位       | 類型        | 描述             |
|------------|-------------|------------------|
| `_id`      | ObjectId    | 唯一標識         |
| `username` | String      | 用戶名           |
| `email`    | String      | 用戶郵箱         |
| `password` | String      | 密碼 (已加密)    |
| `isAdmin`  | Boolean     | 是否為管理者     |

## 課程集合 (Courses)
| 欄位         | 類型      | 描述                   |
|--------------|-----------|------------------------|
| `_id`        | ObjectId  | 唯一標識               |
| `name`       | String    | 課程名稱               |
| `description`| String    | 課程描述               |
| `price`      | Number    | 價格                   |
| `date`       | Date      | 上課日期               |
| `duration`   | String    | 課程時長               |
| `level`      | String    | 難度等級               |

## 預訂集合 (Bookings)
| 欄位      | 類型      | 描述                   |
|-----------|-----------|------------------------|
| `_id`     | ObjectId  | 唯一標識               |
| `course`  | ObjectId  | 關聯的課程 ID          |
| `customer`| ObjectId  | 關聯的用戶 ID          |
| `date`    | Date      | 預訂時間               |
