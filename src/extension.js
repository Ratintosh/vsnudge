const vscode = require('vscode');
const ClippyPanel = require('./webview/clippyPanel');

function activate(context) {
  let disposable = vscode.commands.registerCommand('vsnudge.showClippy', () => {
    ClippyPanel.show(context);
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};