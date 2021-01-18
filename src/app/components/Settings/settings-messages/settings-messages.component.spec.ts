import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMessagesComponent } from './settings-messages.component';

describe('SettingsMessagesComponent', () => {
  let component: SettingsMessagesComponent;
  let fixture: ComponentFixture<SettingsMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
