export interface banner {
    _id?: string,
    name?: string,
    banner_image_url?: string,
    banner_redirect_url?: string,
    is_active?: boolean,
    type?: string,
    is_deleted?: boolean,
    category_id?: string,
    position?:number,
    created_at:number
}

export interface bannerResponse {
    message?: string,
    data?: banner[],
    totalCount?: number
}

export interface bannerDetailsResponse {
    data?:bannerDetails
}

export interface bannerDetails {
    type?:string,
    is_active?:boolean,
    is_deleted?:boolean,
    created_at?:number,
    _id?:string,
    name?:string,
    banner_image_url?:string,
    banner_redirect_url?:string,
    category_id?:string,
    position?:number
}