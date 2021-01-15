import { UnitesFacadeService } from "./../../unites-facade";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import {
  item,
  unit,
  packagingMaterial,
  packagingMaterialwithObject,
} from "../../entities";
import { MatTableDataSource } from "@angular/material/table";
import { ItemsFacadeService } from "app/routes/items/items-facade.service";

@Component({
  selector: "app-unites-components-unit-add",
  templateUrl: "./unit-add.component.html",
  styleUrls: ["./unit-add.component.scss"],
})
export class UnitesComponentsUnitAddComponent implements OnInit {
  baseUnites: unit[];
  itemList: item[];
  unitForm: FormGroup;
  packageForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = "";
  packaging_material_consumed_value: packagingMaterial[] = [];
  packaging_material_consumed: packagingMaterialwithObject[] = [];
  packageColumns: string[] = [
    "item_id",
    "item_unit_id",
    "item_quantity",
    "controls",
  ];
  dataSource: MatTableDataSource<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private itemFacade:ItemsFacadeService,
    private unitFacade: UnitesFacadeService
  ) {
    this.unitForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      base_unit: [""],
      base_quantity: [0],
      packaging_material_consumed: [[]],
      is_active: [true],
    });

    this.packageForm = this.fb.group({
      item_id: ["", [Validators.required]],
      item_quantity: [0, [Validators.required]],
      item_unit_id: ["", [Validators.required]],
    });

    this.activeRoute.params.subscribe((params) => {
      if (params.id != undefined && params.id != null && params.id != "") {
        this.isEditMode = true;
        this.activeEditId = params.id;
      }
    });
  }

  ngOnInit() {
    this.loadBaseUnitNItem();
    if (this.isEditMode) {
      this.unitFacade.getUnitDetails(this.activeEditId).subscribe(
        (res) => {
          let base_unit: any = res.base_unit;
          this.unitForm.patchValue({
            name: res.name,
            base_unit: base_unit ? base_unit._id : "",
            base_quantity: res.base_quantity,
            is_active: res.is_active,
          });
          let packagingdata = res.packaging_material_consumed;
          if (packagingdata && packagingdata.length > 0) {
            packagingdata.map((pack) => {
              this.packaging_material_consumed.push({
                item_id: pack.item_id,
                item_quantity: pack.item_quantity,
                item_unit_id: pack.item_unit_id,
              });
              this.packaging_material_consumed_value.push({
                item_id: pack.item_id._id,
                item_quantity: pack.item_quantity,
                item_unit_id: pack.item_unit_id._id,
              });
            });
            console.log(this.packaging_material_consumed);
            this.reloadPackagingsource();
          }
        },
        (err) => console.error(err)
      );
    }
  }

  get is_active_value() {
    return this.unitForm.get("is_active").value
      ? this.unitForm.get("is_active").value
      : false;
  }

  public onFormSubmit(event) {
    // console.log('form value ', this.unitForm.value,this.unitForm.valid,this.unitForm)
    if (!this.unitForm.valid) return;

    //get material packaging
    this.packaging_material_consumed_value = [];
    this.packaging_material_consumed.map((pack) => {
      this.packaging_material_consumed_value.push({
        item_id: pack.item_id._id,
        item_quantity: pack.item_quantity,
        item_unit_id: pack.item_unit_id._id,
      });
    });

    this.unitForm.patchValue({
      packaging_material_consumed: this.packaging_material_consumed_value,
    });

    if (this.isEditMode) {
      let value = this.unitForm.value;
      value._id = this.activeEditId;
      this.unitFacade.updateUnit(value).then((res) => {
        this.unitForm.reset();
        this.router.navigate(["unites"]);
      });
    } else {
      this.unitFacade.newUnit(this.unitForm.value).then((res) => {
        this.unitForm.reset();
        this.packageForm.reset();
        this.router.navigate(["unites"]);
      });
    }
  }

  public onPackFormSubmit(event) {
    console.log(this.packageForm.valid);
    if (this.packageForm.valid) {
      let formValue: any = this.packageForm.value;

      //set value to datasource variable
      this.packaging_material_consumed.push(this.packageForm.value);
      this.reloadPackagingsource();

      // //set value to main form
      // this.packaging_material_consumed_value.push({
      //   item_id: formValue.item_id._id,
      // item_quantity: formValue.item_quantity,
      // item_unit_id: formValue.item_unit_id._id})

      // this.unitForm.patchValue({
      //   packaging_material_consumed:this.packaging_material_consumed_value
      // })

      //reset form
      this.packageForm.setValue({
        item_id: "",
        item_quantity: 0,
        item_unit_id: "",
      });
    }
  }

  reloadPackagingsource() {
    this.dataSource = new MatTableDataSource(this.packaging_material_consumed);
  }

  public loadBaseUnitNItem() {
    this.unitFacade.loadUnites();
    // this.unitFacade.loadItemList();
    this.unitFacade.getUnites().subscribe(
      (unitres) => {
        this.baseUnites = unitres.data;
      },
      (err) => console.error("error while load base unites", err)
    );
    this.itemFacade.getPackagingItemList().subscribe(
      (items) => {
        this.itemList = items.data;
      },
      (err) => console.error("error while load base unites", err)
    );
  }

  deletePackging(itemrow: packagingMaterialwithObject) {
    // if(this.packaging_material_consumed.indexOf(itemrow) >= 0){
    //   this.packaging_material_consumed = this.
    // }
    this.packaging_material_consumed = this.packaging_material_consumed.filter(
      (item) => {
        if (
          itemrow.item_id == item.item_id &&
          itemrow.item_unit_id == item.item_unit_id &&
          itemrow.item_quantity == item.item_quantity
        ) {
        } else return item;
      }
    );
    this.reloadPackagingsource();
  }
}
