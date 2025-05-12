let socket;
function connectWebSocket() {
    socket = new WebSocket('ws://localhost:8080');

    socket.onopen = function () {
        console.log("WebSocket接続完了");
        // 接続完了時に送信ボタンを有効化
        document.getElementById("sendButton").disabled = false;
    };

    socket.onmessage = function (event) {
        console.log("メッセージを受け取りました: ", event.data);
    };

    socket.onerror = function (error) {
        console.error("WebSocketエラー: ", error);
    };

    socket.onclose = function (event) {
        console.log("WebSocket接続が閉じられました", event);
        // 切断時に送信ボタンを無効化
        document.getElementById("sendButton").disabled = true;
    };
}

function sendMessage() {

    // 名前をinput typeから取得
    const name = document.getElementById("messageInput").value;
    // StreamIdを生成
    const streamid = generateRandomString();

    // 名前とidを1つのメッセージ変数 にする
    let message = streamid + ',' + name;


    if (socket && socket.readyState === WebSocket.OPEN) {

        // メッセージ送信
        socket.send(message);
        console.log("メッセージ送信: ", message);

    } else {
        console.error("WebSocketが接続されていません");
    }

    const encodedMessage = encodeURIComponent(streamid);
    window.open(`http://localhost/?StreamerId=${encodedMessage}`, '_blank');
}

// ランダムな文字列生成
function generateRandomString(length = 12) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
