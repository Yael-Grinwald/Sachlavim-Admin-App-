import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramReportComponent } from './program-report.component';

describe('ProgramReportComponent', () => {
  let component: ProgramReportComponent;
  let fixture: ComponentFixture<ProgramReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
