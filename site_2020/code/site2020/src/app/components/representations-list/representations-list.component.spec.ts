import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentationsListComponent } from './representations-list.component';

describe('RepresentationsListComponent', () => {
  let component: RepresentationsListComponent;
  let fixture: ComponentFixture<RepresentationsListComponent>;

  beforeEach(async(() => {
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
