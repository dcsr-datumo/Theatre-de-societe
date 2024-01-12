import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PiecespageComponent } from './piecespage.component';

describe('PiecespageComponent', () => {
  let component: PiecespageComponent;
  let fixture: ComponentFixture<PiecespageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PiecespageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
