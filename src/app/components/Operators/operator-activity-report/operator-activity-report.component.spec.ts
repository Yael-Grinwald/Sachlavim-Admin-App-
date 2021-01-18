import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorActivityReportComponent } from './operator-activity-report.component';

describe('OperatorActivityReportComponent', () => {
  let component: OperatorActivityReportComponent;
  let fixture: ComponentFixture<OperatorActivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorActivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
