export interface category {
    _id?:string,
    name?:string,
    category_image?:string,
    position?:number,
    is_active?:boolean,
    is_homescreen?:boolean,
    parent_categoriesIds?:parentCategory[],
    parent_categoriesId?:string,
    created_at?:number,
    updated_at?:number
}

export interface parentCategory {
    _id?:string,
    name?:string
}

export interface categoryListResponse {
    message?:string,
    data?:category[],
    TotalCount?:number
}

export interface categoryDetail{
    _id?:string,
    name?:string,
    category_image?:string,
    position?:number,
    is_active?:boolean,
    is_homescreen?:boolean,
    parent_categoriesIds?:string[],
    parent_categoriesId?:string,
    created_at?:number,
    updated_at?:number
}

export interface categoryDetailsResponse {
    message?:string,
    categoryDetail?:categoryDetail
}