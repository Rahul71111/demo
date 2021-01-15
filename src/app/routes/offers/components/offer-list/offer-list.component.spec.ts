import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersOfferListComponent } from './offer-list.component';

describe('OfferListComponent', () => {
  let component: OffersOfferListComponent;
  let fixture: ComponentFixture<OffersOfferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersOfferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
