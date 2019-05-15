import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';

import { EditorComponent } from './editor.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ARIA attributes', () => {
    let editor = fixture.debugElement.nativeElement.querySelector('#toolbar');

    fixture.whenRenderingDone().then(() => {
      expect(editor.getAttribute('role')).toBe('toolbar');
      expect(editor.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('should have ARIA attributes', () => {
    let btns = fixture.debugElement.nativeElement.querySelectorAll('#toolbar button.icon-button');
    
    fixture.whenRenderingDone().then(() => {
      btns.forEach(element => {
        expect(element.getAttribute('aria-label')).toBeTruthy();
      });
    });
  });

  it('should have no a11y violations on editor toolbar', () => {
    let context = { include: ['#toolbar'] };

    axe.run(context, (err, results) => {
      if (err) console.log(err);
      expect(results.violations.length).toBe(0);
    });
  });
  
});
