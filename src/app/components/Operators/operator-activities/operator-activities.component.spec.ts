import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorActivitiesComponent } from './operator-activities.component';

describe('OperatorActivitiesComponent', () => {
  let component: OperatorActivitiesComponent;
  let fixture: ComponentFixture<OperatorActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
