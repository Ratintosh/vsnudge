const vscode = require('vscode');

function getClippyHtml(context, webview) {
  const clippyUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'clippy.png'));

  return `
    <!DOCTYPE html>
    <html lang="en">
    <body style="background: transparent; margin:0; overflow:hidden;">
      <img src="${clippyUri}" style="width:150px; height:auto; cursor:pointer;" onclick="alert('Hi! Need help?')" />
    </body>
    </html>
  `;
}

module.exports = getClippyHtml;
