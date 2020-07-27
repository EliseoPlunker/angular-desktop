import { TestBed } from '@angular/core/testing';

import { AngularDesktopNgService } from './angular-desktop-ng.service';

describe('AngularDesktopNgService', () => {
  let service: AngularDesktopNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularDesktopNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
