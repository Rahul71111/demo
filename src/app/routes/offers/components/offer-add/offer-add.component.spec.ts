import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersComponentsOfferAddComponent } from './offer-add.component';

describe('OfferAddComponent', () => {
  let component: OffersComponentsOfferAddComponent;
  let fixture: ComponentFixture<OffersComponentsOfferAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersComponentsOfferAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersComponentsOfferAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
