import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuteursComponent } from './auteurs.component';

describe('AuteursComponent', () => {
  let component: AuteursComponent;
  let fixture: ComponentFixture<AuteursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuteursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
