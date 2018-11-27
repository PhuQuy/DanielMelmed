import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookMassageSidebarComponent } from './bookmassage-sidebar.component';


describe('ConfigurationSidebarComponent', () => {
  let component: BookMassageSidebarComponent;
  let fixture: ComponentFixture<BookMassageSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookMassageSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMassageSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
