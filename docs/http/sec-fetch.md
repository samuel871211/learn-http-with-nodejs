---
title: Sec-Fetch
description: Sec-Fetch
last_update:
  date: "2025-05-11T08:00:00+08:00"
---

### Sec-Fetch 是什麼

- `Sec` 是指 `Security`
- `Sec-Fetch` 開頭的 HTTP Request Headers 總共有 4 個
  1. Sec-Fetch-Site
  2. Sec-Fetch-Mode
  3. Sec-Fetch-User
  4. Sec-Fetch-Dest
- 承上，這 4 個 Headers 無法透過 JavaScript 去修改，這是瀏覽器預設就會帶上的

### Sec-Fetch-Site

根據[MDN 官方文件](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Site) 的描述

```
indicates the relationship between a request initiator's origin and the origin of the requested resource
```

總共有四種情況

1. cross-site

- 跨域，例如 `a.example.com` 載入 `other.domain.com` 的資源

2. same-origin

- 同源，例如 `a.example.com` 載入 `a.example.com` 的資源

3. same-site

- subdomain，例如 `a.example.com` 載入 `b.example.com` 的資源

4. none

- 直接從瀏覽器網址列輸入網址
- 從瀏覽器書籤進入網址

### Sec-Fetch-Mode

用來告訴 Server "這個請求是怎麼發起的"

總共有 5 種情況，前面 4 種都是 `fetch` 的第二個參數 `options.mode`

1. cors

- `fetch("URL")` 不指定第二個參數 `options.mode` 的情況，預設就是 `cors`

2. navigate

- 直接從瀏覽器網址列輸入網址
- 從瀏覽器書籤進入網址
- `<a>` 或 `location.assign` 等等網址轉導

3. no-cors

- 使用 `<img>` 載入圖片，因為圖片只是要顯示在畫面上，無法透過 JavaScript 讀取圖片的數據。
- `fetch("URL", { mode: "no-cors" })`

4. same-origin

- 在 `a.example.com` 的 F12 > Console 輸入 `fetch("a.example.com", { mode: "same-origin" })`

5. websocket

### Sec-Fetch-User

用來告訴 Server "這個請求是不是使用者主動發起的"

總共有 2 種情況

1. `Sec-Fetch-User: ?1`

- 使用者載入網頁
- 使用者點擊 `<a>`

2. 瀏覽器會 Omit 這個 Header

- 網頁載入的 `<img>`, `<script>`
- F12 > Console 輸入 `fetch("URL")`

### Sec-Fetch-Dest

根據[MDN 官方文件](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Dest) 的描述

```
where (and how) the fetched data will be used
```

有很多種情況，不過大致上就是，要載入哪種資源

1. image => 載入圖片
2. document => 載入 HTML
3. iframe => 載入 iframe

<!-- todo-yusheng -->
<!-- ### 如何防範資安漏洞 -->

### 參考資料

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Dest
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Mode
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Site
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-User
- https://developer.mozilla.org/en-US/docs/Glossary/Fetch_metadata_request_header
- https://web.dev/articles/fetch-metadata
- https://developer.mozilla.org/en-US/docs/Web/API/Request/destination
