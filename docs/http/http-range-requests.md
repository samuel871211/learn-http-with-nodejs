---
title: HTTP Range Requests
description: HTTP Range Requests
---

### 使用時機

Range Requests，通常用在影片播放，當我們使用 `<video>` 載入影片時：

- 若 Server 支援 Range，就可以實現跳轉功能
- 若 Server 不支援 Range，則無法跳轉

### 參考資料

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Range
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Range
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Range
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Ranges
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/206
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/416
