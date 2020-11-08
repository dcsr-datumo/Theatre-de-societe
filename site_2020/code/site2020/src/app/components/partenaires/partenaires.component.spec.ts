import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenairesComponent } from './partenaires.component';

describe('PartenairesComponent', () => {
  let component: PartenairesComponent;
  let fixture: ComponentFixture<PartenairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartenairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
