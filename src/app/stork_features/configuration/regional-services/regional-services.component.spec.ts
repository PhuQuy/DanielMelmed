import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalServicesComponent } from './regional-services.component';

describe('RegionalServicesComponent', () => {
  let component: RegionalServicesComponent;
  let fixture: ComponentFixture<RegionalServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
