import { Router } from "@angular/router";
import { category } from "./../../entities/index";
import { ConfirmService } from "./../../../../shared/services/confirm.service";
import { CategoriesFacadeService } from "./../../categories-facade";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";

@Component({
  selector: "app-categories-components-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoriesComponentsCategoryListComponent implements OnInit {
  displayedColumns: string[] = [
    "category_image",
    "position",
    "name",
    "parent",
    "created_at",
    "is_active",
    "controls",
  ];
  dataSource: MatTableDataSource<category>;
  parentCategoryFilterValue: string = "";
  categoryNameFilterValue: string = "";
  parentCategoryList;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage: 1,
    itemsPerPage: 200,
    totalRecords: 200,
  };

  //filter field
  q = {
    username: "",
    email: "",
    gender: "",
  };

  constructor(
    private router: Router,
    private categoriesFacade: CategoriesFacadeService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit() {
    this.categoriesFacade.loadCategories(
      this.pageDetails.currentPage,
      this.pageDetails.itemsPerPage,
      this.parentCategoryFilterValue,
      this.categoryNameFilterValue
    );
    this.categoriesFacade.loadParentCategories();
    this.categoriesFacade
      .getCategories(
        this.pageDetails.currentPage,
        this.pageDetails.itemsPerPage,
        this.parentCategoryFilterValue,
        this.categoryNameFilterValue
      )
      .subscribe((cate) => {
        this.dataSource = new MatTableDataSource(cate.data);
        this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
        this.pageDetails.totalRecords = cate.TotalCount;
      });
    this.categoriesFacade.getParentCategories().subscribe((parent) => {
      this.parentCategoryList = parent;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  public pageEvent(event: PageEvent) {
    this.pageDetails.itemsPerPage = event.pageSize;
    this.pageDetails.currentPage = event.pageIndex + 1;
    this.categoriesFacade.loadCategories(
      this.pageDetails.currentPage,
      event.pageSize,
      this.parentCategoryFilterValue,
      this.categoryNameFilterValue
    );
  }

  public deleteIcon(id) {
    this.confirmService
      .confirm("Are you sure want to delete this category?", "Confirm")
      .subscribe((result) => {
        if (result == true) {
          this.categoriesFacade
            .deleteCategory(id)
            .then((res) =>
              this.categoriesFacade.loadCategories(
                this.pageDetails.currentPage,
                this.pageDetails.itemsPerPage,
                this.parentCategoryFilterValue,
                this.categoryNameFilterValue
              )
            );
        }
      });
  }

  public changeActivationStatus(row) {
    this.categoriesFacade.changeActivationStatus(row._id, row.is_active);
  }

  public navigateToEdit(id) {
    this.categoriesFacade.loadCategoryDetails(id).then((cate) => {
      this.router.navigate(["categories", "edit", id]);
    });
  }

  public filterCategories() {
    this.categoriesFacade.loadCategories(
      this.pageDetails.currentPage,
      this.pageDetails.itemsPerPage,
      this.parentCategoryFilterValue,
      this.categoryNameFilterValue
    );
  }

  public resetFilter() {
    this.categoryNameFilterValue = "";
    this.parentCategoryFilterValue = "";
  }

  public categoryPositionChanged(categoryRow: category) {
    let category: category = {
      _id: categoryRow._id,
      name: categoryRow.name,
      is_active: categoryRow.is_active,
      position: categoryRow.position,
      category_image: categoryRow.category_image,
    };
    if (
      categoryRow.parent_categoriesIds != undefined &&
      categoryRow.parent_categoriesIds != null &&
      categoryRow.parent_categoriesIds.length > 0
    ) {
      category.parent_categoriesId = categoryRow.parent_categoriesIds[0]._id;
    }
    this.categoriesFacade.updateCategory(category);
  }
}
