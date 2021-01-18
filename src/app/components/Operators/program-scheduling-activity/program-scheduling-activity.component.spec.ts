import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSchedulingActivityComponent } from './program-scheduling-activity.component';

describe('ProgramSchedulingActivityComponent', () => {
  let component: ProgramSchedulingActivityComponent;
  let fixture: ComponentFixture<ProgramSchedulingActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSchedulingActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSchedulingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
