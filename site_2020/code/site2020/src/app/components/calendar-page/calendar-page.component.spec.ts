import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalendarPageComponent } from './calendar-page.component';

describe('CalendarPageComponent', () => {
  let component: CalendarPageComponent;
  let fixture: ComponentFixture<CalendarPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
