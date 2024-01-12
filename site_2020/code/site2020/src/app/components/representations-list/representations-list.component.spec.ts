import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RepresentationsListComponent } from './representations-list.component';

describe('RepresentationsListComponent', () => {
  let component: RepresentationsListComponent;
  let fixture: ComponentFixture<RepresentationsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
