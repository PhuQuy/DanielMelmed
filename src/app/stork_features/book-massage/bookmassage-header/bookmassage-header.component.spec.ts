import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookMassageHeaderComponent } from './bookmassage-header.component';


describe('ConfigurationHeaderComponent', () => {
  let component: BookMassageHeaderComponent;
  let fixture: ComponentFixture<BookMassageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMassageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMassageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
