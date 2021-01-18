import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSettingsJointComponent } from './management-settings-joint.component';

describe('ManagementSettingsJointComponent', () => {
  let component: ManagementSettingsJointComponent;
  let fixture: ComponentFixture<ManagementSettingsJointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementSettingsJointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSettingsJointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
