# MyBlog

一个前后端分离的个人博客系统：Egg.js（tegg 模块化）＋ MySQL 提供 API，React 19 ＋ Vite 负责界面，包含首页、简历、文章列表（无限滚动）、文章详情、后台登录与文章发布/删除。

## 目录结构

```
MyBlog/
├── hackernews-tegg/          # 后端：Egg.js + tegg + MySQL
│   ├── app/
│   │   ├── controller/http/  # AdminController（登录）、PostController（文章 CRUD）
│   │   └── module/blog/      # data（连接池、类型）、service（PostService、AuthService）
│   ├── config/               # config.default / local / prod / unittest
│   └── .env                  # 本地环境变量（已被 git 忽略）
└── my-react/                 # 前端：React 19 + Vite + React Router 7
    └── src/
        ├── page/             # home / resume / blog / post / admin / postEditor
        ├── component/        # header / footer / observer（无限滚动）/ scrollToTop
        ├── data/blog.ts      # 请求封装与类型
        └── styles/theme.css  # 主题变量
```

## 技术栈

| 层 | 选型 |
| --- | --- |
| 后端框架 | Egg.js 4（beta）＋ tegg 装饰器式 Controller |
| 数据库 | MySQL（`mysql2/promise` 连接池，connectionLimit 5） |
| 语言 | TypeScript（后端 5.x / 前端 6.x），Node.js ≥ 22.18 |
| 前端 | React 19 ＋ Vite 8 ＋ React Router 7 |
| 代码检查 | oxlint（前后端统一） |

## 快速开始

### 0. 准备

- Node.js ≥ 22.18（后端 `package.json` 的 `engines` 要求）
- MySQL 8.x，已创建数据库 `myblog`

### 1. 建表

字段按代码中的查询还原，如你的库结构与下面不一致，以后端 SQL 为准：

```sql
CREATE TABLE posts (
  id           VARCHAR(16)  PRIMARY KEY,   -- 形如 p1、p15
  title        VARCHAR(255) NOT NULL,
  content      MEDIUMTEXT   NOT NULL,
  cover_url    VARCHAR(512) NULL,
  create_time  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_published TINYINT(1)   NOT NULL DEFAULT 1,
  KEY idx_publish_time (is_published, create_time)
) DEFAULT CHARSET = utf8mb4;
```

### 2. 配环境变量

在 `hackernews-tegg/` 下新建 `.env`（该文件已在 `.gitignore` 中，不会提交）：

```
ADMIN_USER=你的管理员账号
ADMIN_PASSWORD=你的管理员密码
ADMIN_SECRET=一串足够长的随机字符串
DB_PASSWORD=你的数据库密码
```

可选变量（有默认值，不填也能跑）：`DB_HOST`（127.0.0.1）、`DB_PORT`（3306）、`DB_USER`（root）、`DB_NAME`（myblog）、`APP_KEYS`。

### 3. 起后端

```bash
cd hackernews-tegg
npm i
npm run dev          # http://127.0.0.1:7001
```

### 4. 起前端

另开一个终端：

```bash
cd my-react
npm i
npm run dev          # http://localhost:5173
```

Vite 已配置代理，`/api` 全部转发到 `http://127.0.0.1:7001`，前端代码里直接写 `/api/xxx` 即可，无需处理跨域。

## API

| 方法 | 路径 | 鉴权 | 说明 |
| --- | --- | --- | --- |
| POST | `/api/admin/login` | — | 登录，返回 `{ token, expiresAt, user }` |
| GET | `/api/posts?page=&pageSize=` | — | 文章列表。`page` 默认 1，`pageSize` 默认 10、上限 50，非法值会被夹到合法区间；返回 `{ data, hasMore }` |
| GET | `/api/posts/:id` | — | 文章详情，不存在返回 404 |
| POST | `/api/posts` | ✅ | 新建文章，body：`{ title, content, coverUrl? }` |
| DELETE | `/api/posts/:id` | ✅ | 删除文章，不存在返回 404 |

鉴权方式：请求头 `Authorization: Bearer <token>`。写操作的 token 由前端存放在 localStorage，`401` 时清除并跳转 `/admin`。

## 前端路由

| 路径 | 页面 |
| --- | --- |
| `/` | 首页 |
| `/resume` | 简历 |
| `/blog` | 文章列表（IntersectionObserver 无限滚动） |
| `/blog/:id` | 文章详情（含删除入口，仅登录后显示） |
| `/admin` | 后台登录 |
| `/admin/new` | 文章编辑器 |

## 常用脚本

后端（`hackernews-tegg/`）：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 开发模式，热重载 |
| `npm run build` | `tsc` 编译到 js |
| `npm start` / `npm stop` | 生产启动 / 停止 |
| `npm test` | vitest 单测 |
| `npm run lint` | oxlint 检查 |
| `npm run typecheck` | tsgo 类型检查 |

前端（`my-react/`）：

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | Vite 开发服务器 |
| `npm run build` | `tsc -b` ＋ `vite build` |
| `npm run preview` | 预览构建产物 |
| `npm run lint` | oxlint 检查 |

## License

[MIT](LICENSE)
