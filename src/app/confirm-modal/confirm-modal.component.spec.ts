import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';

import { ConfirmModalComponent } from './confirm-modal.component';

fdescribe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no a11y violations', () => {
    let context = { include: ['div.dialog'] };

    axe.run(context, (err, results) => {
      if (err) console.log(err);
      expect(results.violations.length).toBe(0);
    });
  });
});
