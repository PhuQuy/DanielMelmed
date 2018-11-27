import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersSetupComponent } from './customers-setup.component';

describe('CustomersSetupComponent', () => {
  let component: CustomersSetupComponent;
  let fixture: ComponentFixture<CustomersSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
