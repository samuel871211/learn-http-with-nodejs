---
title: HTTP Request Methods
description: HTTP Request Methods
---

### 前言

我們平常 RESTFUL API 會用到的 HTTP Request Methods 就 GET, POST, PUT, PATCH, DELETE

- GET: 取資料
- POST: 新增資料
- PUT: 更新資料
- PATCH: 部分更新資料
- DELETE: 刪除資料

但，今天我想要深入理解，平常不會去使用那些 HTTP Request Methods，一起來看看吧！

### HEAD

- 簡單理解：同 GET 請求，只是把 Response Body 拿掉
- 承上，如果 Response Body 有值，HTTP Client "MUST" 忽略它
- 使用情境：下載大型檔案前，先發一個 HEAD 請求，讀取 Response.Headers.Content-Length，就可以預先知道檔案大小
- 如果發了 HEAD 請求，Server 回傳說 "快取過期了"。此情況下，快取會被更新，即便 GET 請求沒有發送
- 承上，詳細的測試情境，我們放到未來的篇章 [http-caching](../http/http-caching-1.md)

理論都是美好的，現實情況是，HEAD 請求不一定會回傳 Response.Headers.Content-Length，即便回傳了，數字也不一定正確，原因如下：

- 根據 [RFC9110 9.3.2. HEAD](https://httpwg.org/specs/rfc9110.html#rfc.section.9.3.2) 的描述：

```
However, a server MAY omit header fields for which a value is determined only while generating the content.
```

- 若 GET 請求，Server 使用 [transfer-encoding](../http/transfer-encoding.md): chunked，那 Response.Headers.Content-Length 本來就沒有

### CONNECT

### OPTIONS

### TRACE

### 參考資料

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/HEAD
- https://httpwg.org/specs/rfc9110.html#rfc.section.9.3.2
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/CONNECT
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/OPTIONS
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/TRACE
- https://fetch.spec.whatwg.org/#methods
