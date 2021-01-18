import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersTableComponent } from './managers-table.component';

describe('ManagersTableComponent', () => {
  let component: ManagersTableComponent;
  let fixture: ComponentFixture<ManagersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
