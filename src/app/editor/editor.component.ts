import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as KEYCODES from 'keycode-js';

import { ConfirmModalService } from '../_services/confirm-modal.service';
import { PostsService } from '../_services/posts.service';
import { Post } from '../_models/post';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements AfterViewChecked {

  @ViewChild('btnSaveAndClose') btnSaveAndClose: ElementRef;
  @ViewChild('btnSave') btnSave: ElementRef;
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('toolbar') toolbar: ElementRef;
  @ViewChild('deleteBtn') deleteBtn: ElementRef;

  editedPost: Post;
  postTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private confirmService: ConfirmModalService) { }

  ngAfterViewChecked() {
    const params = this.route.snapshot.params;

    this.editorDocument.designMode = 'on';
    this.addStylesToEditor();
    this.focusEditor();
    this.editorKeyboardOperability();

    if (params.postId) {
      this.loadPostForEdit(params.postId);
    }
  }

  get editorDocument(): any { return (<any> this.editor.nativeElement).contentDocument }
  get toolbarElement(): HTMLElement { return this.toolbar.nativeElement }
  get deleteBtnElement(): any { return this.deleteBtn.nativeElement }
  get btnSaveAndCloseElement(): any { return this.btnSaveAndClose.nativeElement }
  get btnSaveElement(): any { return this.btnSave.nativeElement }

  private loadPostForEdit(postId: number) {
    this.postsService.getById(postId).subscribe(
      post => {
        this.editedPost = post;
        this.postTitle = post.title;
        this.editorDocument.body.innerHTML = post.html;
        // TODO: set title of document
      },
      error => { 
        alert(error);
        this.router.navigate(['/home']);
      }
    );
  }

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

  private editorShortcuts(event: KeyboardEvent) {
    switch (event.keyCode) {
      // align paragraph left
      case KEYCODES.KEY_L:
        this.doEditorCommand('justifyLeft');
        event.preventDefault();
        break;
      // align paragraph right
      case KEYCODES.KEY_R:
        this.doEditorCommand('justifyRight');
        event.preventDefault();
        break;
      // align paragraph center
      case KEYCODES.KEY_E:
        this.doEditorCommand('justifyCenter');
        event.preventDefault();
        break;
      // align paragraph justify
      case KEYCODES.KEY_J:
        this.doEditorCommand('justifyFull');
        event.preventDefault();
        break;
    }
  }

  private navigationShortcuts(keyCode: number) {
    // Alt + Shift shortcuts
    switch (keyCode) {
      // focus toolbar
      case KEYCODES.KEY_T:
        this.toolbarElement.focus();
        break;
      // focus editor
      case KEYCODES.KEY_E:
        this.focusEditor();
        break;
    }

    event.preventDefault();
  }

  private toolbarNavigation(event: KeyboardEvent) {
    let sibling: any;

    switch (event.keyCode) {
      // navigate to next control
      case KEYCODES.KEY_RIGHT:
        sibling = document.activeElement.nextElementSibling;
        if (sibling) {
          sibling.focus();
        } else if (document.activeElement.parentElement.nextElementSibling) {
          sibling = document.activeElement.parentElement.nextElementSibling.firstChild;
          if (sibling) {
            sibling.focus();
          }
        }
        event.preventDefault();
        break;
      // navigate to previous control
      case KEYCODES.KEY_LEFT:
        sibling = document.activeElement.previousSibling;
        if (sibling) {
          sibling.focus();
        } else if (document.activeElement.parentElement.previousElementSibling) {
          sibling = document.activeElement.parentElement.previousElementSibling.lastChild;
          if (sibling) {
            sibling.focus();
          }
        }
        event.preventDefault();
        break;
      // tab key stuff
      case KEYCODES.KEY_TAB:
        if (!event.shiftKey) {
          this.focusEditor();
          event.preventDefault();
        }
        break;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey) {
      this.editorShortcuts(event);
    } else if (event.altKey && event.shiftKey) {
      this.navigationShortcuts(event.keyCode);
    } else if (this.toolbarElement.querySelector(':focus')) {
      this.toolbarNavigation(event);
    }
  }

  private setDisableSaveBtns(disabled: boolean) {
    if (disabled) {
      this.btnSaveAndCloseElement.setAttribute('disabled', '');
      this.btnSaveElement.setAttribute('disabled', '');
    } else {
      this.btnSaveAndCloseElement.removeAttribute('disabled');
      this.btnSaveElement.removeAttribute('disabled');
    }
  }

  postTitleChange() {
    this.setDisableSaveBtns(false);
  }

  private onEditorKeyDown(event: KeyboardEvent) {
    if (event.altKey && event.shiftKey && event.keyCode === KEYCODES.KEY_T) {
      const forFocus: HTMLElement = document.querySelector('.editor-btns button');
      if (forFocus) {
        forFocus.focus();
      }

      event.preventDefault();
    }

    if (event.ctrlKey && event.shiftKey) {
      let iframeDocument = (<any>document.querySelector('#richTextEditor')).contentDocument;

      switch (event.keyCode) {
        // align paragraph left
        case KEYCODES.KEY_L:
          iframeDocument.execCommand('justifyLeft', false, null);
          event.preventDefault();
          break;
        // align paragraph right
        case KEYCODES.KEY_R:
        iframeDocument.execCommand('justifyRight', false, null);
          event.preventDefault();
          break;
        // align paragraph center
        case KEYCODES.KEY_E:
          iframeDocument.execCommand('justifyCenter', false, null);
          event.preventDefault();
          break;
        // align paragraph justify
        case KEYCODES.KEY_J:
          iframeDocument.execCommand('justifyFull', false, null);
          event.preventDefault();
          break;
      }
    }

    // here have to use document.querySelector, because its called from iframe
    document.querySelector('#btnSaveAndClose').removeAttribute('disabled');
    document.querySelector('#btnSave').removeAttribute('disabled');
  }

  private editorKeyboardOperability() {
    this.editorDocument.addEventListener('keydown', this.onEditorKeyDown);
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

    if (command === 'undo' || command === 'redo') {
      return;
    }
    
    this.focusEditor();
  }

  createLinkCommand() {
    const url: string = prompt('Enter a link URL', 'https://');
    this.doEditorCommand('createLink', url);
  }

  private createPost(closeAfterCreate: boolean) {
    this.postsService.create({
      'title': this.postTitle,
      'html': this.editorDocument.body.innerHTML
    })
      .subscribe(createdPost => {
        this.editedPost = createdPost;
        if (closeAfterCreate) {
          this.router.navigate(['/home']);
        }
      });
  }

  private updatePost(closeAfterUpdate: boolean) {
    this.editedPost.title = this.postTitle;
    this.editedPost.html = this.editorDocument.body.innerHTML;

    this.postsService.update(this.editedPost)
      .subscribe(updatedPost => {
        this.editedPost = updatedPost;
        if (closeAfterUpdate) {
          this.router.navigate(['/home']);
        }
      });
  }

  savePost(closeAfterSave: boolean) {
    if (!this.editedPost) {
      this.createPost(closeAfterSave);
    } else {
      this.updatePost(closeAfterSave);
    }

    this.setDisableSaveBtns(true);
  }

  deletePost() {
    this.confirmService.activate('Delete post?', 'Are you sure you want to delete this post? This action cannot be undone!', 'Delete', 'Cancel')
      .then(confirmed => {
        if (confirmed) {
          this.postsService.delete(this.editedPost.id)
            .subscribe(() => this.router.navigate(['/home']));
        } else {
          // timeout add focus at the end of the execution queue
          setTimeout(() => { this.deleteBtnElement.focus() });
        }
      });
  }

  canClosePost(): Promise<boolean> {
    return this.confirmService.activate('Leave editor?', 'Are you sure you want to leave from editing of post? Your changes will be discarded!', 'Leave', 'Cancel');
  }

}
