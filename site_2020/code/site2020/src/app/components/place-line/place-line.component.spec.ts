import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceLineComponent } from './place-line.component';

describe('PlaceLineComponent', () => {
  let component: PlaceLineComponent;
  let fixture: ComponentFixture<PlaceLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
