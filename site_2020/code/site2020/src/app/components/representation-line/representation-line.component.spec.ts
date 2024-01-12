import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RepresentationLineComponent } from './representation-line.component';

describe('RepresentationLineComponent', () => {
  let component: RepresentationLineComponent;
  let fixture: ComponentFixture<RepresentationLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentationLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentationLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
