import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FestivalComponent } from './festival.component';

describe('FestivalComponent', () => {
  let component: FestivalComponent;
  let fixture: ComponentFixture<FestivalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FestivalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
