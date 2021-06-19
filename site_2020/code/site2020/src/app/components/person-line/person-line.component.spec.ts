import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonLineComponent } from './person-line.component';

describe('PersonComponent', () => {
  let component: PersonLineComponent;
  let fixture: ComponentFixture<PersonLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
