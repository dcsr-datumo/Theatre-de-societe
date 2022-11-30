import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListElementComponent } from './quote-list.component';

describe('QuoteListElementComponent', () => {
  let component: QuoteListElementComponent;
  let fixture: ComponentFixture<QuoteListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
