import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponentsCategoryListComponent } from './category-list.component';

describe('CategoryListComponent', () => {
  let component: CategoriesComponentsCategoryListComponent;
  let fixture: ComponentFixture<CategoriesComponentsCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponentsCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponentsCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
