import { exec } from 'child_process';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  activateFormatter(context, 'Plone: ZCML Language', registerZCMLFormatter);
  activateFormatter(context, 'Plone: TAL Language', registerTALFormatter);
}

function activateFormatter(context: vscode.ExtensionContext, channelName:string, formatterFunction: any) {
  const outputChannel = vscode.window.createOutputChannel(channelName);
  let disposables: any[] = [];
  vscode.workspace.onDidChangeConfiguration((e) => {
    if (!e.affectsConfiguration('zcmlLanguage')) {
      return;
    }
    disposables.forEach((d) => d.dispose());
    disposables = formatterFunction(outputChannel);
  });
  disposables = formatterFunction(outputChannel);
}

const getZPrettyPath = () => {
  const config = vscode.workspace.getConfiguration('zcmlLanguage');
  return config.get('zprettypath', '');
};

var getZCMLZPrettyOptions = () => {
  const config = vscode.workspace.getConfiguration('zcmlLanguage');
  return config.get('zprettyoptions', '');
};
var getTALZPrettyOptions = () => {
  const config = vscode.workspace.getConfiguration('talLanguage');
  return config.get('zprettyoptions', '');
};

var registerZCMLFormatter = (outputChannel: vscode.OutputChannel) => {
  return registerFormatter(outputChannel, 'zcml', getZCMLZPrettyOptions);
};

var registerTALFormatter = (outputChannel: vscode.OutputChannel) => {
  return registerFormatter(outputChannel, 'tal', getTALZPrettyOptions);
};


const registerFormatter = (
  outputChannel: vscode.OutputChannel,
  language: string,
  options_function: any,
): readonly vscode.Disposable[] => {
    return [{
      'disabled': false,
      'languages': [language],
      'command': getZPrettyPath(),
      'options': options_function(),
  }]
    .map((formatter) => {
      if (formatter.disabled) {return;};

      return vscode.languages.registerDocumentFormattingEditProvider(formatter.languages, {
        provideDocumentFormattingEdits(document, options) {
          const command = formatter.command + " -i " + formatter.options;
          outputChannel.appendLine(command);
          const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
          const backupFolder = vscode.workspace.workspaceFolders?.[0];
          const cwd = workspaceFolder?.uri?.fsPath || backupFolder?.uri.fsPath;

          return new Promise<vscode.TextEdit[]>((resolve, reject) => {
            outputChannel.appendLine(`Starting formatter: ${command}`);
            const originalDocumentText = document.getText();

            const process = exec(command, { cwd }, (error, stdout, stderr) => {
              if (error) {
                outputChannel.appendLine(`Formatter failed: ${command}\nStderr:\n${stderr}`);
                reject(error);
              }

              if (originalDocumentText.length > 0 && stdout.length === 0) {
                outputChannel.appendLine(`Formatter returned nothing - not applying changes.`);
                resolve([]);
              }

              const documentRange = new vscode.Range(
                document.lineAt(0).range.start,
                document.lineAt(document.lineCount - 1).rangeIncludingLineBreak.end,
              );

              outputChannel.appendLine(`Finished running formatter: ${command}`);
              if (stderr.length > 0)
                {outputChannel.appendLine(`Possible issues ocurred:\n${stderr}`);}

              resolve([new vscode.TextEdit(documentRange, stdout)]);
            });

            process.stdin?.write(originalDocumentText);
            process.stdin?.end();
          });
        },
      });
    })
    .filter((v) => v !== null) as vscode.Disposable[];
};


// this method is called when your extension is deactivated
export function deactivate() {
  const outputChannel1 = vscode.window.createOutputChannel('Plone: ZCML Language');
  outputChannel1.appendLine('Extension disabled');
  const outputChannel2 = vscode.window.createOutputChannel('Plone: TAL Language');
  outputChannel2.appendLine('Extension disabled');

}
