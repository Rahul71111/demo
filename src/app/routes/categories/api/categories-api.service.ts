import { category, categoryDetailsResponse } from './../entities/index';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {

  constructor(private http:HttpClient) { }

  private baseURl = environment.SERVER_ORIGIN;

  public getAllCategories(currentPage = 1,currentPageSize = 5,paretCategoryId = '', categoryName = ''){
    let url = this.baseURl+`/api/category/allCategoryList?`;
    if(currentPage != undefined && currentPage != null && currentPage != 0)
      url += `&currentPage=${currentPage}`
    if(currentPageSize != undefined && currentPageSize != null && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`
    if(paretCategoryId != undefined && paretCategoryId !=  null && paretCategoryId.trim() != '')
      url += `&paretCategoryId=${paretCategoryId}`;
    if(categoryName != undefined && categoryName !=  null && categoryName.trim() != '')
      url += `&searchByName=${categoryName}`;

    url = url.replace('?&','?')
    return this.http.get(url);
  }

  public getParentCategories(){
    let url = this.baseURl+ `/api/category`;
    return this.http.get(url);
  }

  public newCategory(category:category){
    let url = this.baseURl + '/api/category/add';
    // let formData = new FormData();
    // formData.append('name',category.name);
    // formData.append('parent_categoriesId',category.parent);
    // formData.append('is_active',category.isactive);
    // formData.append('category_sort',category.sort);
    // formData.append('category_image',category.category_image);

    // console.log('form data ',formData);

    let body = {
      name: category.name,
      parent_categoriesId: category.parent_categoriesId,
      is_active: category.is_active,
      position:category.position,
      category_image:category.category_image,
      is_homescreen:category.is_homescreen
    }

    return this.http.post(url,body);
  }

  public deleteCategory(categoryId){
    let url = this.baseURl+`/api/category/deleteCategory/${categoryId}`;
    return this.http.delete(url);
  }

  public getCategoryDetailsById(categoryId):Observable<categoryDetailsResponse>{
    let url = this.baseURl+`/api/category/categoryDetails/${categoryId}`;
    return this.http.get<categoryDetailsResponse>(url);
  }

  public updateCategory(category:category){
    let url = this.baseURl+`/api/category/${category._id}`;
    let body = {
      name: category.name,
      parent_categoriesId: category.parent_categoriesId,
      is_active: category.is_active,
      position:category.position,
      category_image:category.category_image,
      is_homescreen:category.is_homescreen
    }
    return this.http.put(url,body);
  }

  public changeActivationStatus(categoryId:string,isActive:boolean){
    let url = this.baseURl+`/api/category/changeCategoryStatus/${categoryId}`
    let body = {is_active:isActive};
    return this.http.put(url,body)
  }
}