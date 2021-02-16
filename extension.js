

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");

	function activate(context) {

		var command = vscode.commands.registerCommand('author-tag.authortag', insert);

		context.subscriptions.push(command);
	}

	function insertText(name, author, file) {
		let date = new Date();
		let dateString = date.toLocaleString();

		var string = "<!---------------------------\nName: " + name + "\nFile: " + file + "\n-----------------------------\nAuthor: " + author + "\nData:   " + dateString + "\n---------------------------->";

		var editor = vscode.window.activeTextEditor;
		editor.edit(
			edit => editor.selections.forEach(
				selection => {
					edit.delete(selection);
					edit.insert(selection.start, string);
				}
			)
		);
	}

	async function insert() {
	
		var name = await vscode.window.showInputBox( { placeHolder: 'Project name' } );
		if (!name) {
			return;
		}

		var author = await vscode.window.showInputBox( { placeHolder: 'Author name' } );
		if (!author) {
			return;
		}

		var file = await vscode.window.showInputBox( { placeHolder: 'File name' } );
		if (!file) {
			return;
		}
	
		insertText(name, author, file);
	}

exports.activate = activate;