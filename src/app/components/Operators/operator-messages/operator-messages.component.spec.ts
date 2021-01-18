import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorMessagesComponent } from './operator-messages.component';

describe('OperatorMessagesComponent', () => {
  let component: OperatorMessagesComponent;
  let fixture: ComponentFixture<OperatorMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
