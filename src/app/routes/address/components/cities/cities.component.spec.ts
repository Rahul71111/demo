import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponentsCitiesComponent } from './cities.component';

describe('CitiesComponent', () => {
  let component: AddressComponentsCitiesComponent;
  let fixture: ComponentFixture<AddressComponentsCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressComponentsCitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponentsCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
