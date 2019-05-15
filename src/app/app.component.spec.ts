import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClient
      ],
      declarations: [
        AppComponent, NavigationComponent, LoaderComponent, ConfirmModalComponent, DropdownMenuComponent, MenuItemComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dp-client-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('dp-client-app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to dp-client-app!');
  });
});
