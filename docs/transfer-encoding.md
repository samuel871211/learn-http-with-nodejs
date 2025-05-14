---
title: Transfer-Encoding
description: Transfer-Encoding
---

### Transfer-Encoding: chunked

HTTP 1.1 的世界，新增了 `Transfer-Encoding: chunked` 的概念，允許 request.body 或是 response.body 分塊傳輸

格式如下：

```
<byteLengthInHex>CRLF
<Data>CRLF
<byteLengthInHex>CRLF
<Data>CRLF
<byteLengthInHex>CRLF
<Data>CRLF
0CRLFCRLF
```

範例：
```
a\r\n
first line\r\n
b\r\n
second line\r\n
a\r\n
third line\r\n
0\r\n\r\n
```

### 使用 NodeJS 實作 Transfer-Encoding: chunked

NodeJS HTTP 模組，預設是開啟 `chunked` 傳輸的，線索如下：

1. 根據 NodeJS 官方文件描述


https://nodejs.org/api/http.html#responsewritechunk-encoding-callback
```
The first time response.write() is called, it will send the buffered header information and the first chunk of the body to the client.
```

2. 根據 NodeJS 原始碼

https://github.com/nodejs/node/blob/main/lib/_http_outgoing.js#L105
```js
function OutgoingMessage(options) {
  // other code
  this.useChunkedEncodingByDefault = true;
}
```

我們使用 NodeJS HTTP 模組來實作：

```ts
import httpServer from "../httpServer";
import { faviconListener } from "../listeners/faviconListener";
import { notFoundListener } from "../listeners/notFoundlistener";

const firstline = "firstline~~~";
const secondline = "secondline~~~";
const thirdline = "thirdline~~~";

httpServer.on('request', function requestListener(req, res) {
    if (req.url === "/favicon.ico") return faviconListener(req, res);
    if (req.url === "/case1") {
        // res.write 會自動幫忙處理 transfer-encoding：chunked 的格式
        res.write(firstline);
        res.write(secondline);
        res.end(thirdline);
        return;
    }
    return notFoundListener(req, res);
});
```

然後使用瀏覽器打開 http://localhost:5000/case1

![transfer-encoding-http](../static/img/transfer-encoding-http.jpg)

`res.write` 底層，會處理 `\r\n` 以及計算資料 byte length 的邏輯，所以只需寫入資料即可

### 使用 Socket.write 自行處理資料格式

