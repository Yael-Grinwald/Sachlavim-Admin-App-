import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfternoonDetailsMenuComponent } from './afternoon-details-menu.component';

describe('AfternoonDetailsMenuComponent', () => {
  let component: AfternoonDetailsMenuComponent;
  let fixture: ComponentFixture<AfternoonDetailsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfternoonDetailsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfternoonDetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
