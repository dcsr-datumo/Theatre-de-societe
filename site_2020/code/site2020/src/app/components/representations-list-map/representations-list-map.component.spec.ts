import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentationsListMapComponent } from './representations-list-map.component';

describe('RepresentationListMapComponent', () => {
  let component: RepresentationsListMapComponent;
  let fixture: ComponentFixture<RepresentationsListMapComponent>;

  beforeEach(async(() => {
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
