import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistSetupComponent } from './therapist-setup.component';

describe('TherapistSetupComponent', () => {
  let component: TherapistSetupComponent;
  let fixture: ComponentFixture<TherapistSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapistSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
