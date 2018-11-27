import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotificationSetupComponent } from './alert-notification-setup.component';

describe('AlertNotificationSetupComponent', () => {
  let component: AlertNotificationSetupComponent;
  let fixture: ComponentFixture<AlertNotificationSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertNotificationSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNotificationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
