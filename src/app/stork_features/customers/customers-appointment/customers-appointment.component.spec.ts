import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersAppointmentComponent } from './customers-appointment.component';

describe('CustomersAppointmentComponent', () => {
  let component: CustomersAppointmentComponent;
  let fixture: ComponentFixture<CustomersAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
