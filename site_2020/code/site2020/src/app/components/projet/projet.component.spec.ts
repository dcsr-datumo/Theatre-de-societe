import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjetComponent } from './projet.component';

describe('ProjetComponent', () => {
  let component: ProjetComponent;
  let fixture: ComponentFixture<ProjetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
