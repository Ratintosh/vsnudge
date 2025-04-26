const vscode = require('vscode');

function getClippyHtml(context, webview) {
  const clippyUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'clippy.png'));

  return `
    <!DOCTYPE html>
    <html lang="en">
    <body style="background: transparent; margin:0; overflow:hidden;">
      <img src="https://static.wikia.nocookie.net/the-scrappy/images/c/cb/Clippy.png" style="width:150px; height:auto; cursor:pointer;" onclick="alert('Hi! Need help?')" />
      <p id="speech-bubble"></p>
      <input id="userInput" type="text" placeholder="Type a command..." style="margin-top: 10px; width: 140px;" />
      <button onclick="sendMessage()" style="margin-top: 5px;">Submit</button>
      <script>
    const vscode = acquireVsCodeApi(); // already available
    function sendMessage() {
          const input = document.getElementById('userInput').value;
          vscode.postMessage({
            command: 'userInput',
            text: input
          });
        }
    window.addEventListener('message', event => {
        const message = event.data;
        console.log("Message received:", message);
        if (message.type === 'updateText') {
            // Instead of wiping out the whole page, just update an element
            const speechBubble = document.getElementById('speech-bubble');
            if (speechBubble) {
                speechBubble.textContent = message.value;
            }
        }
    });
</script>

      </body>
    </html>
  `;
}

module.exports = getClippyHtml;
