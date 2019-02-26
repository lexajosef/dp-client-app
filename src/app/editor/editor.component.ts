import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') editor: ElementRef;

  constructor() { }

  ngOnInit() {
    this.editorDocument.designMode = 'on';
    this.addStylesToEditor();
  }

  get editorDocument(): any { return (<any> this.editor.nativeElement).contentDocument }

  private addStylesToEditor() {
    let linkRobotoFont: HTMLLinkElement = this.editorDocument.createElement('link');
    linkRobotoFont.rel = 'stylesheet';
    linkRobotoFont.href = 'https://fonts.googleapis.com/css?family=Roboto:400,700';

    let editorStyle: HTMLElement = this.editorDocument.createElement('style');
    editorStyle.appendChild(document.createTextNode(`
      body {
        font-family: Roboto, sans-serif;
      }
      
      ::-webkit-scrollbar {
        width: 10px;
        cursor: pointer !important;
      }
      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      ::-webkit-scrollbar-thumb {
        background: #AAA;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #888;
      }`
    ));

    this.editorDocument.head.appendChild(linkRobotoFont);
    this.editorDocument.head.appendChild(editorStyle);
  }

  private focusEditor(): void {
    this.editorDocument.body.focus();
  }

  doEditorCommand(command: any, arg: any = null) {
    let success: boolean;

    console.log(`execution command ${command} with arg = ${arg}`);
    try {
      success = this.editorDocument.execCommand(command, false, arg);
    } catch(error) {
      alert(error);
    }

    if (!success) {
      const supported = document.queryCommandSupported(command);
      const msg = supported ? 'Unknown error. Is anything selected?' : 
          'Command is not supported by your browser.';
      alert(msg);
    }

    this.focusEditor();
  }

}
