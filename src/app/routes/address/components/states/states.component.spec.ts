import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponentsStatesComponent } from './states.component';

describe('StatesComponent', () => {
  let component: AddressComponentsStatesComponent;
  let fixture: ComponentFixture<AddressComponentsStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressComponentsStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponentsStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
