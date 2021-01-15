import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersBannerAddComponent } from './banner-add.component';

describe('BannerAddComponent', () => {
  let component: BannersBannerAddComponent;
  let fixture: ComponentFixture<BannersBannerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersBannerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersBannerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
