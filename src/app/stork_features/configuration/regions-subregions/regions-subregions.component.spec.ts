import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsSubregionsComponent } from './regions-subregions.component';

describe('RegionsSubregionsComponent', () => {
  let component: RegionsSubregionsComponent;
  let fixture: ComponentFixture<RegionsSubregionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionsSubregionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsSubregionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
