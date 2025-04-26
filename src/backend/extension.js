const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "vsnudge" is now active!');


	const disposableFrontend = vscode.commands.registerCommand('vsnudge.openFrontend', function () {
		// Create and show a new webview panel
		const panel = vscode.window.createWebviewPanel(
			'frontendView', // Identifies the type of the webview
			'VSNudge Frontend', // Title of the panel
			vscode.ViewColumn.One, // Editor column to show the new webview panel in
			{
				enableScripts: true, // Allow JavaScript in the webview
			}
		);

		// Path to your frontend index.html
		const htmlPath = path.join(context.extensionPath, 'src', 'frontend', 'index.html');
		const htmlContent = fs.readFileSync(htmlPath, 'utf8');

		// Set the webview's HTML content
		panel.webview.html = htmlContent;
	});

	// Add both commands to subscriptions
	context.subscriptions.push(disposableFrontend);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
