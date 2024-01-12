import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RepresentationsListMapComponent } from './representations-list-map.component';

describe('RepresentationListMapComponent', () => {
  let component: RepresentationsListMapComponent;
  let fixture: ComponentFixture<RepresentationsListMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentationsListMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentationsListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
