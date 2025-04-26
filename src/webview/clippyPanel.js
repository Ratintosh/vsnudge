const vscode = require('vscode');
const getClippyHtml = require('./getClippyHtml');

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

    panel.onDidDispose(() => {
      panel = undefined;
    }, null, context.subscriptions);
  }
}

module.exports = { show };