為了讓大家對 chunked encoding 的資料格式更熟悉，我們接著使用 [Socket.write](https://nodejs.org/api/net.html#socketwritedata-encoding-callback) 來寫入 raw HTTP Response Body

```ts
if (req.url === "/case2") {
    // 先送 header 出去
    res.setHeader("transfer-encoding", "chunked");
    res.flushHeaders();

    // 使用 socket.write 自行處理 transfer-encoding: chunked 的格式
    res.socket?.write(`${Buffer.byteLength(firstline).toString(16)}\r\n${firstline}\r\n`);
    res.socket?.write(`${Buffer.byteLength(secondline).toString(16)}\r\n${secondline}\r\n`);
    res.socket?.write(`${Buffer.byteLength(thirdline).toString(16)}\r\n${thirdline}\r\n`);
    res.socket?.end("0\r\n\r\n");
    return;
}
```

然後使用瀏覽器打開 http://localhost:5000/case2

![transfer-encoding-socket](../static/img/transfer-encoding-socket.jpg)

可以看到結果跟上面使用 `res.write` 是一樣的

那如果格式錯誤呢？我們故意把其中一個 `\r\n` 拿掉

```ts
res.socket?.write(`${Buffer.byteLength(firstline).toString(16)}\r\n${firstline}`);
```

用瀏覽器打開 http://localhost:5000/case2

![err-invalid-chunked-encoding](../static/img/err-invalid-chunked-encoding.jpg)

瀏覽器就會噴 `ERR_INVALID_CHUNKED_ENCODING` 的錯誤

### Transfer-Encoding: chunked + Content-Length

上面的範例，在 `Transfer-Encoding: chunked` 的情況，NodeJS HTTP 模組預設都不會傳送 `Content-Length` 的 Response Header

所以這兩個 header 是可以一起傳送的嗎？我們調整上面的程式碼

```ts
if (req.url === "/case3") {
    const contentLength = Buffer.byteLength(firstline) + Buffer.byteLength(secondline) + Buffer.byteLength(thirdline);
    res.setHeader("Content-Length", contentLength);
    res.setHeader("Transfer-Encoding", "chunked");
    res.write(firstline);
    res.write(secondline);
    res.end(thirdline);
    return;
}
```

用瀏覽器打開 http://localhost:5000/case3 ，一切相安無事

![transfer-encoding-with-content-length](../static/img/transfer-encoding-with-content-length.jpg)

如果故意傳送大於資料長度的 `Content-Length` 呢？

```ts
if (req.url === "/case3") {
    res.setHeader("Content-Length", 100);
    res.setHeader("Transfer-Encoding", "chunked");
    res.write(firstline);
    res.write(secondline);
    res.end(thirdline);
    return;
}
```

可以看到瀏覽器是相安無事

![transfer-encoding-with-bigger-content-length](../static/img/transfer-encoding-with-bigger-content-length.jpg)

為什麼會這樣呢？我們來看看 RFC 9112 的定義

https://datatracker.ietf.org/doc/html/rfc9112#section-6.1-15
```
A server MAY reject a request that contains both Content-Length and Transfer-Encoding or process such a request in accordance with the Transfer-Encoding alone.
```

https://datatracker.ietf.org/doc/html/rfc9112#section-6.2-2
```
A sender MUST NOT send a Content-Length header field in any message that contains a Transfer-Encoding header field.
```

https://datatracker.ietf.org/doc/html/rfc9112#section-6.3-2.3
```
If a message is received with both a Transfer-Encoding and a Content-Length header field, the Transfer-Encoding overrides the Content-Length.
```

簡單來說，不允許兩個 header 一起設置，但當兩個 header 同時設置時，接收方可選擇回傳錯誤訊息，或是把 `Content-Length` 捨棄，咱們的 Chrome 瀏覽器選擇了後者．

### 使用 curl 觀察 raw HTTP Response Body

由於瀏覽器已經把 Response Body 都整理好，才呈現給使用者看，但我們要怎麼確定傳輸的格式真的是

```
<byteLengthInHex>CRLF
<Data>CRLF
<byteLengthInHex>CRLF
<Data>CRLF
<byteLengthInHex>CRLF
<Data>CRLF
0CRLFCRLF
```

我們打開終端機，輸入 `curl --raw http://localhost:5000/case2`，可以看到結果如下

```
c
firstline~~~
d
secondline~~~
c
thirdline~~~
0

```

- c = 十進位的 12，等於 `firstline~~~` 的 byte length
- d = 十進位的 13，等於 `secondline~~~` 的 byte length
- c = 十進位的 12，等於 `thirdline~~~` 的 byte length
- 結尾也符合 `0\r\n\r\n`

其中 `--raw` 參數的[定義](https://everything.curl.dev/usingcurl/downloads/raw.html)如下

```
When --raw is used, it disables all internal HTTP decoding of content or transfer encodings and instead makes curl passed on unaltered, raw, data.
```

### Transfer-Encoding: chunked 搭配 Content-Type: application/json

chunked 的資料除了 `text/plain`，也可以是其他類型的，我們使用 `application/json` 來當範例

```ts
// chunked with application/json
if (req.url === "/case4") {
    const chunkSplitIndex = 20;
    const jsonString = JSON.stringify({
        id: 123,
        name: "456",
        age: 18,
        email: "example@gmail.com"
    });
    res.setHeader("Content-Type", "application/json");
    // res.write 會自動幫忙處理 transfer-encoding：chunked 的格式
    res.write(jsonString.slice(0, chunkSplitIndex));
    res.end(jsonString.slice(chunkSplitIndex));
    return;
}
```

用瀏覽器打開 http://localhost:5000/case4

![transfer-encoding-with-json](../static/img/transfer-encoding-with-json.jpg)

終端機輸入 `curl --raw http://localhost:5000/case4`

```
14
{"id":123,"name":"45
28
6","age":18,"email":"example@gmail.com"}
0

```

- 14 = 十進位的 20，等於 `{"id":123,"name":"45` 的 byte length
- 28 = 十進位的 40，等於 `6","age":18,"email":"example@gmail.com"}` 的 byte length
- 結尾也符合 `0\r\n\r\n`

###

當資料量很大時，雖然資料是分塊傳輸，但瀏覽器會等到所有資料都收到，才顯示給前端，在使用者體驗上就比較差

我們使用 `setTimeout` 來模擬 Server 處理時間

```ts
// chunked with slow data transfer
if (req.url === "/case5") {
    let index = 0;
    const maxIndex = 5;
    const interval = setInterval(() => {
        res.write(index.toString());
        index += 1;
        if (index === maxIndex) {
            clearInterval(interval);
            res.end();
        }
    }, 1000);
    return;
}
```

### 跟 Server Sent Events 的差別

<!-- ### request smuggling -->

<!-- ### response splitting -->

<!-- todo-yusheng -->
<!-- https://chatgpt.com/c/6822ac29-948c-8012-bffc-fcab2b9264d3 -->
<!-- https://claude.ai/chat/9ec60e67-a1eb-43af-9460-b9fd697931d4 -->
<!-- https://chatgpt.com/c/6823085c-ff78-8012-ad51-5900e35d5516 -->

### ReadableStream

### 參考資料

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Transfer-Encoding
- https://datatracker.ietf.org/doc/html/rfc9112#name-chunked-transfer-coding
- https://httpwg.org/specs/rfc9112.html#field.transfer-encoding
- https://everything.curl.dev/usingcurl/downloads/raw.html