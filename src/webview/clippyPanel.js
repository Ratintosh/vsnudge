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

    panel.onDidDispose(() => {
      panel = undefined;
    }, null, context.subscriptions);

    panel.webview.onDidReceiveMessage(async (message) => {
      if (message.command === 'userInput') {
        console.log('User typed:', message.text);

        const editor = vscode.window.activeTextEditor;

        if (!editor) {
          vscode.window.showErrorMessage("No active editor found. Please open a file!");
          return;
        }

        try {
          if (editor.document.isDirty) {
            await editor.document.save();
          }

          let code = editor.document.getText();

          // ❗ If the code is still suspiciously empty, try reloading document
          if (!code || code.trim().length === 0) {
            await new Promise(resolve => setTimeout(resolve, 100)); // wait a tiny bit
            code = editor.document.getText();
          }

          if (!code || code.trim().length === 0) {
            code = "No code provided.";
          }

          const fullPrompt = `Here is the user's question: "${message.text}".\n\nHere is the current file contents:\n\n${code}`;

          vscode.window.showInformationMessage("Sending to AI...");

          const response = await sendToAI(fullPrompt);

          console.log("AI response:", response);

          panel.webview.postMessage({ type: 'updateText', value: response });

        } catch (err) {
          console.error("Error while handling userInput:", err);
          vscode.window.showErrorMessage("Failed to send code to AI.");
        }
      }
    });
  }
}

module.exports = { show };
