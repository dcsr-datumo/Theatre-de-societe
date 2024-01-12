import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuteurspageComponent } from './auteurspage.component';

describe('AuteurspageComponent', () => {
  let component: AuteurspageComponent;
  let fixture: ComponentFixture<AuteurspageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuteurspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuteurspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
