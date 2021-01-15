import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponentsCountriesComponent } from './countries.component';

describe('CountriesComponent', () => {
  let component: AddressComponentsCountriesComponent;
  let fixture: ComponentFixture<AddressComponentsCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressComponentsCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponentsCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
