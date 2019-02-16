import { TestBed } from '@angular/core/testing';

import { NavigationUIService } from './navigation-ui.service';

describe('NavigationUIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavigationUIService = TestBed.get(NavigationUIService);
    expect(service).toBeTruthy();
  });
});
