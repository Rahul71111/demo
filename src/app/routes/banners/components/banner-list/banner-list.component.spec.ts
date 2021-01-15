import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersBannerListComponent } from './banner-list.component';

describe('BannerListComponent', () => {
  let component: BannersBannerListComponent;
  let fixture: ComponentFixture<BannersBannerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersBannerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
