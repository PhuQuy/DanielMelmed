import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMassageComponent } from './book-massage.component';

describe('BookMassageComponent', () => {
  let component: BookMassageComponent;
  let fixture: ComponentFixture<BookMassageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMassageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
