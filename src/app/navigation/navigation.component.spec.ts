import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';

import { NavigationComponent } from './navigation.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';

fdescribe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        HttpClientTestingModule
      ],
      declarations: [ 
        NavigationComponent, 
        DropdownMenuComponent, 
        MenuItemComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no a11y violations', () => {
    let context = { include: ['header'] };

    axe.run(context, (err, results) => {
      if (err) console.log(err);
      expect(results.violations.length).toBe(0);
    });
  });
});
