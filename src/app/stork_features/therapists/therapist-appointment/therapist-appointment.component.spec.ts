import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistAppointmentComponent } from './therapist-appointment.component';

describe('TherapistAppointmentComponent', () => {
  let component: TherapistAppointmentComponent;
  let fixture: ComponentFixture<TherapistAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapistAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
