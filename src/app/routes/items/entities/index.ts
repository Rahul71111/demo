export interface itemList{
        picture?:string[],
        category_tags?:string[],
        type?:string,
        is_active?:boolean,
        subCategory_ids?:{_id?:string,name?:string}[],
        _id?:string,
        name?:string,
        secondary_name?:string,
        thumbnail?:string,
        price?:number,
        item_volume?:number,
        unit_id?:{_id?:string,name?:string}[],
        description?:string,
        category_id?:{_id?:string,name?:string}[],
        benefits?:string,
        position?:number
}

export interface itemListResponse{
    message?:string,
    data?:itemList[],
    totalCount?:number
}

export interface itemDetailResponse{
    message?:string,
    item?:itemDetail
}

export interface itemDetail{
    picture?:string[],
    category_tags?:string[],
    type?:string,
    is_active?:boolean,
    subCategory_ids?:{_id?:string,name?:string}[],
    _id?:string,
    name?:string,
    secondary_name?:string,
    thumbnail?:string,
    price?:number,
    item_volume?:number,
    unit_id?:string,
    description?:string,
    benefits?:string,
    position?:number,
    recommended_items?: string[],
    recipe?: any[],
    created_at?: string,
    updated_at?: string,
    is_deleted?: boolean,
    deleted_at?: string,
    customer_id?: null,
    category_id?: string
}

export interface itemUnit{
    price?:number,
    is_customer_show?:boolean,
    unit_id?:string,
    _id?:string
}

export interface updateItemDepoPrice{
    user_id?:string,
    item_id?:string,
    item_units?:itemUnit[],
    position?:number,
    is_active?:boolean,
    availability_status?:string
}

export enum availabilityStatus{ 
    available ='TRUE',
    notAvailable='FALSE',
    notify='NOTIFY'
}