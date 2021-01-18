import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementScheduleComponent } from './management-schedule.component';

describe('ManagementScheduleComponent', () => {
  let component: ManagementScheduleComponent;
  let fixture: ComponentFixture<ManagementScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
