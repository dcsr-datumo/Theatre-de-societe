import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PiecesComponent } from './pieces.component';

describe('PiecesComponent', () => {
  let component: PiecesComponent;
  let fixture: ComponentFixture<PiecesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
