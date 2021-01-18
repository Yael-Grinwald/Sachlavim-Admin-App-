import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfternoonDetailsComponent } from './afternoon-details.component';

describe('AfternoonDetailsComponent', () => {
  let component: AfternoonDetailsComponent;
  let fixture: ComponentFixture<AfternoonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfternoonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfternoonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
