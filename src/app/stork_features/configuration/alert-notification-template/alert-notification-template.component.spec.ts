import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNotificationTemplateComponent } from './alert-notification-template.component';

describe('AlertNotificationTemplateComponent', () => {
  let component: AlertNotificationTemplateComponent;
  let fixture: ComponentFixture<AlertNotificationTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertNotificationTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNotificationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
