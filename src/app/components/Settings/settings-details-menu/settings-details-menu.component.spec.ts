import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDetailsMenuComponent } from './settings-details-menu.component';

describe('SettingsDetailsMenuComponent', () => {
  let component: SettingsDetailsMenuComponent;
  let fixture: ComponentFixture<SettingsDetailsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDetailsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
