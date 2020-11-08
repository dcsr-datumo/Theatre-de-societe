import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentationLineComponent } from './representation-line.component';

describe('RepresentationLineComponent', () => {
  let component: RepresentationLineComponent;
  let fixture: ComponentFixture<RepresentationLineComponent>;

  beforeEach(async(() => {
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
