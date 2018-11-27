import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistsAvailabilityComponent } from './therapists-availability.component';

describe('TherapistsAvailabilityComponent', () => {
  let component: TherapistsAvailabilityComponent;
  let fixture: ComponentFixture<TherapistsAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapistsAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistsAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
