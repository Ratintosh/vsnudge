const vscode = require('vscode');
const ClippyPanel = require('./webview/clippyPanel');
const { startPolling } = require('./poll.js');

function activate(context) {
  let disposable = vscode.commands.registerCommand('vsnudge.showClippy', () => {
    ClippyPanel.show(context);
  });

  context.subscriptions.push(disposable);
  startPolling();

}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};