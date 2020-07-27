import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDesktopNgComponent } from './angular-desktop-ng.component';

describe('AngularDesktopNgComponent', () => {
  let component: AngularDesktopNgComponent;
  let fixture: ComponentFixture<AngularDesktopNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularDesktopNgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDesktopNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
