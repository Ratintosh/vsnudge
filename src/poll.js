const vscode = require('vscode');

async function getCurrentFileText() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null; // No open editor
    }

    const document = editor.document;
    const text = document.getText();
    return text;
}

function startPolling() {
    setInterval(async () => {
        const text = await getCurrentFileText();
        console.log('Current file text:', text);
        vscode.window.showInformationMessage('Current file text:', text);
    }, 10000); // 5000ms = 5 seconds
}

module.exports = {
    startPolling
};
