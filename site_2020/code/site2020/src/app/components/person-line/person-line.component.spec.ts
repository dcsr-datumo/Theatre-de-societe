import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PersonLineComponent } from './person-line.component';

describe('PersonComponent', () => {
  let component: PersonLineComponent;
  let fixture: ComponentFixture<PersonLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
