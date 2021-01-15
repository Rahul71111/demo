import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestComponents } from './request-add.component';

describe('OfferAddComponent', () => {
  let component: AddRequestComponents;
  let fixture: ComponentFixture<AddRequestComponents>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequestComponents ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
