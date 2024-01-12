import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PopupLinkComponent } from './popup-link.component';

describe('PopupLinkComponent', () => {
  let component: PopupLinkComponent;
  let fixture: ComponentFixture<PopupLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
