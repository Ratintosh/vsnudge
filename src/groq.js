const Groq = require('groq-sdk');
const vscode = require('vscode');
client = new Groq({
    apiKey: "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"
});

async function sendToAI(text, code){
    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [
              { role: 'system', content: 'You are an expert programmer who is assisting with code development. You review code and provide suggestions. You know a variety of languages! You should expect the user to upload their code, and then review it and provide suggestions. If the user has any questions, answer them accurately. The code is: ' + code },
              { role: 'user', content: text }],
            model: 'llama3-8b-8192',
        });
        const aiResponse = chatCompletion.choices[0].message.content;
        
        //vscode.window.showInformationMessage("Your message here");
        //vscode.window.showInformationMessage(aiResponse);
        return aiResponse;

  } catch (error) {
    console.error('Error talking to AI:', error);
    vscode.window.showErrorMessage('Failed to talk to AI.');
  }
}

async function sendCodeToAI(text){
    try {
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: text }],
            model: 'llama3-8b-8192',
        });
        const aiResponse = chatCompletion.choices[0].message.content;
        
        //vscode.window.showInformationMessage("Your message here");
        //vscode.window.showInformationMessage(aiResponse);
        return aiResponse;

  } catch (error) {
    console.error('Error talking to AI:', error);
    vscode.window.showErrorMessage('Failed to talk to AI.');
  }
}

module.exports = {
  sendToAI
};