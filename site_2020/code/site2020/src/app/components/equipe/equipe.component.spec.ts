import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EquipeComponent } from './equipe.component';

describe('EquipeComponent', () => {
  let component: EquipeComponent;
  let fixture: ComponentFixture<EquipeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
