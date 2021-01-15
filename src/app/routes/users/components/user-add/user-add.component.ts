import { filter } from 'rxjs/operators';
import { AddressFacadeService } from './../../../address/address-facade.service';
import { SettingsService } from '@core';
import { ToastrService } from "ngx-toastr";
import { UsersFacade } from "./../../users-facade";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { DateAdapter } from "@angular/material/core";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRole } from '@shared/entities';

@Component({
  selector: "app-users-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UsersUserAddComponent implements OnInit, OnDestroy {
  q = {
    username: "",
    email: "",
    gender: "",
  };

  userForm: FormGroup;
  roleList = [];
  countryList = [];
  stateList = [];
  cityList = [];
  areaList = [];
  vehicleList = [];
  userList = [];
  isEditMode: boolean = false;
  activeEditId;

  showParent = false;

  translateSubscription: Subscription;

  constructor(
    private usersFacade: UsersFacade,
    private addressFacade:AddressFacadeService,
    private fb: FormBuilder,
    private settingSvc:SettingsService,
    private dateAdapter: DateAdapter<any>,
    private translate: TranslateService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      first_name: ["", [Validators.required, Validators.maxLength(50)]],
      last_name: [""],
      contact: ["",[Validators.required, Validators.pattern("[6-9]{1}[0-9]{9}")],],
      contact_2: ["",[ Validators.pattern("[6-9]{1}[0-9]{9}")],],
      role_id: ["", [Validators.required]],
      gender: [""],
      email: [""],
      current_address: [""],
      sameAddress: [false],
      permanent_address: [""],
      dob: [""],
      uid: [""],
      family_details: [""],
      previous_occupation: [""],
      bank_details: [""],
      firm_name: [""],
      firm_gst: [""],
      supplier_of_what: [""],
      reference: [""],
      country_id: [""],
      state_id: [""],
      city_id: [""],
      area_id: [""],
      vehicle_id: [""],
      location: [""],
      parent_id:[""],
      is_active: [true],
    });

    this.activeRoute.params.subscribe((params) => {
      if (params.id != undefined && params.id != null && params.id != "") {
        this.isEditMode = true;
        this.activeEditId = params.id;
      }
    });
  }

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe(
      (res: { lang: any }) => {
        this.dateAdapter.setLocale(res.lang);
      }
    );
    this.loadRoles();
    this.loadFormDropdowns();
    this.loadEditForm();
  }

  get is_active_value() {
    return this.userForm.get("is_active").value
      ? this.userForm.get("is_active").value
      : false;
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  public onFormSubmit(event) {
    if (this.userForm.valid == false) {
      this.toastr.error("Please Fill all required field!", "Required", {
        timeOut: 3000,
      });
    } else {
      if (this.isEditMode) {
        let value = this.userForm.value;
        value._id = this.activeEditId;
        this.usersFacade.updateUser(value).then((res) => {
          this.userForm.reset();
          this.router.navigate(["users"]);
        });
      } else {
        this.usersFacade.newUser(this.userForm.value).then((res) => {
          this.userForm.reset();
          this.router.navigate(["users"]);
        });
      }
    }
  }

  public loadRoles() {
    this.usersFacade.getRoleList().subscribe(
      (res) => {
        let data: any = res;
        this.roleList = data.data;
        this.isEditMode ? this.roleChanged() : '';
        this.roleDepoFilter();
        this.roleMPlantFilter();
        this.rolePManagerFilter();
      },
      (err) => console.error(err)
    );
  }

  private roleDepoFilter(){
    if(this.settingSvc.isDepo)
      this.roleList = this.roleList.filter(role => role.type == "DELIVERY_BOY" || role.type == "HAWKER");
  }

  private rolePManagerFilter(){
    if(this.settingSvc.isPurchaseManager)
      this.roleList = this.roleList.filter(role => role.type == "SUPPLIER");
  }

  private roleMPlantFilter(){
    if(this.settingSvc.isManufaturingPlant){
      this.roleList = this.roleList.filter(role => role.type == UserRole.SUPPLIER || role.type == UserRole.PURCHASE_MANAGER);
    }
  }
 

  public loadFormDropdowns() {
    this.addressFacade.getCountryList().subscribe(
      (res) => {
        let data: any = res;
        this.countryList = data.data;
      },
      (err) => console.error(err)
    );

    this.usersFacade.getVehicleList().subscribe(
      (res) => {
        let data: any = res;
        this.vehicleList = data.data;
      },
      (err) => console.error(err)
    );
  }

  public roleChanged(){
    let value = this.userForm.get('role_id').value;
    if(value){
      let role = this.roleList.filter(role => role._id == value);
      if(role && role.length > 0){
        if(role[0].type == UserRole.FRANCHISE || role[0].type == UserRole.POS){
            this.showParent = true;
            this.userForm.get('parent_id').setValue('');
            this.usersFacade.getUsersByType(0,0,'',role[0].type == UserRole.FRANCHISE ? UserRole.DEPO : UserRole.FRANCHISE).toPromise().then(list => {
              this.userList = list.userList;
            }).catch(err => {console.error(err)})
          }
          else{
            this.showParent = false;
            this.userForm.get('parent_id').setValue('');
          }
      }else{
        this.showParent = false;
        this.userForm.get('parent_id').setValue('');
      }
    }    
  }

  public countryChange(){
    this.stateList = [];
    this.cityList = [];
    this.areaList= [];
    let country_id = this.userForm.get("country_id").value;
    this.addressFacade.getStateByCountryId(country_id).then(
      (res) => {
        let data: any = res;
        this.stateList = data.data;
      }).catch((err) => console.error(err)
    );
  }

  public stateChange(){
    this.cityList = [];
    this.areaList= [];
    let stateId = this.userForm.get("state_id").value;
    this.addressFacade.getCityByStateId(stateId).then(
      (res) => {
        let data: any = res;
        this.cityList = data.data;
      }).catch((err) => console.error(err)
    );
  }

  public cityChange(){
    this.areaList= [];
    let cityId = this.userForm.get("city_id").value;
    this.addressFacade.getAreaByCityId(cityId).then(
      (res) => {
        let data: any = res;
        this.areaList = data.data;
      }).catch((err) => console.error(err)
    );
  }

  public loadEditForm() {
    if (this.isEditMode) {
      this.usersFacade.getUserDetails(this.activeEditId).subscribe(
        (res) => {
          console.log(res);
          this.userForm.patchValue(res);
          let role_id = res.role_id ? res.role_id._id : "";
          let location = res.location ? res.location.coordinates.join(",") : "";
          this.userForm.patchValue({
            role_id,
            location,
          });
        },
        (err) => console.error(err)
      );
    }
  }

  public changeSameAddress() {
    if (this.userForm.get("sameAddress").value) {
      this.userForm
        .get("permanent_address")
        .setValue(this.userForm.get("current_address").value);
      this.userForm.get("permanent_address").disable();
    } else {
      this.userForm.get("permanent_address").enable();
    }
  }

  public addressChanged() {
    if (this.userForm.get("sameAddress").value) {
      this.userForm
        .get("permanent_address")
        .setValue(this.userForm.get("current_address").value);
    }
  }

  getErrorMessage(form: FormGroup) {
    return form.get("email").hasError("required")
      ? "validations.required"
      : form.get("email").hasError("email")
      ? "validations.invalid_email"
      : "";
  }

  // steps
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
