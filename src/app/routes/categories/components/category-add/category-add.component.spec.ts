import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponentsCategoryAddComponent } from './category-add.component';

describe('CategoryAddComponent', () => {
  let component: CategoriesComponentsCategoryAddComponent;
  let fixture: ComponentFixture<CategoriesComponentsCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponentsCategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponentsCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
