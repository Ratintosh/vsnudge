const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function getClippyHtml(context, webview) {
  const clippyUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'clippy.png'));

  return` 
    <!DOCTYPE html>
    <html lang="en">
    <body style="background: transparent; margin:0; overflow:hidden;">
      <img src="https://www.clipartmax.com/middle/m2i8G6d3N4A0A0N4_clippit-microsoft-clippy/" style="width:150px; height:auto; cursor:pointer;" onclick="alert('Hi! Need help?')" />

      <input id="userInput" type="text" placeholder="Ask Clippy..." style="margin-top: 10px; width: 140px; cursor:pointer;" />
    <button onclick="sendMessage()" style="margin-top: 5px;" >Submit</button>
    <p id="response"></p>
    <script>
      const vscode = acquireVsCodeApi();
      function sendMessage(){
        const input = document.getElementById('userInput').value;
        vscode.postMessage({command: 'userInput', text: input});
      }

      window.addEventListener('message', event => {
        const message = event.data;
        console.log("Message received:", message);
        if (message.type === 'updateText'){
          const speechBubble = document.getElementById('response');
          if(speechBubble){
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
