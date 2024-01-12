import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GroupLineComponent } from './group-line.component';

describe('GroupLineComponent', () => {
  let component: GroupLineComponent;
  let fixture: ComponentFixture<GroupLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
