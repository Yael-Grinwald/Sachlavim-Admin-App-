import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementSettingsClustersComponent } from './management-settings-clusters.component';

describe('ManagementSettingsClustersComponent', () => {
  let component: ManagementSettingsClustersComponent;
  let fixture: ComponentFixture<ManagementSettingsClustersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementSettingsClustersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementSettingsClustersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
