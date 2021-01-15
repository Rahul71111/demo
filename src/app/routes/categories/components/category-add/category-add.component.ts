import { category } from "./../../entities/index";
import { MatSort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesFacadeService } from "./../../categories-facade";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-categories-components-category-add",
  templateUrl: "./category-add.component.html",
  styleUrls: ["./category-add.component.scss"],
})
export class CategoriesComponentsCategoryAddComponent implements OnInit {
  categoryList: any[];
  categoryForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private categoryFacade: CategoriesFacadeService
  ) {
    this.categoryForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      parent_categoriesId: [""],
      position: [1],
      is_active: true,
      is_homescreen: false,
      category_image: [""],
    });
    // this.activeRoute.params.subscribe(params => {
    //   if(params.id != undefined && params.id != null && params.id != ''){
    //     this.isEditMode = true;
    //     this.activeEditId = params.id;
    //   }
    // })
  }

  ngOnInit() {
    this.categoryFacade.loadParentCategories();
    this.categoryFacade.getParentCategories().subscribe((parent) => {
      this.categoryList = parent;
    });
    this.activeRoute.params.subscribe((params) => {
      if (params.id != undefined && params.id != null && params.id != "") {
        this.isEditMode = true;
        this.activeEditId = params.id;
      }
      if (this.isEditMode) {
        this.categoryFacade.getCategoryDetails(this.activeEditId).subscribe(
          (res) => {
            let cateParent =
              res.parent_categoriesIds && res.parent_categoriesIds.length > 0
                ? res.parent_categoriesIds[0]
                : "";
            let image = res.category_image ? res.category_image : "";
            this.categoryForm.patchValue({
              name: res.name,
              parent_categoriesId: cateParent,
              position: res.position,
              category_image: image,
              is_active: res.is_active,
              is_homescreen: res.is_homescreen
            });
          },
          (err) => console.error(err)
        );
      }
    });
  }

  get is_active_value() {
    return this.categoryForm.get("is_active").value
      ? this.categoryForm.get("is_active").value
      : false;
  }

  get is_homescreen_value() {
    return this.categoryForm.get("is_homescreen").value
      ? this.categoryForm.get("is_homescreen").value
      : false;
  }

  public fileUpladChange(event) {
    let files: File[] = event.target.files;
    if (files && files != null && files.length > 0) {
      let singleFile = files[0];
      this.categoryForm.get("category_img_name").setValue(singleFile.name);
      this.categoryForm.get("img_file").setValue(singleFile);
    } else {
      this.categoryForm.get("category_img_name").reset();
    }
  }

  public onFormSubmit(event) {
    // console.log('form value ', this.categoryForm.value,this.categoryForm.valid,this.categoryForm)
    if (!this.categoryForm.valid) return;
    if (this.isEditMode) {
      let value: category = this.categoryForm.value;
      value._id = this.activeEditId;
      this.categoryFacade.updateCategory(value).then((res) => {
        this.categoryForm.reset();
        this.router.navigate(["categories"]);
      });
    } else {
      this.categoryFacade
        .newCategory(this.categoryForm.value)
        .then((res) => {
          this.categoryForm.reset();
          this.router.navigate(["categories"]);
        })
        .catch((err) => {});
    }
  }
}
