import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteLineComponent } from './quote-line.component';

describe('QuoteLineComponent', () => {
  let component: QuoteLineComponent;
  let fixture: ComponentFixture<QuoteLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
