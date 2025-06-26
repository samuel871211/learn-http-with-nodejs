---
title: Strict-Transport-Security
description: Strict-Transport-Security
---

### 語法

```
Strict-Transport-Security: max-age=<seconds>
Strict-Transport-Security: max-age=<seconds>; includeSubDomains
Strict-Transport-Security: max-age=<seconds>; includeSubDomains; preload
```

### NodeJS HTTP Server

根據[MDN 文件](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security#description)的描述：

```
Note: The host must send the Strict-Transport-Security header over HTTPS only, not insecure HTTP. Browsers ignore the header if sent over HTTP to prevent a manipulator-in-the-middle (MITM) from altering the header to expire prematurely or adding it for a host that doesn't support HTTPS.
```

### NodeJS HTTPS Server

### 設定 hosts 檔案

### 憑證不安全的情境

根據[MDN 文件](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security#description)的描述：

```
If a TLS warning or error, such as an invalid certificate, occurs when connecting to an HSTS host, the browser does not offer the user a way to proceed or "click through" the error message, which would compromise the intention of strict security.
```

### mkcert 建立本機 CA ，並生成多 domain 憑證

### disable HSTS

### chrome HSTS 管理介面

### preload 機制

根據[MDN 文件](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security#expiration)的描述：

```
To disable HSTS, set max-age=0. This only takes effect once the browser makes a secure request and receives the response header. By design, you cannot disable HSTS over insecure HTTP.
```

### Best Practice

根據[MDN 文件](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security#insecure_http_requests)的描述：

```
If the host accepts insecure HTTP requests, it should respond with a permanent redirect (such as status code 301) having an https URL in the Location header.
```

我觀察有一些網站，也確實會 follow 這個 best practice，所以我們就來實作一個看看吧～

### 小結

### 參考資料

- chrome://net-internals/#hsts
- https://www.chromium.org/hsts/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security
<!-- 還沒看 -->
- https://hstspreload.org/
- https://www.rfc-editor.org/rfc/rfc6797#section-6.1
