import { category } from "./../../../categories/entities/index";
import { CategoriesFacadeService } from "./../../../categories/categories-facade";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { BannersFacadeService } from "../../banners-facade";

@Component({
  selector: "app-banners-banner-add",
  templateUrl: "./banner-add.component.html",
  styleUrls: ["./banner-add.component.scss"],
})
export class BannersBannerAddComponent implements OnInit {
  categoryList: any[];
  bannerForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private bannerFacade: BannersFacadeService,
    private categoryFacade: CategoriesFacadeService
  ) {
    this.bannerForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]],
      banner_image_url: [""],
      banner_redirect_url: [""],
      is_active: true,
      type: [""],
      category_id: [""],
      position: [0],
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
    this.categoryFacade.getParentCategories().subscribe((parent) => {
      this.categoryList = parent;
    });
    if (this.isEditMode) {
      this.bannerFacade.getBannerDetails(this.activeEditId).subscribe(
        (res) => {
          let category: any = res.category_id ? res.category_id : { _id: "" };
          this.bannerForm.patchValue({
            name: res.name,
            banner_image_url: res.banner_image_url,
            banner_redirect_url: res.banner_redirect_url,
            is_active: res.is_active,
            type: res.type,
            category_id: category._id,
            position: res.position,
          });
        },
        (err) => console.error(err)
      );
    }
  }

  get is_active_value() {
    return this.bannerForm.get("is_active").value
      ? this.bannerForm.get("is_active").value
      : false;
  }

  // public fileUpladChange(event){
  //   let files:File[] = event.target.files;
  //   if(files && files != null && files.length > 0){
  //     let singleFile = files[0];
  //     this.bannerForm.get('category_img_name').setValue(singleFile.name);
  //     this.bannerForm.get('img_file').setValue(singleFile);
  //   }else{
  //     this.bannerForm.get('category_img_name').reset();
  //   }
  // }

  public onFormSubmit(event) {
    // console.log('form value ', this.bannerForm.value,this.bannerForm.valid,this.bannerForm)
    if (!this.bannerForm.valid) return;
    if (this.isEditMode) {
      let value = this.bannerForm.value;
      value._id = this.activeEditId;
      this.bannerFacade.updateBanner(value).then((res) => {
        this.bannerForm.reset();
        this.router.navigate(["banners"]);
      });
    } else {
      this.bannerFacade.newBanner(this.bannerForm.value).then((res) => {
        this.bannerForm.reset();
        this.router.navigate(["banners"]);
      });
    }
  }
}
