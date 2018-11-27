import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsAppointmentStatusComponent } from './icons-appointment-status.component';

describe('IconsAppointmentStatusComponent', () => {
  let component: IconsAppointmentStatusComponent;
  let fixture: ComponentFixture<IconsAppointmentStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconsAppointmentStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsAppointmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
