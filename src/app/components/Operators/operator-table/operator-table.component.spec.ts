import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorTableComponent } from './operator-table.component';

describe('OperatorTableComponent', () => {
  let component: OperatorTableComponent;
  let fixture: ComponentFixture<OperatorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
