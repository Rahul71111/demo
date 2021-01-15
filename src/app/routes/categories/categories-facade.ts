import { category } from './entities/index';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { CategoriesApiService } from './api/categories-api.service';
import { Injectable } from '@angular/core';
import { CategoriesStateService } from './state/categories-state.service';
import { categoryListResponse } from './entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesFacadeService {

  constructor(private api:CategoriesApiService, private state:CategoriesStateService, private toster: ToastrService) { }

  public loadCategories(currentPage = 0,currentPageSize = 0,paretCategoryId = '',categoryName = ''){
    this.api.getAllCategories(currentPage,currentPageSize,paretCategoryId, categoryName).subscribe(cate => {
      this.state.setCategories(cate);
    },err => console.error('api call error from load categories ',err))
  }

  public loadParentCategories(){
    this.api.getParentCategories().subscribe(parent => {
      let data:any = parent
      this.state.setParentCategories(data.data.categories);
    },err => console.error('api call error from load parent categories ',err))
  }

  public getCategories(currentPage = 0,currentPageSize = 0,paretCategoryId = '',categoryName = ''):Observable<categoryListResponse>{
    if(!this.state.isCategoriesSet) this.loadCategories(currentPage,currentPageSize,paretCategoryId, categoryName)
    return this.state.getCategories().pipe(tap(cate => cate))
  }

  public getCategoriesByParentId(paretCategoryId = ''):Observable<categoryListResponse>{
    if(!this.state.isCategoriesSet && paretCategoryId != '') this.loadCategories(1,200,paretCategoryId)
    return this.state.getCategories().pipe(tap(cate => cate))
  }

  public getParentCategories(){
    return this.state.getParentCategories().pipe(tap(cate => cate))
  }

  public newCategory(category:category){
    return this.api.newCategory(category).toPromise().then( res => {
      this.loadCategories();
      this.toster.success('Category Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {
      // this.toster.error('Error While Create new category','Error',{timeOut:3000})
      console.error('api call error from new category ',err); throw err })
  }

  public deleteCategory(categoryId){
    return this.api.deleteCategory(categoryId).toPromise().then(res => {
      this.toster.success('Category Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete category ',err); return err })
  }

  public loadCategoryDetails(categoryId){
    return this.api.getCategoryDetailsById(categoryId).toPromise().then(res => {
      this.state.setEditCategory(res.categoryDetail)
      return res
    }).catch(err => {console.error('api call error from load category Details',err); throw err });
  }

  public getCategoryDetails(id){
    if(!this.state.isCategoryDetailsSet) this.loadCategoryDetails(id);
    return this.state.getEditCategory().pipe(tap(cate => cate))
  }

  public updateCategory(category:category){
    return this.api.updateCategory(category).toPromise().then( res => {
      this.loadCategories();
      this.toster.success('Category Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {
      // this.toster.error('Error While Update category','Error',{timeOut:3000})
      console.error('api call error from Update category ',err); throw err; })
  }

  public changeActivationStatus(categoryId:string,isActive:boolean){
    this.api.changeActivationStatus(categoryId,isActive).toPromise().then(res => {
      this.loadCategories();
      this.toster.success('Category Successfully Updated',"Success",{timeOut:3000})
    }).catch(err => {console.error('api call error from change activation status',err )})
  }
}
