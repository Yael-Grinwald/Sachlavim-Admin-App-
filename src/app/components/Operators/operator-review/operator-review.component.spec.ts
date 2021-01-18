import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorReviewComponent } from './operator-review.component';

describe('OperatorReviewComponent', () => {
  let component: OperatorReviewComponent;
  let fixture: ComponentFixture<OperatorReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
