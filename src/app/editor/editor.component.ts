import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../_services/posts.service';
import { Post } from '../_models/post';
import * as KeyCodes from 'keycode-js';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild('editor') editor: ElementRef;
  @ViewChild('toolbar') toolbar: ElementRef;

  editedPost: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService) { }

  ngOnInit() {
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

  private loadPostForEdit(postId: number) {
    this.postsService.getById(postId).subscribe(
      post => {
        this.editedPost = post;
        this.editorDocument.body.innerHTML = post.html;
        // TODO: set title of document
      },
      error => { 
        alert(error); // TODO: call this through alert component
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

  private navigationShortcuts(keyCode: number) {
    // Alt + Shift shortcuts
    switch (keyCode) {
      // focus toolbar
      case KeyCodes.KEY_T:
        this.toolbarElement.focus();
        break;
      // focus editor
      case KeyCodes.KEY_E:
        this.focusEditor();
        break;
    }

    event.preventDefault();
  }

  private toolbarNavigation(event: KeyboardEvent) {
    let sibling: any;

    switch (event.keyCode) {
      // navigate to next control
      case KeyCodes.KEY_RIGHT:
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
      case KeyCodes.KEY_LEFT:
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
      case KeyCodes.KEY_TAB:
        if (!event.shiftKey) {
          this.focusEditor();
          event.preventDefault();
        }
        break;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.altKey && event.shiftKey) {
      this.navigationShortcuts(event.keyCode);
    } else if (this.toolbarElement.querySelector(':focus')) {
      this.toolbarNavigation(event);
    }
  }

  private onEditorKeyDown(event: KeyboardEvent) {
    if (event.altKey && event.shiftKey && event.keyCode === KeyCodes.KEY_T) {
      const forFocus: HTMLElement = document.querySelector('.editor-btns button');
      if (forFocus) {
        forFocus.focus();
      }

      event.preventDefault();
    }
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
      'title': 'test title',
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
    this.editedPost.title = 'test title';
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

    document.querySelector('#btnSaveAndClose').setAttribute('disabled', '');
    document.querySelector('#btnSave').setAttribute('disabled', '');
  }

  deletePost() {
    if (confirm("Are you sure to delete this post?")) {
      this.postsService.delete(this.editedPost.id)
        .subscribe(() => this.router.navigate(['/home']));
    }
  }

}
