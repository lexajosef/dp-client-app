import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';

import { DropdownMenuComponent } from './dropdown-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItemComponent } from '../menu-item/menu-item.component';

fdescribe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ DropdownMenuComponent, MenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ARIA attribute aria-label', () => {
    let btn = fixture.debugElement.nativeElement.querySelector('.dropdown-btn-container button');

    fixture.whenRenderingDone().then(() => {
      expect(btn.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('should have ARIA attribute aria-haspopup', () => {
    let btn = fixture.debugElement.nativeElement.querySelector('.dropdown-btn-container button');

    fixture.whenRenderingDone().then(() => {
      expect(btn.getAttribute('aria-haspopup')).toBeTruthy();
    });
  });

  it('should have ARIA attribute aria-expanded', () => {
    let btn = fixture.debugElement.nativeElement.querySelector('.dropdown-btn-container button');

    fixture.whenRenderingDone().then(() => {
      expect(btn.getAttribute('aria-expanded')).toBeTruthy(); 
    });
  });

  it('should dynamically change button aria-expanded to true', () => {
    let btn = fixture.debugElement.nativeElement.querySelector('.dropdown-btn-container button');

    expect(btn.getAttribute('aria-expanded')).toBe('false');
    component.isMenuOpen = true;
    fixture.detectChanges();
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have no a11y violations', () => {
    let context = { include: ['.dropdown-btn-container'] };

    axe.run(context, (err, results) => {
      if (err) console.log(err);
      expect(results.violations.length).toBe(0);
    });
  });
});
