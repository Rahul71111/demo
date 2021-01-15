import { UserRole } from './../../../../shared/entities/index';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { OfferFacadeService } from '../../offer-facade.service';
import { ItemsFacadeService } from 'app/routes/items/items-facade.service';
import { CategoriesFacadeService } from 'app/routes/categories/categories-facade';
import { UsersFacade } from 'app/routes/users/users-facade';

@Component({
  selector: 'app-offers-components-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss']
})
export class OffersComponentsOfferAddComponent implements OnInit {

  offerTypeList:any[] = [{name:"Order",value:"ORDER"},{name:"Category",value:"CATEGORY"},{name:"Item",value:"ITEM"},{name:"Age",value:"AGE"},{name:"Gender",value:"GENDER"}]
  offerOnItem:any[] = [];
  usersList = [];
  categoryList: any[];
  itemTypeList: string[];
  offerForm: FormGroup;
  isEditMode: Boolean = false;
  activeEditId: string = "";
  minDate;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private facade: OfferFacadeService,
    private categoryFacade: CategoriesFacadeService,
    private itemFacade: ItemsFacadeService,
    private userFacade: UsersFacade,
  ) {
    this.offerForm = this.fb.group(
      {
        offer_type :["",[Validators.required]],
        offer_on_ids :[],
        min_value :[0,[Validators.required]],
        discount_type :["",[Validators.required]],
        discount_value :[0,[Validators.required]],
        position :[1],
        coupon_code :[""],
        expiry :['',[Validators.required]],
        user_id :[],
        user_role :[""],
        is_active :[true],
        age :[0],
        gender :[""],  
        usage_count :[1]    
      });
    this.activeRoute.params.subscribe((params) => {
      if (params.id != undefined && params.id != null && params.id != "") {
        this.isEditMode = true;
        this.activeEditId = params.id;
      }
    });
    let today = new Date();
    this.minDate = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
  }

  ngOnInit() {
    
    if (this.isEditMode) {
      this.facade.getOfferDetails(this.activeEditId).subscribe(
        (res) => {
          let offer: any = { ...res };
          console.log(offer)
          this.offerForm.patchValue(offer);
          this.offerForm.patchValue({ user_role: offer.user_role && offer.user_role.length > 0 ? offer.user_role[0]:'',
          user_id: offer.user_id && offer.user_id.length > 0 ? offer.user_id[0]:'',
          expiry:new Date(offer.expiry)
         });
         this.userRoleChanged();
         this.offerTypeChanged();
        },
        (err) => console.error(err)
      );
    }
  }

  get isTypeItemCategory(){
    return this.offerForm.get('offer_type').value == "ITEM" || this.offerForm.get('offer_type').value == "CATEGORY" || this.offerForm.get('offer_type').value == '';
  }

  get isTypeItemCategoryWithDepo(){
    return (this.offerForm.get('offer_type').value == "ITEM" 
            || this.offerForm.get('offer_type').value == "CATEGORY" 
            || this.offerForm.get('offer_type').value == '') 
            && this.offerForm.get('user_role').value == 'DEPO';
  }
  get isOrderType(){
    return this.offerForm.get('offer_type').value == "ORDER"
  }
  get isAgeType(){ return this.offerForm.get('offer_type').value == "AGE"}
  get isGenderType(){ return this.offerForm.get('offer_type').value == "GENDER"}
  get is_active_value() {
    return this.offerForm.get("is_active").value
      ? this.offerForm.get("is_active").value
      : false;
  }

  public userRoleChanged(){
    this.usersList = [];
    let value = this.offerForm.get('user_role').value
    this.userFacade.getUsersByType(0,0,'',value).subscribe(users => {
      this.usersList = users.userList;
    },err => console.error(err))
  }

  public offerTypeChanged(){
    let value = this.offerForm.get('offer_type').value;
    this.offerOnItem = [];
    switch (value.toUpperCase()) {
      case "ITEM":
        this.itemFacade.getItemListForDropDown(false).subscribe(items => {
          this.offerOnItem = items.data;
        },err => console.error(err))
        break;
      case "CATEGORY":
        this.categoryFacade.getCategories().subscribe(cate => {
          this.offerOnItem = cate.data
        },err => console.error(err))
        break;
      default:
        break;
    }
  }


  public onFormSubmit(event) {
    if (!this.offerForm.valid) return;
    if (this.isEditMode) {
      let value = this.offerForm.value;
      value.user_id = [value.user_id];
      value._id = this.activeEditId;
      this.facade.updateOffer(value).then((res) => {
        this.offerForm.reset();
        this.router.navigate(["offers"]);
      });
    } else {
      let value = this.offerForm.value;
      value.user_id = [value.user_id];
      this.facade.newOffer(value).then((res) => {
        this.offerForm.reset();
        this.router.navigate(["offers"]);
      });
    }
  }

  

  cateTagValues: string[] = [];
  subCateTagValues: string[] = [];
  public onCategorySelectionChange() {
    this.cateTagValues = [];
    let cate_id = this.offerForm.get("category_id").value;
    this.categoryList.filter((item) => {
      if (cate_id == item._id) this.cateTagValues.push(item.name);
    });
    this.offerForm.patchValue({
      category_tags: [].concat(...this.cateTagValues),
    });
    this.offerForm.get("subCategory_ids").setValue([]);
    this.loadSubCategories(cate_id);
  }

  public onSubCategorySelectionChange() {
    this.subCateTagValues = [];
    let subcate_ids = this.offerForm.get("subCategory_ids").value;
    // this.subCategoryList.filter((item) => {
    //   if (subcate_ids.indexOf(item._id) >= 0)
    //     this.subCateTagValues.push(item.name);
    // });
    this.offerForm.patchValue({
      category_tags: [].concat(...this.cateTagValues, this.subCateTagValues),
    });
  }

  public loadSubCategories(parentId) {
    // this.categoryFacade.loadCategories(1, 200, parentId, "");
  }

}
