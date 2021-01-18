import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfternoonScheduleComponent } from './afternoon-schedule.component';

describe('AfternoonScheduleComponent', () => {
  let component: AfternoonScheduleComponent;
  let fixture: ComponentFixture<AfternoonScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfternoonScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfternoonScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
