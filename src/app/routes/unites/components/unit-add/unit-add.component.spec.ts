import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitesComponentsUnitAddComponent } from './unit-add.component';

describe('UnitAddComponent', () => {
  let component: UnitesComponentsUnitAddComponent;
  let fixture: ComponentFixture<UnitesComponentsUnitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitesComponentsUnitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitesComponentsUnitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
