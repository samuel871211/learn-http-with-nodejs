---
title: 深入瞭解 Referrer Policy
description: 深入瞭解 Referrer Policy
---

上一篇談到使用 fetch API 的參數來設定 `referrerPolicy`，現在要來談談如何從 Server Side 去設定，使用 NodeJS HTTP module 來實作簡易的 HTTP server，設定 `no-referrer`，並且載入跨域的圖片跟影片

```js
httpServer.on('request', (req, res) => {
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Content-Type", "text/html");
    res.end(`<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <video src="https://youtu.be/79RLkH3T8hg?si=VcjfDcGujMj3ZXhU"></video>
        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />
    </body>
</html>`);
});
```

我們用瀏覽器打開 http://localhost:5000/ > F12 > Network > General，觀察 Referrer Policy：

http://localhost:5000/ ，使用瀏覽器預設的 `Referrer Policy: strict-origin-when-cross-origin` 是合理的，因為請求這個資源時，還沒收到 Server 回傳的 response header，所以使用預設值

![localhostDefaultReferrerPolicy](../static/img/localhostDefaultReferrerPolicy.jpg)

瀏覽器後續解析 HTML，並且請求跨域的圖片跟影片，此時就會套用 Server 回傳的 `Referrer Policy: no-referrer`

![imageWithResponseReferrerPolicy](../static/img/imageWithResponseReferrerPolicy.jpg)
![videoWithResponseReferrerPolicy](../static/img/videoWithResponseReferrerPolicy.jpg)

我們接著使用 fetch API，觀察 `Referrer Policy` 是否也變成 `no-referrer`

```js
fetch("http://localhost:5000/");
fetch("http://localhost:5000/", { method: "POST" });
fetch("https://www.google.com/");
```

可以觀察到 General > `Referrer Policy: no-referrer`，我們也可以得出一個結論，當 Response Header 有設定 `Referrer Policy`，就會覆寫瀏覽器的預設值

我們再繼續嘗試，如果在 fetch API 指定 `referrerPolicy`，這個優先級會高過 Response Header 設定的 `Referrer Policy` 嗎？