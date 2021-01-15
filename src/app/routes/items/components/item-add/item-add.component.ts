import { CategoriesFacadeService } from "./../../../categories/categories-facade";
import { ItemsFacadeService } from "./../../items-facade.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { category } from "app/routes/categories/entities";
import { UnitesFacadeService } from "app/routes/unites/unites-facade";
import { unit } from "app/routes/unites/entities";
import { itemList } from "../../entities";

@Component({
  selector: "app-items-components-item-add",
  templateUrl: "./item-add.component.html",
  styleUrls: ["./item-add.component.scss"],
})
export class ItemsComponentsItemAddComponent implements OnInit {
  categoryList: any[];
  subCategoryList: category[];
  recommendedList: itemList[] = [];
  unitList: unit[];
  itemTypeList: string[];
  itemForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private facade: ItemsFacadeService,
    private unitFacde: UnitesFacadeService,
    private categoryFacade: CategoriesFacadeService
  ) {
    this.itemForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.pattern("[1-9]{1}[0-9]*")]],
      is_active: [true],
      secondary_name:[''],
      category_id: [""],
      unit_id: [""],
      item_type: [""],
      description: [""],
      benefits: [""],
      category_tags: [[]],
      thumbnail: [""],
      picture: [[]],
      recommended_items: [[]],
      subCategory_ids: [[]],
    });
    this.activeRoute.params.subscribe((params) => {
      if (params.id != undefined && params.id != null && params.id != "") {
        this.isEditMode = true;
        this.activeEditId = params.id;
      }
    });
  }

  ngOnInit() {
    this.categoryFacade.loadParentCategories();
    this.unitFacde.loadUnites(1, 500);
    this.categoryFacade.getParentCategories().subscribe((parent) => {
      this.categoryList = parent;
    });
    this.categoryFacade.getCategoriesByParentId().subscribe((categories) => {
      this.subCategoryList = categories.data;
    });
    this.unitFacde.getUnites().subscribe((units) => {
      this.unitList = units.data;
    });
    this.facade.getItemTypes().subscribe((types) => {
      this.itemTypeList = types;
    });
    this.facade.getSallableItemList().subscribe((types) => {
      this.recommendedList = types.data;
    });
    if (this.isEditMode) {
      this.facade.getItemDetails(this.activeEditId).subscribe(
        (res) => {
          let item: any = { ...res };
          this.itemForm.patchValue(res);
          this.itemForm.patchValue({ item_type: item.type });
          this.loadSubCategories(res.category_id);
        },
        (err) => console.error(err)
      );
    }
  }

  get is_active_value() {
    return this.itemForm.get("is_active").value
      ? this.itemForm.get("is_active").value
      : false;
  }

  public onFormSubmit(event) {
    console.log("form value ", this.itemForm.value, this.itemForm.valid);
    if (!this.itemForm.valid) return;
    if (this.isEditMode) {
      let value = this.itemForm.value;
      value._id = this.activeEditId;
      this.facade.updateItem(value).then((res) => {
        this.itemForm.reset();
        this.router.navigate(["items"]);
      });
    } else {
      this.facade.newItem(this.itemForm.value).then((res) => {
        this.itemForm.reset();
        this.router.navigate(["items"]);
      });
    }
  }

  ///chips stuff
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addtag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let cate = [...this.itemForm.get("category_tags").value];

    // Add
    if ((value || "").trim()) {
      cate.push(value.trim());
      this.itemForm.get("category_tags").setValue(cate);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removetag(tag: string): void {
    let cate = [...this.itemForm.get("category_tags").value];
    const index = cate.indexOf(tag);

    if (index >= 0) {
      // this.categoryTags.splice(index, 1);
      cate.splice(index, 1);
      this.itemForm.get("category_tags").setValue(cate);
    }
  }

  addpic(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let pictures = [...this.itemForm.get("picture").value];

    // Add
    if ((value || "").trim()) {
      pictures.push(value.trim());
      this.itemForm.get("picture").setValue(pictures);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  removepic(pic: string): void {
    let pictures = [...this.itemForm.get("picture").value];
    const index = pictures.indexOf(pic);

    if (index >= 0) {
      // this.categoryTags.splice(index, 1);
      pictures.splice(index, 1);
      this.itemForm.get("picture").setValue(pictures);
    }
  }

  cateTagValues: string[] = [];
  subCateTagValues: string[] = [];
  public onCategorySelectionChange() {
    this.cateTagValues = [];
    let cate_id = this.itemForm.get("category_id").value;
    this.categoryList.filter((item) => {
      if (cate_id == item._id) this.cateTagValues.push(item.name);
    });
    this.itemForm.patchValue({
      category_tags: [].concat(...this.cateTagValues),
    });
    this.itemForm.get("subCategory_ids").setValue([]);
    this.loadSubCategories(cate_id);
  }

  public onSubCategorySelectionChange() {
    this.subCateTagValues = [];
    let subcate_ids = this.itemForm.get("subCategory_ids").value;
    this.subCategoryList.filter((item) => {
      if (subcate_ids.indexOf(item._id) >= 0)
        this.subCateTagValues.push(item.name);
    });
    this.itemForm.patchValue({
      category_tags: [].concat(...this.cateTagValues, this.subCateTagValues),
    });
  }

  public loadSubCategories(parentId) {
    this.categoryFacade.loadCategories(1, 200, parentId, "");
  }
}
