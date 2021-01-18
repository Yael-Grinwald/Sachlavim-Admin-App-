import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorCreditComponent } from './operator-credit.component';

describe('OperatorCreditComponent', () => {
  let component: OperatorCreditComponent;
  let fixture: ComponentFixture<OperatorCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
