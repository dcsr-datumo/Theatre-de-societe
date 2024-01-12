import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BiblioComponent } from './biblio.component';

describe('BiblioComponent', () => {
  let component: BiblioComponent;
  let fixture: ComponentFixture<BiblioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BiblioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
