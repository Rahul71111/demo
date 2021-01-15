export interface packagingMaterial {
    item_id?:string,
    item_quantity?:number,
    item_unit_id?:string
}

export interface packagingMaterialwithObject {
    item_id?:idNameObject,
    item_quantity?:number,
    item_unit_id?:idNameObject
}

export interface idNameObject{
    _id?:string,
    name?:string
}

export interface unit{
    _id?:string,
    name?:string,
    packaging_material_consumed?: packagingMaterial[],
    base_quantity?:number,
    base_unit?:string,
    is_active?:boolean,
    created_at?:number,    
}

export interface unitDetails{
    _id?:string,
    name?:string,
    packaging_material_consumed?: packagingMaterialwithObject[],
    base_quantity?:number,
    base_unit?:string,
    is_active?:boolean,
    created_at?:number,    
}

export interface unitResponse {
    message?:string,
    data?:unit[]
    totalCount?:number
}

export interface unitDetailResponse{
    message?:unitDetails
}

export interface item{
    _id?:string,
    name?:string
}

export interface itemResponse {
    message?:string,
    data?:item[]
}