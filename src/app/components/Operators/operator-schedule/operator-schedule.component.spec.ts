import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorScheduleComponent } from './operator-schedule.component';

describe('OperatorScheduleComponent', () => {
  let component: OperatorScheduleComponent;
  let fixture: ComponentFixture<OperatorScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
