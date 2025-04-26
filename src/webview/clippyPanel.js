const vscode = require('vscode');
const getClippyHtml = require('./getClippyHtml');
const { sendToAI } = require('../groq.js');

let panel;

function show(context) {
  if (panel) {
    panel.reveal();
  } else {
    panel = vscode.window.createWebviewPanel(
      'clippy',
      'Clippy Helper',
      vscode.ViewColumn.Two,
      {
        enableScripts: true,
        localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')]
      }
    );

    panel.webview.html = getClippyHtml(context, panel.webview);
    //for testing

    panel.onDidDispose(() => {
      panel = undefined;
    }, null, context.subscriptions);
    panel.webview.onDidReceiveMessage(message => {
      if (message.command === 'userInput') {
        console.log('User typed:', message.text);
        sendToAI(message.text).then((response) => {
          console.log("AI response:", response);
          vscode.window.showInformationMessage(response);
          panel.webview.postMessage({ type: 'updateText', value: response });
        })
      }
    });
    
    
  }
}

module.exports = { show };
