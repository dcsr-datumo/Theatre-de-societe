import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuoteContentComponent } from './quote-content.component';

describe('QuoteComponent', () => {
  let component: QuoteContentComponent;
  let fixture: ComponentFixture<QuoteContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
