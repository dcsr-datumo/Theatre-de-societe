import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WorkLineComponent } from './work-line.component';

describe('WorkLineComponent', () => {
  let component: WorkLineComponent;
  let fixture: ComponentFixture<WorkLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
