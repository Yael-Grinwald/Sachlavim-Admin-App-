import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDetailsMenuComponent } from './program-details-menu.component';

describe('ProgramDetailsMenuComponent', () => {
  let component: ProgramDetailsMenuComponent;
  let fixture: ComponentFixture<ProgramDetailsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDetailsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDetailsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
