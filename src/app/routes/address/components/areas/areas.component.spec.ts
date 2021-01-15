import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponentsAreasComponent } from './areas.component';

describe('AreasComponent', () => {
  let component: AddressComponentsAreasComponent;
  let fixture: ComponentFixture<AddressComponentsAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressComponentsAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponentsAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
