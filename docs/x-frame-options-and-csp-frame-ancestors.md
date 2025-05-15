---
title: X-Frame-Options and CSP frame-ancestors
description: X-Frame-Options and CSP frame-ancestors
---

### X-Frame-Options

一句話總結，這個 Response Header 決定該網頁是否可以被 HTML 的 `<frame>`, `<iframe>`, `<embed>` 或 `<object>` 嵌入

### X-Frame-Options: DENY

使用 NodeJS HTTP 模組實作

### X-Frame-Options: SAMEORIGIN

### CSP: frame-ancestors

### frame-ancestors 'none' vs X-Frame-Options: DENY

### frame-ancestors 'self' vs X-Frame-Options: SAMEORIGIN

<!-- todo-yusheng 驗證 -->
<!-- 繼承行為：

當使用 X-Frame-Options: SAMEORIGIN，嵌套的 frame 檢查是針對頂層頁面進行的
CSP frame-ancestors 檢查是針對直接父頁面進行的，這在多層嵌套的場景中更加精確 -->

### 參考資料

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
- https://aszx87410.github.io/beyond-xss/ch5/clickjacking/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy#self
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors