import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitesComponentsUnitListComponent } from './unit-list.component';

describe('UnitListComponent', () => {
  let component: UnitesComponentsUnitListComponent;
  let fixture: ComponentFixture<UnitesComponentsUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitesComponentsUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitesComponentsUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
