import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfternoonTableComponent } from './afternoon-table.component';

describe('AfternoonTableComponent', () => {
  let component: AfternoonTableComponent;
  let fixture: ComponentFixture<AfternoonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfternoonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfternoonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
