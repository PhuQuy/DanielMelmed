import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentLogComponent } from './appointment-log.component';

describe('AppointmentLogComponent', () => {
  let component: AppointmentLogComponent;
  let fixture: ComponentFixture<AppointmentLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
